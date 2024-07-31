var mysql = require('mysql2')

var dbConn = mysql.createConnection({
    host : "localhost",
    user:"root",
    password:"admin123"
});

dbConn.connect((err)=>{

    if(err) throw err;
    console.log("Connected to mysql...!")
});