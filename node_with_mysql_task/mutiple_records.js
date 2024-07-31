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

    var sql_query = "insert into customer_info(cname,age,addr) values ?";
    var records = [
        ['Sunil Pawar', 33, 'Pune'],
        ['Ramesh', 30, 'Nashik'],
        ['Suresh',25,'MP']
    ];
    dbConn.query(sql_query,[records], (err, result)=>{
        if(err) throw err;
        console.log("Record inserted:"+result.affectedRows);
    });
});