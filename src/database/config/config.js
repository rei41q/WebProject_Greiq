require("dotenv").config();


const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host : process.env.DB_HOST,
    port : process.env.DB_PORT,        
    url : process.env.DB_URL,
    dialectOptions: {
      ssl: {
        require: true, // This will help you. But you will see nwe error
        rejectUnauthorized: false // This line will fix new error
      }
    },
    // dialect: "postgres",
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

// const bcrypt = require("bcrypt");

// async function hashHost() {
//  const hashHost = await bcrypt.hash(process.env.DB_HOST, 10);
//  return hashHost
// }

// async function hashUser() {
//   const hashUser = await bcrypt.hash(process.env.DB_USER, 10);
//   return hashUser
//  }

//  async function hashDatabse() {
//   const hashDatabse= await bcrypt.hash(process.env.DB_NAME, 10);
//   return hashDatabse
//  }

//  const databaseencript = hashDatabse;

// console.log(hashDatabse);

  // DATABASE_URL : process.env.DATABASE_URL,

      // port : process.env.DB_PORT,  
      //   URI : process.env.DB_URI,
    // HerokuCLI : process.env.DB_CLI,