const mysql = require('mysql2');

const dbConn = mysql.createConnection({

    host:'localhost',
    user:'root',
    password:"admin123",
    database:'nodejsdb'
});

dbConn.connect((err)=>{

    if(err) throw err;
    const sqlQry = "Select * from customer_info";
    dbConn.query(sqlQry,(err,result,fields)=>{
        
        if(err) throw err;
        for(i=0; i<result.length;i++)
            console.log(JSON.stringify(result[i]));
        console.log(fields);
    });
});
