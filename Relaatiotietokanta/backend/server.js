var express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')
var app = express()

var mysql = require('mysql2');
require('dotenv').config()

var con = mysql.createConnection({
  host: process.env.SERVER_URL,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.json())

app.get('/:table', async (req, res) => {
  try {
    const data = await getAllFromTable(req.params.table);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function getAllFromTable(table) {
  return new Promise((resolve, reject) => {
    con.connect(function (err) {
      if (err) {
        reject(err);
        return;
      }

      con.query(`SELECT * FROM ${table}`, function (err, result, fields) {
        if (err) {
          reject(err);
          return;
        }

        console.log(result);
        resolve(result);
      });
    });
  });
}




app.listen(5002, function () {
  console.log('CORS-enabled web server listening on port 5002')
})
