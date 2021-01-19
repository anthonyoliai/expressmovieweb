var express = require('express')
var router = express.Router()
const request = require('request')

const apiKey = '1fb720b97cc13e580c2c35e1138f90f8'
const apiBaseUrl = 'http://api.themoviedb.org/3'
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300'

router.use((req, res, next) => {
  res.locals.imageBaseUrl = imageBaseUrl
  next()
})

/* GET home page. */
// Request.get takes two args, url to http get, and the callback when done. Which is 3 args, the error, http response and the json/data server sent back
router.get('/', function (req, res, next) {
  request.get(nowPlayingUrl, (error, response, movieData) => {
    const parsedData = JSON.parse(movieData)
    res.render('index', { parsedData: parsedData.results })
  })
})

module.exports = router
