import { useEffect, useState } from "react"
import MultiCarousel from "../../components/ui/MultiCarousel"
import { getTopRatedManga } from "../../api/getData"
import Skeleton from '../../components/ui/Skeleton'
import { Link } from "react-router-dom"
import { slugMangaTitle } from "../../utils/slugTitle"

function PopularToday() {
    interface popularMangainterface {
        id: string
        title: string
        cover: string
        latestChapter: string
        rating: number
        mangaId: string
    }


    const [isLoading, setLoading] = useState(true)
    const [popularManga, setManga] = useState<popularMangainterface[]>([])

    useEffect(() => {
        const fetchData = async () => {
            getTopRatedManga().then((res) => {
                console.log(res)
                if (res?.status == 200) {
                    setManga(res.data.result)
                    setLoading(false)
                }
            })

        };

        fetchData();

    }, [isLoading])





    return (
        <section className="my-10 p-4">

            {/* Manga Carousel */}
            <MultiCarousel>
                {isLoading
                    ? // Render skeletons while loading
                    Array.from(new Array(6)).map((_, index) => (
                        <Skeleton key={index} />
                    ))
                    : // Render manga cards when loaded
                    popularManga.map((manga) => (
                        <Link to={`/manga/${slugMangaTitle(manga.title)}/${manga.mangaId}`}>
                            <div
                                key={manga.id}
                                className="bg-[#1a2536] h-full w-44 rounded-md overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
                            >
                                {/* Cover */}
                                <div className="w-full h-40 md:h-48 overflow-hidden">
                                    <img
                                        className="w-full h-full object-cover object-center rounded-t-md transition-transform duration-300 hover:scale-105"
                                        src={manga.cover}
                                        alt={manga.title}
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-2">
                                    <p className="font-semibold text-sm md:text-base truncate">
                                        {manga.title}
                                    </p>
                                    <span className=" text-gray-400 text-md"> Chapter {manga.latestChapter}</span>

                                    {/* Ratings */}
                                    <div className="mt-1 flex items-center text-xs">
                                        <span className="text-gray-400">Rating:</span>
                                        <span className="ml-1 text-blue-300 font-medium">
                                            {manga.rating}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
            </MultiCarousel>

        </section>



    )
}

export default PopularToday
