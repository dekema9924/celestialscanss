const mongoose = require('mongoose')


const mangaSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    mangaId: {
        type: String,
        unique: true
    },
    cover: String,
    latestChapter: String,
    rating: String,
    newchapters: [
        {
            number: String,
            date: String
        }
    ],


}, { timestamps: true });



const MangaDb = mongoose.model('Manga', mangaSchema)
module.exports = MangaDb
