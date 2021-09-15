const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
    const forecastUrl = `http://api.weatherstack.com/current?access_key=884a7bce3926f7ca55443f00415a9fd3&query=${longitude},${latitude}&units=f`;
    request({
            method: "GET",
            url: forecastUrl,
            json: true,
        },
        (error, response, body) => {
            if (error) {
                callback("Unable to connect to weather forecast!", undefined);
            } else if (body.error) {
                callback("Unable to find location. Try another search", undefined);
            } else {
                callback(undefined, {
                    forecast: "Today's forecast is " +
                        body.current.weather_descriptions[0] +
                        ", Temperature is " +
                        body.current.temperature +
                        " and it feels like " +
                        body.current.feelslike,
                });
            }
        }
    );
};

module.exports = forecast;