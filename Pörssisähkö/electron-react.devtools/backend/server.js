var express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')
const exp = require('constants')
var app = express()

app.use(express.json());

const PRICE_ENDPOINT = 'https://api.porssisahko.net/v1/price.json';

app.use(cors());

app.use(bodyParser.json())

app.get('/price/:date/:hour', async (req, res) => {
  res.status(200).json(await getPrice(req.params.date, req.params.hour));
})

async function getPrice(date,hour) {
  
  const response = await fetch(`${PRICE_ENDPOINT}?date=${date}&hour=${hour}`);
  const jsonData = await response.json();
  const { price } = jsonData;
  console.log(`Hinta nyt on ${price}`);
  return jsonData;
}



/*app.post("/", (req,res) =>{
  makeNewAlerts(req,res);
  res.send("Post done");
});

app.put('/:id/:value', async(req, res) =>{
  let passID = req.params.id;
  let passVal = req.params.value;
  let result = await  updateAlert(req,res,passID,passVal);
  res.end("Update done");
})


app.delete('/:value', async(req, res) =>{
  let passVal = req.params.value;
  let result = await  deleteAlert(req,res,passVal);
  res.end("Delete done");
}),*/

app.listen(5002, function () {
  console.log('CORS-enabled web server listening on port 5002')
})
