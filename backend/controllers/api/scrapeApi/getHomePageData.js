const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const MangaDb = require('../../../models/mangaModel');
const { APIURL } = require('../../../config/url');


//popular today

const getHomePageData = async (browser) => {
    // Launch the browser and open a new blank page
    // const browser = await puppeteer.launch({
    //     headless: true, // set false if you want to watch the browser
    //     args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors'],
    //     ignoreHTTPSErrors: true

    // });

    const page = await browser.newPage();
    await page.goto(APIURL, {
        waitUntil: 'networkidle2'
    });

    const content = await page.content();
    const $ = cheerio.load(content)
    let createdMangas = [];





    //get popular manga
    const items = $('div.w-1\\/2.p-1\\.5').map((_, el) => {
        const $el = $(el);


        return {
            src: $el.find('img').attr('src'),
            title: $el.find('span.block.font-bold').first().text().trim(),
            chapter: $el.find('span[class*="text-[13px]"][class*="text-[#999]"]').text().trim(),
            rating: $el.find('span.ml-1.text-xs').text(),
            mangaId: $el.find('a').attr('href').split("/series/")[1].split("-").pop()
        };
    }).get();

    //saving each entry in my db
    for (const item of items) {
        // Build new chapter entry if available
        const newChapterEntry = item.chapter
            ? { number: item.chapter, date: new Date().toISOString() }
            : null;

        const updateData = {
            title: item.title,
            cover: item.src,
            rating: item.rating,
            latestChapter: item.chapter,
        };

        if (newChapterEntry) {
            // Push new chapter only if it doesn’t already exist
            updateData.$addToSet = {
                newchapters: newChapterEntry
            };
        }

        const updatedManga = await MangaDb.findOneAndUpdate(
            { mangaId: item.mangaId },
            updateData,
            { upsert: true, new: true }
        );

        await updatedManga.save()

        createdMangas.push(updatedManga);
        // console.log(newChapterEntry)
    }

    ////////////////


    //get latest manga
    const latestManga = $("div.w-full.p-1.pt-1.pb-3").map((_, el) => {
        const $el = $(el);

        const titleEl = $el.find("div.col-span-9.space-y-1\\.5.overflow-hidden span a");
        const href = titleEl.attr("href");
        const slug = href ? href.split("/series/")[1] : null;

        // Extract mangaId
        const mangaId = slug ? slug.split("-").pop() : null;

        // Clean title (remove chapter number or truncate fallback)
        let title = titleEl.text().trim().replace(/\s*Chapter.*$/, "");
        if (title.includes("...") && slug) {
            title = slug
                .split("-")
                .slice(0, -1)
                .join(" ")
                .replace(/\b\w/g, (c) => c.toUpperCase());
        }

        // Image
        const src = $el.find("img").attr("src");

        // Chapters + dates
        const numbers = $el
            .find('div.flex.text-sm.text-\\[\\#999\\].font-medium a span div p')
            .map((_i, c) => $(c).text().trim())
            .get();

        const dates = $el
            .find("p.flex.items-end.ml-2.text-\\[12px\\].text-\\[\\#555555\\]")
            .map((_i, d) => $(d).text().trim())
            .get();

        return {
            title,
            src,
            mangaId,
            chapters: numbers.map((num, i) => ({
                number: num,
                date: dates[i] || null
            }))
        };
    }).get();



    for (const latest of latestManga) {
        const mangaExist = await MangaDb.findOne({ mangaId: latest.mangaId });

        if (mangaExist) {
            // Update metadata
            await MangaDb.updateOne(
                { mangaId: latest.mangaId },
                {
                    $set: {
                        title: latest.title,
                        cover: latest.src,
                        // Update latestChapter based on the highest chapter
                        latestChapter: latest.chapters
                            .map(c => parseInt(c.number.replace(/\D/g, "")) || 0)
                            .sort((a, b) => b - a)[0]
                    },
                    $addToSet: { newchapters: { $each: latest.chapters } } // avoid duplicates
                }
            );
            console.log(`Updated: ${latest.title}`);
        } else {
            // Insert new manga
            const addManga = await MangaDb.create({
                title: latest.title,
                cover: latest.src,
                mangaId: latest.mangaId,
                newchapters: latest.chapters,
                latestChapter: latest.chapters[0]?.number || null
            });
            console.log(`Added: ${addManga.title}`);
            await addManga.save()
            createdMangas.push(addManga);

        }
    }

    console.log({ createdMangas: createdMangas })

    if (createdMangas.length < 0) {
        console.log("no new manga added")
    }

    await page.close()
}



module.exports = getHomePageData