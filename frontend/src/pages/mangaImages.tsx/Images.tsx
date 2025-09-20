import { useParams, useNavigate } from "react-router-dom";
import { getMangaImages, getMangaDetails } from "../../api/getData";
import { useEffect, useState } from "react";
import { slugMangaTitle } from "../../utils/slugTitle";

function MangaImages() {
    interface MangaImageInterface {
        chapterNumber: string;
        images: string[];
        _id: string;
        createdAt: string;
        mangaId: string;
        title: string;
        updatedAt: string;
    }

    const { mangaId, chapter } = useParams();
    const navigate = useNavigate();

    const [mangaImagesData, setMangaImagesData] = useState<MangaImageInterface>();
    const [loading, setLoading] = useState(true);
    const [allChapters, setAllChapters] = useState<string[]>([]); // for dropdown

    useEffect(() => {
        const fetchData = async () => {
            if (mangaId && chapter) {
                try {
                    // 1. Fetch the chapter images
                    const imgRes = await getMangaImages(mangaId, chapter);
                    setMangaImagesData(imgRes?.data.result);

                    // 2. Fetch all chapters (from getMangaDetails)
                    const detailsRes = await getMangaDetails(mangaId);
                    const chapters = detailsRes?.data.result.chapters || [];

                    // Chapters usually come newest → oldest, so reverse to ascending
                    const chapterNumbers = chapters
                        .map((c: any) => c.number)
                        .sort((a: number, b: number) => Number(a) - Number(b));

                    setAllChapters(chapterNumbers);

                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching data:", error);
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [mangaId, chapter]);

    if (loading) {
        return <div className="text-center py-6">Loading...</div>;
    }

    if (!mangaImagesData) {
        return <div className="text-center py-6">No images found for this chapter.</div>;
    }

    // Chapter navigation helpers
    const currentIndex = allChapters.findIndex((c) => c === mangaImagesData.chapterNumber);
    const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null;
    const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;

    const handleChangeChapter = (newChapter: string) => {
        navigate(`/manga/${slugMangaTitle(mangaImagesData.title)}/${mangaId}/${newChapter}`);
    };

    const handleBack = () => {
        navigate(`/manga/${slugMangaTitle(mangaImagesData.title)}/${mangaId}`);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className=" mx-auto px-4 relative">
            {/* Back button */}
            <div className="flex justify-start py-4">
                <button
                    onClick={handleBack}
                    className="px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition"
                >
                    ⬅ Back
                </button>
            </div>

            {/* Header Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 my-6">
                {/* Dropdown */}
                <select
                    value={mangaImagesData.chapterNumber}
                    onChange={(e) => handleChangeChapter(e.target.value)}
                    className="p-2 border rounded-md bg-gray-800 text-white"
                >
                    {allChapters.map((ch) => (
                        <option className="bg-gray-700" key={ch} value={ch}>
                            Chapter {ch}
                        </option>
                    ))}
                </select>

                {/* Prev / Next */}
                <div className="flex gap-3">
                    <button
                        disabled={!prevChapter}
                        onClick={() => handleChangeChapter(prevChapter!)}
                        className={`px-4 py-2 rounded-md font-semibold transition ${prevChapter
                            ? "bg-gray-200 hover:bg-gray-300 text-black"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                            }`}
                    >
                        ⬅ Prev
                    </button>
                    <button
                        disabled={!nextChapter}
                        onClick={() => handleChangeChapter(nextChapter!)}
                        className={`px-4 py-2 rounded-md font-semibold transition ${nextChapter
                            ? "bg-blue-500 hover:bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            }`}
                    >
                        Next ➡
                    </button>
                </div>
            </div>

            {/* Chapter Title */}
            <h2 className="text-xl font-bold mb-4 text-center">
                Chapter {mangaImagesData.chapterNumber} - {mangaImagesData.title}
            </h2>

            {/* Chapter Images */}
            <div className="flex flex-col items-center">
                {mangaImagesData.images.slice(1, -1).map((page, index) => (
                    <img
                        key={index}
                        loading="lazy"
                        src={page}
                        alt={`Page ${index + 2}`}
                        className="mb-6 w-full max-w-3xl rounded-lg shadow"
                    />
                ))}
            </div>

            {/* Footer Navigation */}
            <div className="flex justify-between items-center mt-8">
                <button
                    disabled={!prevChapter}
                    onClick={() => handleChangeChapter(prevChapter!)}
                    className={`px-4 py-2 rounded-md font-semibold ${prevChapter
                        ? "bg-gray-200 hover:bg-gray-300 text-black"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                >
                    ⬅ Prev
                </button>
                <button
                    disabled={!nextChapter}
                    onClick={() => { handleChangeChapter(nextChapter!), window.scrollTo(0, 0) }}
                    className={`px-4 py-2 rounded-md font-semibold ${nextChapter
                        ? "bg-blue-400 hover:bg-gray-300"
                        : "bg-blue-100 text-gray-400 cursor-not-allowed"
                        }`}
                >
                    Next ➡
                </button>
            </div>

            {/* Scroll to Top Button */}
            <button
                onClick={scrollToTop}
                className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg transition"
            >
                ↑
            </button>
        </div>
    );
}

export default MangaImages;
