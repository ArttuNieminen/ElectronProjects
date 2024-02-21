const mysql = require('mysql2');
require('dotenv').config();

const con = mysql.createConnection({
  host: process.env.SERVER_URL,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

//GET

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

async function getAnyFromTable(req, res) {
  try {
    const body = req.body;

    const rowsToGet = body.rowsToGet.join(', ');
    const tablesToUse = body.tablesToUse.join(', ');
    const joinsToUse = body.joins.map(join => `JOIN ${join}`).join(' ');
    const conditions = body.copmarisons.join(' AND ');

    const sqlQuery = `SELECT DISTINCT ${rowsToGet} FROM ${tablesToUse} ${joinsToUse} WHERE ${conditions}`;
    const result = await queryDatabase(sqlQuery);

    console.log(result);

    return result;
  } catch (error) {
    console.error(error);
    return res;
  }
}

async function getSearchResults(req, res) {
  try {
    const body = req.body;

    const TargetColumns = body.targetColumns.join(', ');
    const tablesToUse = body.targetTables.join(', ');
    const joinsToUse = body.joins.join(' ');

    // Check if conditions array is not empty before adding WHERE clause
    const conditions = body.conditions.length > 0 ? `WHERE ${body.conditions.join(' AND ')}` : '';

    const sqlQuery = `SELECT ${TargetColumns} FROM ${tablesToUse} ${joinsToUse} ${conditions}`;
    const result = await queryDatabase(sqlQuery);

    console.log(result);

    return result;
  } catch (error) {
    console.error(error);
    return res;
  }
}


// POST
async function postToTable(table, req, res) {
  try {
    const body = req.body;

    const columnsNames = Object.keys(body).join(', ');
    const columnValues = Object.values(body).map(value => `'${value}'`).join(', ');

    const sqlQuery = `INSERT INTO ${table} (${columnsNames}) VALUES (${columnValues})`;

    const result = await queryDatabase(sqlQuery);

    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    return res;
  }
}

// UPADATE
async function updateAnyRow(req, res) {
  try {
    const body = req.body;

    const targetTable = body.targetTable;
    const targetRow = body.targetRow;
    const updateColumns = body.updateColumns;
    const updateData = body.updateData;

    const setClause = updateColumns
      .map((column, index) => `${column} = '${updateData[index]}'`)
      .join(', ');

    const sqlQuery = `UPDATE ${targetTable} SET ${setClause} WHERE ID = ${targetRow}`;

    const result = await queryDatabase(sqlQuery);

    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    return res;
  }
}


// DELETE
async function deleteAnyRow(req, res) {
  try {
    const body = req.body;

    const targetTable = body.targetTable;
    const conditions = body.copmarisons.join(' AND ');

    const sqlQuery = `DELETE FROM ${targetTable} WHERE ${conditions}`;

    const result = await queryDatabase(sqlQuery);
    return result;
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

function queryDatabase(sqlQuery) {
  console.log(sqlQuery);
  return new Promise((resolve, reject) => {
    con.query(sqlQuery, function (err, result, fields) {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}



module.exports = {
  getAllFromTable,
  postToTable,
  getAnyFromTable,
  deleteAnyRow,
  updateAnyRow,
  getSearchResults
};
