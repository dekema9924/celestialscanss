const express = require('express')
const getHomePageData = require('../controllers/api/scrapeApi/getHomePageData')
// const mangaDetails = require('../controllers/api/scrapeApi/mangaDetails')
// const chapterImages = require('../controllers/api/scrapeApi/chapterImages')
const { popularManga, topRatedManga, latestManga, getMangaDetails, getMangaImages } = require('../controllers/api/mangaApi/mangaApi')
const apiRouter = express.Router()



//test route
apiRouter.get('/', (req, res) => {
    res.send('api router')
})

// scrape manga
// apiRouter.get('/manga', getHomePageData)
// apiRouter.get('/manga/:mangatitle/:mangaId', mangaDetails)
// apiRouter.get('/manga/:mangatitle/:mangaid/:chapterNumber', chapterImages)



//fetch manga from db
apiRouter.get('/popular', popularManga)
apiRouter.get('/top-rated', topRatedManga)
apiRouter.get('/latest', latestManga)
apiRouter.get('/:manga_id', getMangaDetails)
apiRouter.get('/:manga_id/:chapter', getMangaImages)






module.exports = apiRouter