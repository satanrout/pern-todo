const Pool = require("pg").Pool;
require("dotenv").config();

const devConfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
};

const proConfig = {
  // connectionString: process.env.DATABASE_URL, //HEROKU POSTGRES ADDON
  user: "qzgikcejbjvuyb",
  password: "b62d240146e1f451cb46c28ecee25c837c5bbcec978e2f30572ee6d5129c9e6b",
  host: "ec2-54-198-252-9.compute-1.amazonaws.com",
  port: 5432,
  database: "d9omar9qtf8alv",
};

const pool = new Pool(proConfig);

module.exports = pool;
