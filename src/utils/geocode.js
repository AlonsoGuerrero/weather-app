const request = require("postman-request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYWxvbnNvZ3VlcnJlcm8iLCJhIjoiY2t0dnE1aHBtMmNyYTJwcTVuNDk0bHl5YyJ9.i1SB2VtJLtLbQvn-SwHi8w`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to mapbox service", undefined);
    } else if (!response.body.features.length) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      const { center: coordinates, place_name } = response.body.features[0];
      callback(undefined, {
        latitud: coordinates[1],
        longitud: coordinates[0],
        location: place_name,
      });
    }
  });
};

module.exports = geocode;
