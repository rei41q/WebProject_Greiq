require("dotenv").config();
const bcrypt = require("bcrypt");

  






async function hashHost() {
 const hashHost = await bcrypt.hash(process.env.DB_HOST, 10);
 return hashHost
}

async function hashUser() {
  const hashUser = await bcrypt.hash(process.env.DB_USER, 10);
  return hashUser
 }

 async function hashDatabse() {
  const hashDatabse= await bcrypt.hash(process.env.DB_NAME, 10);
  return hashDatabse
 }

 const databaseencript = hashDatabse;

console.log(hashDatabse);

  // DATABASE_URL : process.env.DATABASE_URL,

      // port : process.env.DB_PORT,  

const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port : process.env.DB_PORT,  
    dialect: "postgres",
    
  },
  test: {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  production: {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

module.exports = config;