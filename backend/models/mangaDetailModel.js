
const mongoose = require("mongoose");

const mangaDetailSchema = new mongoose.Schema({
    mangaId: {
        type: String,
        required: true,
        index: true,
    },
    title: String,
    cover: String,
    bigCover: String,
    synopsis: String,
    rating: String,
    authors: [String],
    genres: [String],
    status: String,
    chapters: [
        {
            number: String,
            date: String,
        }
    ]
}, { timestamps: true });

const MangaDetailDb = mongoose.model("MangaDetail", mangaDetailSchema);
module.exports = MangaDetailDb;
