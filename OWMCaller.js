require('dotenv').config();
const request = require('request-promise');
//OWM SECRET API KEY
const OWM_API_KEY = process.env.OWM_API_KEY;
const OWM_UNIT_METRIC = 'metric';
const OWM_UNIT_IMPERIAL = 'imperial';
function getWeather(cityName, callback){
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
    console.log(response);
    let result = "";
    //Get location information
    result += "Location: " + response.name + ", " + response.sys.country + "\n";
    //Get condition information
    result += "Conditions: ";
    for(let i = 0; i < response.weather.length; i++){
      result += response.weather[i].description;
      if(i+1 < response.weather.length){
        result += ", ";
      }else{
        result += "\n";
      }
    }
    //Get temperature information
    result += "Temperature: " + response.main.temp + "\n";
    console.log("-------------------[OWM Success]-------------------");
    callback(result);
    console.log("---------------------------------------------------");
  }).catch((error)=>{
    console.log("--------------------[OWM Error]--------------------");
    callback(`Couldn't get weather information for '${cityName}'`);
    console.log("---------------------------------------------------");
  });
  //return result;
}

module.exports.getWeather = getWeather;
