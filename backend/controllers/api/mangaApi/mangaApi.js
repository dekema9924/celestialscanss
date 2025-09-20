const mangaDb = require('../../../models/mangaModel')
const mangaDetailsDb = require('../../../models/mangaDetailModel')
const chapterDb = require('../../../models/chapterModel')


// get most recent manga
const popularManga = async (req, res) => {
    try {
        const recentManga = await mangaDb.find().sort({ createdAt: -1 }).limit(20);
        const mangaWithDetails = await Promise.all(
            recentManga.map(async (mangaItem) => {
                const details = await mangaDetailsDb.findOne({ mangaId: mangaItem.mangaId });
                return {
                    id: mangaItem._id,
                    mangaId: mangaItem.mangaId,
                    title: mangaItem.title,
                    cover: mangaItem.cover,
                    genres: details?.genres ?? [],
                    synopsis: details?.synopsis ?? "No synopsis available",
                    rating: details?.rating ?? "N/A",
                    status: details?.status ?? "Unknown",
                };
            })
        );



        return res.status(200).json({ result: mangaWithDetails });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};



// get top rated manga carousel
const topRatedManga = async (req, res) => {

    try {
        await mangaDb.find()
            .find({ rating: { $exists: true } })
            .sort({ "rating": -1 }).limit(16)
            .then(async (result) => {
                if (result) {
                    return res.status(200).json({ result: result })
                }
                return res.status(400).json({ message: 'no manga found' })
            })
    } catch (error) {
        console.error(error)
    }
}


//get newest manga 
const latestManga = async (req, res) => {

    try {
        const docs = await mangaDb
            .find({ newchapters: { $exists: true, $ne: [] } })
            .sort({ createdAt: -1 })
            .lean(); // return plain objects instead of Mongoose docs

        const newchapters = docs
            .map(n => ({
                title: n.title,
                cover: n.cover,
                mangaId: n.mangaId,
                _id: n._id,
                newchapters: n.newchapters.slice(0, 3),
            }))
            .slice(6); // skip first 6




        if (newchapters.length > 0) {
            return res.status(200).json({ result: newchapters })
        }
        return res.status(400).json({ message: 'no manga found' })


    }
    catch (err) {
        console.error(err)

    }
}


//get manga details

const getMangaDetails = async (req, res) => {
    const { manga_id } = req.params

    const details = await mangaDetailsDb.findOne({ mangaId: manga_id })
    if (details) return res.status(200).json({ result: details })

    res.status(400).json({ message: "invalid mangaId" })

}


//get manga images for a chapter
const getMangaImages = async (req, res) => {
    const { manga_id, chapter } = req.params
    const details = await chapterDb.findOne({
        mangaId: manga_id,
        chapterNumber: chapter
    });
    if (details) return res.status(200).json({ result: details })
    res.status(400).json({ message: "invalid mangaId" })
}







module.exports = {
    popularManga,
    topRatedManga,
    latestManga,
    getMangaDetails,
    getMangaImages
}
