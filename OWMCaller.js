require('dotenv').config();
const request = require('request-promise');
//OWM SECRET API KEY
const OWM_API_KEY = process.env.OWM_API_KEY;
const OWM_UNIT_METRIC = 'metric';
const OWM_UNIT_IMPERIAL = 'imperial';
function getWeather(cityName, callback){
  var result = {};
  //Build our API call and then make the callback
  const options = {
    uri : 'http://api.openweathermap.org/data/2.5/weather',
    json: true,
    qs: {
      q: cityName,
      APPID: OWM_API_KEY,
      units: OWM_UNIT_METRIC
    }
  };

  request(options).
  then((response)=>{
    //Build location information
    result.location = response.name + ", " + response.sys.country;
    //Build condition information
    result.conditions = [];
    for(i in response.weather){
      result.conditions.push(response.weather[i].description);
    }
    //Build temperature information
    result.temperature = response.main.temp;
    callback(result);
  }).catch((error)=>{
    //If request returned an error
    if(error != null) return console.log("ERROR: " + error);
  });
  //return result;
}

module.exports.getWeather = getWeather;
