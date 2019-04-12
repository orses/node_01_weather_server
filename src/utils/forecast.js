const request = require('request');

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
        `${daily.summary} La temperatura actual es de ${body.currently.temperature.toFixed(
          0,
        )} ºC. La minima de hoy es de ${daily.temperatureLow.toFixed(
          0,
        )} ºC, y la máxima de ${daily.temperatureHigh.toFixed(0)} ºC. Hay un ${(
          daily.precipProbability * 100
        ).toFixed(0)}% de probabilidad de lluvia`,
      );
    }
  });
};

module.exports = forecast;
