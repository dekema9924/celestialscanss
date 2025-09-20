const cheerio = require("cheerio");
const ChapterDb = require("../../../models/chapterModel");

const chapterImages = async (mangatitle, mangaId, chapterNumber, browser) => {
    const page = await browser.newPage();
    page.setDefaultTimeout(120000); // 2 minutes for all waits

    const maxRetries = 3;
    let attempts = 0;
    let success = false;

    // Slugify the title
    const newtitle = mangatitle
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");

    const url = `${process.env.APIURL}/series/${newtitle}-${mangaId}/chapter/${chapterNumber}`;

    try {
        while (!success && attempts < maxRetries) {
            try {
                attempts++;
                console.log(`➡️ Opening ${url} (attempt ${attempts})`);


                await page.goto(url, {
                    waitUntil: "networkidle0", // safer than domcontentloaded
                    timeout: 120000,
                });
                await page.waitForSelector("div.w-full.mx-auto.center img", {
                    timeout: 30000,
                });

                // Scroll to trigger lazy load
                // await page.evaluate(async () => {
                //     window.scrollTo(0, 0);
                //     for (let i = 0; i < 5; i++) {
                //         window.scrollBy(0, window.innerHeight);
                //         await new Promise(r => setTimeout(r, 1000));
                //     }
                // });

                const getImages = await page.$$eval("img[src], img[data-src]", imgs =>
                    imgs.map(img => img.getAttribute("src") || img.getAttribute("data-src")).filter(Boolean)
                );

                if (!getImages.length) throw new Error("No images found");


                // Save/update in DB
                const updatedChapter = await ChapterDb.findOneAndUpdate(
                    { mangaId, chapterNumber },
                    {
                        $set: {
                            images: getImages,
                            mangaId,
                            title: mangatitle,
                            chapterNumber,
                        },
                    },
                    { upsert: true, new: true }
                );
                console.log(`✅ Saved ${getImages.length} images for chapter ${chapterNumber}`);
                success = true;
                return updatedChapter;
            } catch (err) {
                console.warn(
                    `⚠️ Attempt ${attempts} failed for chapter ${chapterNumber}: ${err.message}`
                );

                if (page && !page.isClosed()) {
                    await page.close().catch(() => { });
                }

                if (attempts === maxRetries) throw err;
                await new Promise(r => setTimeout(r, 5000)); // wait before retry
            }
        }
    } finally {
        if (page && !page.isClosed()) {
            await page.close().catch(() => { });
        }
    }
};

module.exports = chapterImages;
