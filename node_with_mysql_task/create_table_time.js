const mysql = require('mysql2');

const dbConn = mysql.createConnection({

    host:'localhost',
    user:'root',
    password:"admin123",
    database:'nodejsdb'
});

dbConn.connect((err)=>{

    if(err) throw err;
    console.log("Connected ....");

    //generate table name with current datetime
    const now = new Date();
    const updatedDate = now.toISOString().replace(/[-:.]/g,'').replace('T','_').split('.')[0];
    const tablename = `customer_info1_${updatedDate}`;

    const sqlQuery = `create table ${tablename}(cid int not null primary key auto_increment, cname varchar(30),age int, addr varchar(50))`;

    dbConn.query(sqlQuery,(err,result)=>{
        if(err) throw err;
        console.log(`Table ${tablename} created.`);
    });

});