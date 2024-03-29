/* 
* This query check if there is a schema called test or not 
*/
CREATE SCHEMA IF NOT EXISTS users_db;

/*
* This query check if there is a table called customers, and if exist will be deleted
*/
DROP TABLE IF EXISTS users;

/*
* But if the table doesn't exist this query will create it with the data that we specify below
*/
CREATE TABLE IF NOT EXISTS users (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    pass VARCHAR(50) NOT NULL
  
);