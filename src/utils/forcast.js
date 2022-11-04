const request=require('request')

const forcast = (latitude,longitude,callback) =>{
    const url='http://api.weatherstack.com/current?access_key=3b80ad61dbffe5f37f540263580a21af&query=' + latitude + ',' + longitude 
    request({url,json:true},(error,{ body })=>{
             if (error) {
                 callback('Unable to connect to Weather service!',undefined)
             } else if (body.error) {
                 callback('Unable to find location!',undefined)
             } else {
             callback(undefined,body.current.weather_descriptions[0] +". It is currently "+ body.current.temperature +" degree out . It feels like "+ body.current.feelslike +" degree out. ")
          }
        })}


module.exports=forcast