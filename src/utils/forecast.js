const request = require('request')

const forecast = (long, lat, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=2d7140ba3e6c329432dd36ca496eeecb&query='+long+','+lat
    request({ url , json: true}, (error, { body }) => {
        if (error){
            callback('Unable to connect to the weather service', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0]+ ' It is currently ' + body.current.temperature + '. It feels like ' + body.current.feelslike)
        }        
    })
}

module.exports = forecast