var {createPool} = require('mysql');

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database:"mydoctor",
  connectionLimit:10
}); 

module.exports = pool