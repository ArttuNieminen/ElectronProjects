const mysql = require('mysql2');
require('dotenv').config();

const con = mysql.createConnection({
  host: process.env.SERVER_URL,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
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

async function postToTable(table, req, res) {
  return new Promise((resolve, reject) => {
    con.connect(function (err) {
      if (err) {
        reject(err);
        return;
      }

      let parseBody = req.body;

      let columnsNames ='';
      for (let i = 0; i < Object.keys( parseBody).length; i++) {
        if (i != Object.keys( parseBody).length - 1) {
          columnsNames += Object.keys( parseBody)[i] + ',';
        } else {
          columnsNames += Object.keys( parseBody)[i];
        }
      }

      let columnValues='';
      for (let i = 0; i < Object.values(parseBody).length; i++) {
        if (i != Object.values(parseBody).length - 1) {
          columnValues += `'${Object.values(parseBody)[i]}',`;
        } else {
          columnValues += `'${Object.values(parseBody)[i]}'`;
        }
      }

      con.query(`INSERT INTO ${table} (${columnsNames}) VALUES (${columnValues})`, function (err, result, fields) {
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

module.exports = {
  getAllFromTable,
  postToTable
};
