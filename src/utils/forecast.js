const request = require('request');

/* //Forecast
    const daily = response.body.daily.data;
    daily.forEach(day =>
      console.log(
        `${day.summary} Temperaturas: ${day.temperatureLow} - ${
          day.temperatureHigh
        }. Hay un ${day.precipProbability * 100}% probabilidad de lluvia`
      )
    );
  }
}); */

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/${
    process.env.FORECAST_KEY
  }/${latitude},${longitude}?exclude=minutely,hourly&lang=es&units=si`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      // Gestiona errores de conexión
      callback('¡No se puede conectar con el servicio metereológico!', undefined);
    } else if (body.error) {
      // Gestiona errores de respuesta
      callback(
        'No se puede encontrar la localización proporcionada, pruebe con otra búsqueda',
        undefined,
      );
    } else {
      // At the moment
      const daily = body.daily.data[0];
      callback(
        undefined,
        `${daily.summary} La temperatura actual es de ${
          body.currently.temperature
        }. La minima de hoy es de ${daily.temperatureLow} ºC, y la máxima de ${
          daily.temperatureHigh
        } ºC. Hay un ${(daily.precipProbability * 100).toFixed(0)}% de probabilidad de lluvia`,
      );
    }
  });
};

module.exports = forecast;
