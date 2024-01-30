var express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')
var app = express()

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword",
  database: "mydb"
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.json())

app.get('/:table', async (req, res) => { // test to get all from selected table
  res.status(200).json(await getAllFromTable(req.params.table));
})

async function getAllFromTable(table){
  con.connect(function(err) {
    if (err) throw err;
    con.query(`SELECT * FROM ${table}`, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      return result;
    });
  });
}




app.listen(5002, function () {
  console.log('CORS-enabled web server listening on port 5002')
})
