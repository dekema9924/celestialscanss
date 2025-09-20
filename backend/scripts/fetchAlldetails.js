const puppeteer = require('puppeteer');
const chapterImages = require('../controllers/api/scrapeApi/chapterImages');
const mangaDb = require('../models/mangaModel');
const ChapterDb = require('../models/chapterModel');
const getHomePageData = require('../controllers/api/scrapeApi/getHomePageData');
const MangaDetailDb = require('../models/mangaDetailModel');
const mangaDetails = require('../controllers/api/scrapeApi/mangaDetails');
const pLimit = (...args) => require('p-limit').default(...args);

const runBatch = async () => {

    const concurrency = 3; // 3 chap scraped at a time,
    const limit = pLimit(concurrency);

    const browser = await puppeteer.launch({
        headless: process.env.NODE_ENV === "production" ? "new" : true, // use new headless on Render, classic locally
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors'],
        ignoreHTTPSErrors: true,
        protocolTimeout: 120000, // 2 minutes

    });
    await getHomePageData(browser);


    try {
        const allManga = await mangaDb.find();
        console.log(`📚 Found ${allManga.length} manga`);

        for (let manga of allManga) {
            console.log(`➡️ Processing ${manga.title} (${manga.mangaId})`);

            // --- scrape manga details with retry ---
            let details;
            let attempts = 0;
            while (!details && attempts < 3) {
                try {
                    attempts++;
                    details = await mangaDetails(manga.mangaId, manga.title, browser);
                } catch (err) {
                    console.warn(
                        `⚠️ Attempt ${attempts} failed for ${manga.title}: ${err.message}`
                    );
                    if (attempts === 3) {
                        console.error(`❌ Skipping ${manga.title} after 3 failed attempts`);
                    } else {
                        await new Promise(r => setTimeout(r, 3000));
                    }
                }
            }

            console.log({ details: details })

            if (!details?.chapters?.length) {
                console.log(`   ⏭ No chapters found for ${manga.title}, skipping`);
                continue;
            }

            console.log(`   📖 Found ${details.chapters.length} chapters`);

            // --- scrape chapters with concurrency ---
            await Promise.all(
                details.chapters.map(ch =>
                    limit(async () => {
                        const exists = await ChapterDb.findOne({
                            mangaId: manga.mangaId,
                            chapterNumber: ch.number,
                        });

                        if (exists) {
                            console.log(`   ⏭ Chapter ${ch.number} already exists, skipping`);
                            return;
                        }

                        console.log(`   ➡️ Scraping chapter ${ch.number}`);
                        try {
                            await chapterImages(manga.title, manga.mangaId, ch.number, browser);
                        } catch (err) {
                            console.error(`❌ Error scraping chapter ${ch.number}: ${err.message}`);
                        }
                    })
                )
            );

            console.log(`✅ Finished all chapters for ${manga.title}`);
        }

        console.log('🎉 All manga processed');
    } catch (err) {
        console.error('❌ Error in runBatch:', err);
    } finally {
        await browser.close();
    }
};

module.exports = runBatch;
