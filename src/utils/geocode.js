const request = require("request");

//Without using the Call Back Pattern
// const geocodeURL =
//   "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoicm9oYW5zb29kIiwiYSI6ImNrNm16cnhxNTBzcHgzb3BhODNtcWRmcGoifQ.ikw_DILSgSHsCARBLyr2FQ&limit=1";

// //geocoding--> place name to lat and long

// //request is a function that takes in an object and a callback ffunction that runs once we get the data or something goes wrong
// request({ url: geocodeURL, json: true }, (error, response) => {
//   if (error) {
//     console.log("Unable to connect to geocoding service");
//   } else if (response.body.features.length === 0) {
//     console.log("Unable to find forward geolocation. Try Another Search");
//   } else {
//     const latitude = response.body.features[0].center[1];
//     const longitude = response.body.features[0].center[0];
//     console.log(`(Latitude: ${latitude} | Longitude:${longitude})`);
//   }
// });

//using the callback pattern

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoicm9oYW5zb29kIiwiYSI6ImNrNm16cnhxNTBzcHgzb3BhODNtcWRmcGoifQ.ikw_DILSgSHsCARBLyr2FQ&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to geocode service", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find geolocation", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
