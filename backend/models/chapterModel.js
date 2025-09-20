
const mongoose = require('mongoose')


const chapterSchema = new mongoose.Schema({
    mangaId: { type: String, required: true, index: true },
    chapterNumber: String,    // e.g. "Chapter 101"
    title: String,            // optional, if chapter has a name
    images: [String]          // array of image URLs for the chapter
}, { timestamps: true });

const ChapterDb = mongoose.model("Chapter", chapterSchema);
module.exports = ChapterDb
