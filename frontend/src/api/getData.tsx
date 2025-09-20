import axiosInstance from "./axiosInterface"

export const getPopularManga = async () => {
    try {
        const result = await axiosInstance.get('/manga/popular');
        // console.log(result.data.popularmanga);
        return result
    } catch (error) {
        console.error(error);
    }
}



export const getTopRatedManga = async () => {
    try {
        const result = await axiosInstance.get('/manga/top-rated');
        // console.log(result.data.popularmanga);
        return result
    } catch (error) {
        console.error(error);
    }
}


export const getLatestManga = async () => {
    try {
        const result = await axiosInstance.get('/manga/latest');
        // console.log(result.data.popularmanga);
        return result
    } catch (error) {
        console.error(error);
    }
}


//get manga details
export const getMangaDetails = async (mangaId: string) => {
    try {
        const result = await axiosInstance.get(`/manga/${mangaId}`);
        console.log(result.data.popularmanga);
        return result
    } catch (error) {
        console.error(error);
    }
}


//get manga images for a chapter
export const getMangaImages = async (mangaId: string, chapter: string) => {
    try {
        const result = await axiosInstance.get(`/manga/${mangaId}/${chapter}`);
        console.log(result.data);
        return result
    }
    catch (error) {
        console.error(error);
    }
}
