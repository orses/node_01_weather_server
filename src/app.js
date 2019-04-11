const path = require('path');
const express = require('express');
const hbs = require('hbs');
require('dotenv').config(); // To use .env variables
const appData = require('../appdata.json');

const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const rangeOfYears = require('./utils/helpers');

// Creating the web server
const app = express();
// Adapting the port to the remote server (ex Heroku) or 3000 for development and local server
const PORT = process.env.PORT || 3000;
// Customizing the server
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setting up the dinamic engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setting the static directory have express to use
app.use(express.static(publicDirectoryPath));

// Routes and responses
app.get('/', (req, res) => {
  res.render('index', {
    title: 'El tiempo',
    appData,
    rangeOfYears: rangeOfYears(2019),
  });
});

app.get('/acerca', (req, res) => {
  res.render('about', {
    title: 'Acerca de',
    appData,
    rangeOfYears: rangeOfYears(2019),
  });
});

app.get('/ayuda', (req, res) => {
  res.render('help', {
    title: 'Ayuda',
    appData,
    rangeOfYears: rangeOfYears(2019),
  });
});

app.get('/weather', (req, res) => {
  const { address } = req.query;
  const { control } = req.query;
  if (!address) {
    return res.send({
      error: 'Se debe introduccir una localización',
    });
  }

  if (control) {
    return res.send({
      error: 'No hay datos',
    });
  }

  geoCode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, data) => {
      if (error) {
        return res.send({ error });
      }
      return res.send({ address, location, forecast: data });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Página de error 404 de la Ayuda',
    name: 'Andrew Mead',
    errorMessage: 'No se encontraron artículos de ayuda.',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Página de error 404',
    name: 'Andrew Mead',
    errorMessage: '¡Página no encontrada!',
  });
});

// Setting up and running the server
app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}.`);
});
