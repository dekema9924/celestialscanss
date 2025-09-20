

import { useState } from "react";

interface Manga {
    id: number;
    title: string;
    cover: string;
    recentChapter: string;
}

const mockBookmarks: Manga[] = [
    {
        id: 1,
        title: "Solo Leveling",
        cover:
            "https://gg.asuracomic.net/storage/media/285/conversions/01J4J7N5E8J6GSEYWGV23ZFHDG-thumb-small.webp",
        recentChapter: "Ch. 179",
    },
    {
        id: 2,
        title: "One Punch Man",
        cover:
            "https://gg.asuracomic.net/storage/media/272496/conversions/01JMHFP0DBPD906JMCZNAKG1RH-thumb-small.webp",
        recentChapter: "Ch. 188",
    },
    {
        id: 3,
        title: "Attack on Titan",
        cover:
            "https://mangadex.org/covers/625156ef-36c0-4432-babf-a2ee57194442/9325e18a-ab29-4d6e-a893-58ee9f7339e9.jpg.256.jpg",
        recentChapter: "Ch. 139",
    },
    {
        id: 4,
        title: "Blue Lock",
        cover:
            "https://mangadex.org/covers/1e11804a-f339-479c-b2fd-11aa62159bd4/8f6b13e3-4e53-4eb2-bdff-2bb89452cf2e.png.256.jpg",
        recentChapter: "Ch. 235",
    },
    {
        id: 5,
        title: "Jujutsu Kaisen",
        cover:
            "https://mangadex.org/covers/48f9fbcf-6f5e-48d2-bb3e-63a64a6b7403/c84f34f9-04a5-4b73-a7f7-1a432a0f3f79.jpg.512.jpg",
        recentChapter: "Ch. 236",
    },
    // add more mock items if needed
];

function Bookmarks() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const totalPages = Math.ceil(mockBookmarks.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = mockBookmarks.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return (
        <div className="min-h-screen bg-[#0f172a] text-white p-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">Your Bookmarks</h1>

            {/* Manga Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {currentItems.map((manga) => (
                    <div
                        key={manga.id}
                        className="bg-[#1a2536] rounded-md overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
                    >
                        {/* Cover */}
                        <div className="w-full h-44 md:h-56 overflow-hidden">
                            <img
                                src={manga.cover}
                                alt={manga.title}
                                className="w-full h-full object-cover rounded-t-md transition-transform duration-300 hover:scale-105"
                            />
                        </div>

                        {/* Info */}
                        <div className="p-3">
                            <p className="font-semibold text-sm md:text-base truncate">
                                {manga.title}
                            </p>
                            <span className="text-xs text-gray-400">
                                {manga.recentChapter}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-3 mt-8">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50 hover:bg-gray-600 transition"
                >
                    Prev
                </button>

                <span className="text-sm text-gray-300">
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50 hover:bg-gray-600 transition"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Bookmarks;
