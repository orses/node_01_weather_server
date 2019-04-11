const request = require('request');
/**
 * This function takes an location as a string and a callback
 * function to mabage the error and the data retourned.
 * The function return the Latitude and Longitude of the passed in location
 * @param {String} address
 * @param {Function} callback
 */
const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address,
  )}.json?limit=1&language=es&access_token=${process.env.MAPBOX_KEY}`;

  request({ url, json: true }, (error, { body }) => {
    if (!body) {
      callback('¡Sin acceso al servicio de geolocalización!', undefined);
    } else if (error) {
      callback('¡No se puede conectar con el servicio de Geolocalización!', undefined);
    } else if (body.features.length === 0) {
      callback(
        'No se puede encontrar la localización proporcionada. Pruebe con otra búsqueda.',
        undefined,
      );
    } else {
      const feature = body.features[0];
      callback(undefined, {
        latitude: feature.center[1],
        longitude: feature.center[0],
        location: feature.place_name_es,
      });
    }
  });
};

module.exports = geoCode;
