const { default: axios } = require('axios')
const express = require('express')
const router = express.Router()

router.post('/', async function (req, res, next) {
    const { location } = req.body

    // const { coord } = mockResponse
    // const { lon, lat } = coord

    // return res.render('views/map', { location: location, lon: lon, lat: lat })

    let response
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OPEN_WEATHER_API_KEY}`
    try {
        response = await axios.post(url)
        const { coord } = response.data
        const { lon, lat } = coord
        const variables = {
            location: location,
            lon: lon,
            lat: lat,
        }
        return res.render('views/map', variables)
    } catch (error) {
        res.send(error)
    }
})

const mockResponse = {
    coord: {
        lon: -83.3999,
        lat: 42.6667,
    },
    weather: [
        {
            id: 804,
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04d',
        },
    ],
    base: 'stations',
    main: {
        temp: 299.76,
        feels_like: 299.76,
        temp_min: 297.17,
        temp_max: 302.33,
        pressure: 1020,
        humidity: 50,
    },
    visibility: 10000,
    wind: {
        speed: 1.54,
        deg: 10,
    },
    clouds: {
        all: 100,
    },
    dt: 1685715727,
    sys: {
        type: 1,
        id: 5424,
        country: 'US',
        sunrise: 1685699890,
        sunset: 1685754318,
    },
    timezone: -14400,
    id: 5004223,
    name: 'Oakland',
    cod: 200,
}

module.exports = router
