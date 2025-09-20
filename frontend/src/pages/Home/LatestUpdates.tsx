import { useEffect, useState } from "react";
import { getLatestManga } from "../../api/getData";
import { Link } from "react-router-dom";
import { slugMangaTitle } from "../../utils/slugTitle";
import Skeleton from '../../components/ui/Skeleton'
interface Chapter {
    number: string;
    date: string;
}

interface LatestMangaInterface {
    _id: string;
    title: string;
    cover: string;
    newchapters: Chapter[];
    mangaId: string
}



function LatestUpdates() {
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;
    const [isLoading, setIsLoading] = useState(true)
    const [latestmanga, setLatestManga] = useState<LatestMangaInterface[]>([])
    const startIndex = (page - 1) * itemsPerPage;
    const paginatedUpdates = latestmanga.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    const totalPages = Math.ceil(latestmanga.length / itemsPerPage);


    //api to get latest manga
    useEffect(() => {
        const fetchlatest = async () => {
            try {
                let res = await getLatestManga()
                if (res?.status == 200) {
                    setIsLoading(false)
                    setLatestManga(res.data.result)
                }
            } catch (err) {
                console.error(err)
            }

        }

        fetchlatest()
    }, [])

    if (isLoading) return <Skeleton />

    return (
        <section className="my-10 p-4 ">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-[1.8em] font-semibold">Latest Updates</h2>
                <button className="text-blue-400 hover:underline text-sm">
                    See All →
                </button>
            </div>

            {/* Updates List */}
            <div className="flex flex-col gap-4">
                {paginatedUpdates.map((manga) => (
                    <Link to={`/manga/${slugMangaTitle(manga.title)}/${manga.mangaId}`}>

                        <div
                            key={manga._id}
                            className="flex gap-4 items-start bg-[#1a2536] rounded-md p-3 shadow hover:shadow-lg transition cursor-pointer"
                        >
                            {/* Cover */}
                            <img
                                src={manga.cover}
                                alt={manga.title}
                                className="w-20 h-28 object-cover rounded-md"
                            />

                            {/* Info */}
                            <div className="flex-1">
                                <p className="font-semibold text-base truncate  w-44 md:w-66">{manga.title}</p>
                                <div className="flex flex-col mt-2 gap-1">
                                    {manga.newchapters.map((ch, idx) => (
                                        <div
                                            key={idx}
                                            className="flex justify-between text-xs text-gray-300"
                                        >
                                            <span className="hover:text-blue-400 cursor-pointer">
                                                {ch.number}
                                            </span>
                                            <span className="text-gray-400">  {ch.date}</span>

                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Pagination */}
            < div className="flex justify-between items-center mt-6" >
                <button
                    disabled={page === 1}
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    className={`px-4 py-1 rounded-md text-sm ${page === 1
                        ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                        }`}
                >
                    Prev
                </button>

                <span className="text-sm text-gray-400">
                    Page {page} of {totalPages}
                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    className={`px-4 py-1 rounded-md text-sm ${page === totalPages
                        ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                        }`}
                >
                    Next
                </button>
            </div>
        </section>
    );
}

export default LatestUpdates;
