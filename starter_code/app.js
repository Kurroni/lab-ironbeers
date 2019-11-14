const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(path.join(__dirname, 'public')));

let beersArray;
punkAPI.getBeers()
  .then(beers => {
    beersArray = beers;
    })
  .catch(error => {
    console.log(error)
  })

app.get('/beers', (req, res, next) => {
  res.render('beers', {
    beerList: beersArray
  });
});

let randomBeer;

punkAPI.getRandom()
  .then(beers => {
    randomBeer = beers;
    console.log(randomBeer);
  })
  .catch(error => {
    console.log(error)
  });

app.get('/randomBeer', (req, res, next) => {
  res.render('randomBeer', {
    random: randomBeer
  });
});

app.get('/', (req, res, next) => {
  res.render('index');
});




app.listen(3000, () => {
  console.log('Server running!');
});