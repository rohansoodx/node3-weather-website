const request = require("request");

/*
without using callback pattern
const url =
  "https://api.darksky.net/forecast/3552a1079fa54b6c812bb07c53d9caaa/37.8267,-122.4233?units=si";

//request is a function that takes in an object and a callback ffunction that runs once we get the data or something goes wrong
request({ url: url, json: true }, (error, response) => {
  if (error) {
    //for low level OS errors
    console.log("Hey! There was an error connecting to weather service.");
  } else if (response.body.error) {
    console.log("Unable to find location");
  } else {
    var x = response.body.currently;
    console.log("Daily Forecast");
    console.log(
      `Summary: ${response.body.daily.data[0].summary} | There is a ${x.precipProbability}% chance of rain | The temperature is ${x.temperature} degrees outside.`
    );
  }
});
*/

//using callback pattern
function forecast(latitude, longitude, callback) {
  const url = `https://api.darksky.net/forecast/3552a1079fa54b6c812bb07c53d9caaa/${latitude},${longitude}?units=si`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      //for low level OS errors
      callback("Unable To Connect To Forecast API", undefined);
    } else if (body.error) {
      callback("Unable to find location. Bad Lat & Long requested", undefined);
    } else {
      var x = body.currently;
      var y = `Summary: ${body.daily.data[0].summary} || There is a ${x.precipProbability}% chance of rain || The temperature is ${x.temperature} degrees outside.`;
      callback(undefined, y);
    }
  });
}

module.exports = forecast;
