CREATE DATABASE todo_database;

--\c into todo_database


Create table todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)

);