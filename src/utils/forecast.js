const request = require("postman-request");

const forecast = (latitud, longitud, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=a88e5972147bcf23d4a54187d1342745&query=${latitud},${longitud}&units=m`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (response.body.error) {
      callback(response.body.error.info, undefined);
    } else {
      const { temperature, weather_descriptions, feelslike } =
        response.body.current;
      callback(
        undefined,
        `${weather_descriptions[0]}. It is currently ${temperature} degress out. It feels like ${feelslike} degress out`
      );
    }
  });
};

module.exports = forecast;
