var express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')
const exp = require('constants')
var app = express()

app.use(express.json());
app.use(cors());
app.use(bodyParser.json())

const PRICE_ENDPOINT = 'https://api.porssisahko.net/v1/price.json';

app.get('/price/:date/:hour', async (req, res) => {
  res.status(200).json(await getPrice(req.params.date,req.params.hour));
})

app.get('/prices', async (req, res) => {
  console.log("Call reached");
  res.status(200).json(await getPrices());
})

async function getPrice(date,hour) {
  
  const response = await fetch(`${PRICE_ENDPOINT}?date=${date}&hour=${hour}`);
  const jsonData = await response.json();
  const { price } = jsonData;
  //console.log(`Hinta nyt on ${price}`);
  return jsonData;
}
async function getPrices() {
  
  const response = await fetch(`https://api.porssisahko.net/v1/latest-prices.json`);
  const jsonData = await response.json();
  //console.log(`Hinnat on ${{price}= jsonData.prices[0].price}`);
  return jsonData.prices;
}


app.listen(5002, function () {
  console.log('CORS-enabled web server listening on port 5002')
})
