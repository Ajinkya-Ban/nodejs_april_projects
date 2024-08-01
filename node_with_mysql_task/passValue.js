const mysql = require('mysql2');

const dbConn = mysql.createConnection({

    host:'localhost',
    user:'root',
    password:"admin123",
    database:'nodejsdb'
});

dbConn.connect((err)=>{

    var cid = '1';
    var sqlQury = 'select * from customer_info where cid ='+mysql.escape(cid);
    if (err) throw err;
    dbConn.query(sqlQury, (err, result)=>{

        if(err) throw err;
        console.log(JSON.stringify(result));
    });

});