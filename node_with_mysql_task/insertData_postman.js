const http = require('http');
const mysql = require('mysql2');

const dbConn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'admin123',
    database:'nodejsdb' 
});
dbConn.connect((err)=>{
    if(err) throw err;
    console.log('Connected to database');
});

// createting server
const myserver = http.createServer((req,res)=>{

    if(req.method==='POST' && req.url ==='/add-customer')
    {
        let body = '';
        
        req.on('data',chunk =>{
            body += chunk.toString();
        });

        req.on('end',()=>{
            const data = JSON.parse(body);
            const records = data.records;


            const sqlQry = "insert into customer_info(cname, age, addr) values ?";
            dbConn.query(sqlQry,[records], (err,result)=>{
                if(err)
                {
                    res.writeHead(500,{'Content-Type':'text/plain'});
                    res.end("Error in inserting record");
                    throw err;
                }
                res.writeHead(200,{'Content-Type':'text/plain'});
                res.end(`Record inserted: ${result.affectedRows}`);
            });
        });
    }

});
const port = 7070;
myserver.listen(port,()=>{
    console.log(`Server running at: ${port}`);
});
