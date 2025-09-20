const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const MangaDetailDb = require("../../../models/mangaDetailModel");
const normalizeChapter = require("../../../utils/normalizeChapter");
const { APIURL } = require('../../../config/url')

const mangaDetails = async (mangaId, mangatitle, browser) => {
    const slugifiedTitle = mangatitle
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");

    const url = `${APIURL}/series/${slugifiedTitle}-${mangaId}`;

    console.log("🔗 Fetching:", url);


    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

    const content = await page.content();
    const $ = cheerio.load(content);

    // scrape details (single object, not array)
    const detailsEl = $("div.z-10.grid.grid-cols-12.gap-4.pt-4").first();
    const details = {
        synopsis: detailsEl.find("span.font-medium.text-sm.text-\\[\\#A2A2A2\\]").text().trim(),
        genres: detailsEl
            .find("button.text-white.text-sm.cursor-pointer")
            .map((_i, g) => $(g).text().trim())
            .get(),
        author: detailsEl.find("div.grid.grid-cols-1.gap-5.mt-8 > div").eq(1).find("h3").eq(1).text().trim(),
        poster: detailsEl.find("img.rounded.mx-auto.md\\:mx-0").attr("src"),
        title: detailsEl.find("span.text-xl.font-bold").text().trim(),
        status: detailsEl
            .find("div.bg-\\[\\#343434\\].px-2.py-2.flex.items-center.rounded-\\[3px\\].w-full h3")
            .eq(1)
            .text()
            .trim(),
        rating: detailsEl.find("div.flex.items-center.gap-0\\.5 div span").text().trim(),
    };

    // scrape chapters
    const chapterDetails = $("div.pl-4.py-2.border.rounded-md.w-full")
        .map((_i, el) => ({
            chapter: $(el).find("h3").eq(0).text().trim(),
            releaseDate: $(el).find("h3").eq(1).text().trim(),
        }))
        .get();

    const bigCover = $("div.bigcover img").attr("src");

    await page.close();
    const chaptersArray = chapterDetails
        .map((c) => {
            const normalized = normalizeChapter(c.chapter);
            if (!normalized) return null; // skip invalid
            return {
                number: normalized,
                date: c.releaseDate,
            };
        })
        .filter(Boolean); // remove nulls


    try {
        const updatedManga = await MangaDetailDb.findOneAndUpdate(
            { mangaId },
            {
                $set: {
                    title: details.title,
                    cover: details.poster,
                    status: details.status,
                    rating: details.rating,
                    genres: details.genres,
                    synopsis: details.synopsis,
                    authors: details.author,
                    chapters: chaptersArray,
                    bigCover,
                },

            },
            { upsert: true, new: true }
        );
        console.log("Filter:", { mangaId: String(mangaId) });
        console.log("Details to save:", details);
        console.log("Chapters:", chaptersArray.length);

        return updatedManga; // 
    } catch (error) {
        console.error("❌ Error saving manga:", error);
        throw error;
    }
};

module.exports = mangaDetails;
