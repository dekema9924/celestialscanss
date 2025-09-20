import Header from "./components/layout/Header"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
import Bookmarks from "./pages/Settings/Bookmarks"
import MangaDetailsPage from "./pages/Details/MangaDetailsPage"
import MangaImages from "./pages/mangaImages.tsx/Images"


function App() {

  return (
    <>
      <Header />
      <div className="w-10/12 m-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/manga/:title/:mangaId" element={<MangaDetailsPage />} />
          <Route path="/manga/:title/:mangaId/:chapter" element={<MangaImages />} />
        </Routes>
      </div>
    </>
  )
}

export default App
