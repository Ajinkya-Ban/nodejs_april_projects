const http = require('http');
const mysql = require('mysql2');

const dbConn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'admin123',
    database:'nodejsdb'
    //port:3307
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
    else if(req.method==='PUT' && req.url==='/update-customer')
    {
            let body = ''
            req.on('data', chunk=>{
                body += chunk.toString();
            });

            req.on('end',()=>{
                const data = JSON.parse(body);
                const {cid,cname,age,addr} = data;

                const update_query = "update customer_info set cname= ?, age=?,addr=? where cid = ?";
                dbConn.query(update_query,[cname,age,addr,cid],(err,result)=>{
                    if(err)
                    {
                        res.writeHead(500,{'Content-Type':'text/plain'});
                        res.end("Error in updating the record");
                        throw err;
                    }

                    res.writeHead(200,{"Content-Type":"text/plain"});
                    res.end(`Record updated: ${result.affectedRows}`);
                });

            });
    }
    else if(req.method==="DELETE" && req.url.startsWith("/delete-customer")){
        
        const urlParts = req.url.split('/');
        const cid = urlParts[urlParts.length - 1];

        const del_query = "delete from customer_info where cid = ?";
        dbConn.query(del_query,[cid],(err,result)=>{

            if(err)
            {
                res.writeHead(500,{'Content-Type':'text/plain'});
                res.end("Error in deleting the record");
                throw err;
            }
            res.writeHead(200,{"Content-Type":"text/plain"});
            res.end(`Record deleted: ${result.affectedRows}`);

        });
    }
    else if(req.method ==="GET" && req.url.startsWith("/display-data")){
        const display_qry = "Select * from customer_info";
        dbConn.query(display_qry,(err, result)=>{
            if(err)
            {
                res.writeHead(500,{'Content-Type':'text/plain'});
                res.end("Error in fetching the data");
                throw err;
            }
            res.writeHead(200,{"Content-Type":"application/json"});
            res.end(JSON.stringify(result));
        });
    }
});
const port = 7070;
myserver.listen(port,()=>{
    console.log(`Server running at: ${port}`);
});
