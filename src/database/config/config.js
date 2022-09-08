require('dotenv').config(); //The dotenv to easily config the db configuration with .env file

module.exports = {
  "development": {
    "username": "dtuxpbmzqclnss",
    "password": "83d09aa8483ef80a26e1ca15163cb6c0102f5d3cc9ab504835766349e64ecdc5",
    "database": "der5rb7bb1aio2",
    "dialect": "postgresql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}