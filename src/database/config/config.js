require('dotenv').config(); //The dotenv to easily config the db configuration with .env file

module.exports = {
  "development": {
    "username": "tokopedia",
    "password": "12345678",
    "database": "tokopedia",
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