import { slugMangaTitle } from "../../utils/slugTitle"
import { type MangaInterface, type ChapterInterface } from "./MangaDetailsPage"
import { Link } from "react-router-dom"

function Chapters({ mangadetails }: { mangadetails: MangaInterface }) {
    console.log(mangadetails)
    return (
        <section>

            {/* //next chap btns */}
            <div className="flex gap-4">
                {/* First Chapter Button */}
                <Link to={`/manga/${slugMangaTitle(mangadetails.title)}/${mangadetails.mangaId}/${mangadetails.chapters.at(-1)?.number}`} className="flex flex-col items-center justify-center w-1/2 py-4 rounded-xl font-semibold text-gray-800 bg-slate-200 hover:bg-slate-300 transition">
                    <span className="text-sm opacity-70">First Chapter</span>
                    <span className="text-lg">
                        Chapter {mangadetails.chapters.at(-1)?.number}
                    </span>

                </Link>

                {/* New Chapter Button */}
                <Link to={`/manga/${slugMangaTitle(mangadetails.title)}/${mangadetails.mangaId}/${mangadetails.chapters[0]?.number}`} className="flex flex-col items-center justify-center w-1/2 py-4 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition">
                    <span className="text-sm opacity-80">New Chapter</span>
                    <span className="text-lg">
                        Chapter {mangadetails.chapters[0]?.number}
                    </span>
                </Link>
            </div>


            {/* ///all chapters */}
            <div className="flex flex-col gap-4 mt-6 my-10 h-80 overflow-hidden overflow-y-scroll">
                {
                    //map through chapters+
                    mangadetails.chapters.map((chapter: ChapterInterface) => (
                        <Link to={`/manga/${slugMangaTitle(mangadetails.title)}/${mangadetails.mangaId}/${chapter.number}`} key={chapter._id} className="flex justify-between items-center px-4 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition border-l-4 border-l-blue-400">
                            <span key={chapter._id} className="flex font-bold flex-col p-2">
                                Chapter {chapter.number}
                                <span className="text-xs text-blue-300">{chapter.date}</span>
                            </span>
                        </Link>
                    ))
                }


            </div>

        </section>
    )
}

export default Chapters
