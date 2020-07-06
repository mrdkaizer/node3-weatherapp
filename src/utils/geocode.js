const request = require('request')

const geocode = (address, callback)=>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibXJka2FpemVyIiwiYSI6ImNrYzd3a2h0ZzEzOTAyc3FwdGQ4a2JvOHEifQ.LuQ92BTersh3KJi8ZxRNxQ&limit=1'
    request({url, json: true}, (error, { body })=>{
        if (error){
            callback('Unable to connect to mapbox service.', undefined)
        }else if (body.features.length === 0){
            callback('Unable to find location.', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode