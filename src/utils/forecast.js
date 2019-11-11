const request = require('request')


const forecast = (latitude,longtitude,callback) => {
    const url = 'https://api.darksky.net/forecast/7572ee2010a02e8b1e70c836bd1c81ed/' + latitude + ',' + longtitude + '?units=si'
    request({url, json: true}, (error,{body}) => {
        if (error) {
            callback('Unable to conect to weather services!',undefined)
        } else if(body.error) {
            callback('Unable to find location, Try another search',undefined)
        } else {
            const temperature = body.currently.temperature
            const precipProbability = body.currently.precipProbability
            const msg = body.daily.data[0].summary + ' It is currently ' + temperature + ' degrees out. There is a ' + precipProbability + '% chance of rain. The highest temperature for today is:' + body.daily.data[0].temperatureHigh + '. The lowest temperature for today is: ' + body.daily.data[0].temperatureLow
            callback(undefined,msg)
        }
    })
}

module.exports = forecast