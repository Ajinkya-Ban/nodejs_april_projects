var mysql = require('mysql2');

var dbConn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"admin123",

});

dbConn.connect((err)=>{

    if(err) throw err;
    console.log("connected with mysql..!");
    
    var sql_query = "create database nodeJSDB";
    dbConn.query(sql_query,(error,result)=>{

        if(error) throw error;
        console.log("Database created sucessfully...")

    });
});