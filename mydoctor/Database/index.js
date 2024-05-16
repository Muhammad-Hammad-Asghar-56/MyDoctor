var {createPool} = require('mysql');

const pool = createPool({
  host: "localhost",
  user: "sqluser",
  password: "Allahpak~1",
  database:"MyDoctor",
  connectionLimit:10
}); 

module.exports = pool