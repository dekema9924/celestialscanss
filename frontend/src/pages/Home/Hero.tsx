import { useEffect, useState } from "react";
import { getPopularManga } from "../../api/getData";
import Skeleton from '../../components/ui/Skeleton';
import { Link } from "react-router-dom";
import { slugMangaTitle } from "../../utils/slugTitle";

interface MangaItem {
    title: string;
    cover: string;
    genres: string[];
    mangaId: string
}



interface CarouselItem extends MangaItem {
    synopsis: string;
    rating: string;
    status: string
}

function Hero() {
    const [activeCarousel, setActiveCarousel] = useState<number>(0);
    const [isLoading, setLoading] = useState(true);
    const [topRatedManga, setTopRatedManga] = useState<CarouselItem[]>([]);

    // Fetch popular manga
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getPopularManga();
                console.log("API response:", res?.data.result);

                if (res?.status === 200 && Array.isArray(res.data?.result)) {
                    setLoading(false)
                    setTopRatedManga(res.data.result);
                }
            } catch (err) {
                console.error("Error fetching popular manga:", err);
            }
        };

        fetchData();
    }, []);



    // Handle carousel next/prev
    const handleNext = () => {
        setActiveCarousel((prev) =>
            topRatedManga.length ? (prev + 1) % topRatedManga.length : 0
        );
    };

    const handlePrev = () => {
        setActiveCarousel((prev) =>
            topRatedManga.length ? (prev - 1 + topRatedManga.length) % topRatedManga.length : 0
        );
    };

    if (isLoading) return <Skeleton />;

    const currentManga = topRatedManga[activeCarousel];

    return (
        <div className="relative p-6 rounded-lg overflow-hidden bg-[#0f172a] text-white">
            {/* Section Title */}
            <h1 className="text-2xl md:text-3xl font-bold mb-6 relative z-10">
                Most Recent Titles
            </h1>

            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{
                    backgroundImage: `url(${currentManga?.cover ?? '/placeholder.jpg'})`,
                    filter: "brightness(0.4)",
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0f172a]" />

            {/* Content Wrapper */}


            <Link className="relative flex gap-6 md:gap-10" to={`/manga/${slugMangaTitle(currentManga.title)}/${currentManga.mangaId}`}>

                {/* Cover Image */}
                <div className="shrink-0 w-36 md:w-52 transition-all duration-500">
                    <img
                        className="w-full h-full object-cover rounded-md shadow-md"
                        src={currentManga?.cover ?? '/placeholder.jpg'}
                        alt={currentManga?.title ?? 'Cover'}
                    />
                </div>

                {/* Text Content */}
                <div className="flex-1 relative">
                    <h2 className="capitalize text-2xl md:text-4xl font-semibold leading-tight">
                        {currentManga?.title ?? 'Title'}
                    </h2>

                    {/* Genres */}
                    <div className="overflow-x-auto py-2">
                        <ul className="flex gap-2 min-w-max">
                            {currentManga?.genres?.map((genre, idx) => (
                                <li
                                    key={idx}
                                    className="flex-shrink-0 bg-gray-700/70 px-3 py-1 rounded-full text-gray-200 text-xs sm:text-sm whitespace-nowrap"
                                >
                                    {genre}
                                </li>
                            ))}
                        </ul>
                        <span className="text-sm">status: <span className="text-blue-400 uppercase text-xs font-bold">{currentManga.status}</span></span>
                    </div>



                    {/* Synopsis */}
                    <p className=" p-2  !text-sm h-44 overflow-ellipsis overflow-hidden  md:w-86 md:text-base text-gray-300 mt-6 w-10/12 hidden md:block">
                        {currentManga?.synopsis ?? 'No synopsis available'}
                    </p>
                </div>
            </Link>


            {/* Carousel Arrows */}
            <div className="absolute bottom-6 right-6 flex gap-3 z-50">
                <button
                    onClick={handlePrev}
                    className="bg-gray-600/80 hover:bg-gray-500 px-4 py-2 rounded-md font-semibold transition"
                >
                    Prev
                </button>
                <button
                    onClick={handleNext}
                    className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md font-semibold transition"
                >
                    Next
                </button>
            </div>

        </div >

    );
}

export default Hero;
