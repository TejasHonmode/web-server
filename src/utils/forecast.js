const request = require("request")

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/8bea150af1056cb233afb34470300a81/'+encodeURIComponent(lat)+','+encodeURIComponent(long)+''

    request({url: url, json:true}, (error, {body}) => {
        if(error){
            callback('There is error')
        }else if(body.error === 0){
            callback('Try another location')
        }else{
            callback(undefined, {temp: body.currently.temperature, precipProb: body.currently.precipProbability})
        }
    })
}

module.exports = forecast