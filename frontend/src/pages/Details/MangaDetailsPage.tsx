import { useEffect, useState } from "react";
import { getMangaDetails } from "../../api/getData";
import { useParams, Link } from "react-router-dom";
import Chapters from "./Chapters";

export interface ChapterInterface {
    _id?: string;
    number?: number;
    title?: string;
    date?: string;
}

export interface MangaInterface {
    _id: string;
    mangaId: string;
    title: string;
    authors: string[];
    cover: string;
    bigCover: string;
    genres: string[];
    rating: string;
    status: "Ongoing" | "Completed" | "Hiatus" | string;
    synopsis: string;
    chapters: ChapterInterface[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

function MangaDetailsPage() {

    const { mangaId } = useParams();
    const [mangadetails, setMangaDetails] = useState<MangaInterface | null>(null);
    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        const getdetails = async () => {
            if (mangaId) {
                let res = await getMangaDetails(mangaId);
                console.log(res)
                setMangaDetails(res?.data.result);
                setisLoading(false);
            }
        };
        getdetails();
    }, [mangaId]);

    if (isLoading || !mangadetails) return null;

    return (

        <>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex justify-between items-center">
                <Link to="/" className="text-white text-lg font-semibold hover:underline">
                    ← Back to Home
                </Link>
                <div></div> {/* Placeholder for alignment */}
            </div>

            {/* //details */}
            <div className="relative w-full text-white mt-22 overflow-hidden">
                {/* 🔹 Background with blur */}
                <div
                    className="absolute inset-0 h-72 sm:h-80 bg-cover bg-center scale-105"
                    style={{
                        backgroundImage: `url(${mangadetails.bigCover ? mangadetails.bigCover : mangadetails.cover
                            })`,
                    }}
                />

                {/* 🔹 Dark gradient overlay */}
                <div className="absolute inset-0 h-72 sm:h-80 bg-gradient-to-b from-black/80 via-black/60 to-black"></div>

                {/* 🔹 Foreground Content */}
                <div className="relative z-10 max-w-6xl mx-auto flex flex-col sm:flex-row gap-6 px-4 sm:px-6 py-6 sm:py-8">
                    {/* Cover */}
                    <div className="w-36 sm:w-44 flex-shrink-0 mx-auto sm:mx-0">
                        <img
                            src={mangadetails.cover}
                            alt="Manga Cover"
                            className="w-full h-auto rounded-md shadow-lg"
                        />
                    </div>

                    {/* Details */}
                    <div className="flex flex-col justify-center gap-3 text-center sm:text-left">
                        <h1 className="text-2xl sm:text-4xl font-bold leading-tight">
                            {mangadetails.title}
                        </h1>
                        <p className="text-xs sm:text-sm opacity-70">
                            By <span className="font-medium">{mangadetails.authors}</span>
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-3 mt-2">
                            <button className="px-4 py-2 rounded-md bg-blue-300 text-black font-semibold hover:bg-blue-400 transition">
                                📑 Bookmark
                            </button>
                            <button className="px-4 py-2 rounded-md bg-orange-500 text-white font-semibold hover:bg-orange-600 transition">
                                ▶ Start Reading
                            </button>
                        </div>

                        {/* Genres */}
                        <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">
                            {mangadetails.genres.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2 py-1 text-xs bg-white/20 rounded-md"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Stats Row */}
                        <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 sm:gap-6 mt-4 text-xs sm:text-sm opacity-90">
                            <span>⭐ {mangadetails.rating}</span>
                            <span>{mangadetails.status}</span>
                        </div>
                    </div>
                </div>

                {/* 🔹 Description under header */}
                <div className="relative md:mt-6  z-10 max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6 text-xs sm:text-sm text-gray-200 leading-relaxed text-center sm:text-left">
                    {mangadetails.synopsis}
                </div>
            </div>

            <hr className='my-6  border-gray-700' />

            {/* //chapters */}
            <Chapters mangadetails={mangadetails} />

        </>
    );
}

export default MangaDetailsPage;
