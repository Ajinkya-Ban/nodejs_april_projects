var mysql = require('mysql2');

var dbConn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"admin123",
    database:"nodejsdb"
});

dbConn.connect((err)=>{
    if(err) throw err;
    console.log("Connected...");

    var sql_query = "create table customer_info(cid int primary key auto_increment, cname varchar(20), age int, addr varchar(50))";

    dbConn.query(sql_query, (err,result)=>{

        if(err) throw err;
        console.log("Table created...");

    });

});
