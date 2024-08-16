const http = require('http');
const mysql = require('mysql2');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { URLSearchParams } = require('url');

const dbConn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'admin123',
    port:3306,
    database:'nodejsdb'
});

dbConn.connect((err)=>{
    if(err) throw err;
    console.log('Connected...');
});

const upload = multer({dest:'uploads/'});
const myServer = http.createServer((req,res)=>{

    if(req.method ==='POST' && req.url==='/add-student')
    {
        upload.single('imag')(req,res,(err)=>{

            if(err)
            {
                res.writeHead(500,{'Content-Type':'text/plain'});
                res.end("Error in uploading image");
                console.err(err);
                return;
            }
            const{sname,city} = req.body;
            const file = req.file;

            if(!file)
            {
                res.writeHead(500,{'Content-Type':'text/plain'});
                res.end("File not found");
                return;
            }

            const filePath = file.path;
            console.log(`File uploaded to: ${filePath}`);

            fs.readFile(filePath,"base64",(err,data)=>{

                if(err)
                {
                    res.writeHead(500,{'Content-Type':'text/plain'});
                    res.end("Error in reading file");
                    console.err(err);
                    return;
                }

                const sqlQry = "insert into student(sname, city, photo) values(?,?,?)";
                dbConn.query(sqlQry,[sname,city,data],(err,result)=>{

                    if(err)
                    {
                        res.writeHead(500,{'Content-Type':'text/plain'});
                        res.end("Error in inserting the data");
                        console.error(err);
                        return;
                    }
                    res.writeHead(200,{'Content-Type':'text/plain'});
                    res.end(`Student Added : ${result.affectedRows}`);

                });
            });
        });
    }
    else if(req.method==="GET" && req.url==="/get-students"){

        const sqlSelectqry = "Select sid, sname, city, photo from student";
        dbConn.query(sqlSelectqry,(err,result)=>{
            if(err)
            {
                res.writeHead(500,{'Content-Type':'text/plain'});
                res.end("Error in loading data");
                console.error(err);
                return;
            }
            //we need to format the result
            const formattedResult = result.map(student =>({

                sid:student.sid,
                sname:student.sname,
                city:student.city,
                photo:`data:image/jpeg;base64,${student.photo}`

            }));
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify(formattedResult));

        });
    }
    else if(req.method==="DELETE" && req.url.startsWith("/delete-student"))
    {
        const urlParts = req.url.split('?');
        const query = new URLSearchParams(urlParts[1]);
        const studentId = query.get('id');

        if(!studentId){
            res.writeHead(500,{'Content-Type':'text/plain'});
            res.end("Student id requred");
            return;
        }
        const delQry = "delete from student where sid = ?";
        dbConn.query(delQry,[studentId],(err,result)=>{

            if(err)
            {
                res.writeHead(500,{'Content-Type':'text/plain'});
                res.end("Error in deleting the data");
                console.error(err);
                return;
            }

            if(result.affectedRows === 0){

                res.writeHead(500,{'Content-Type':'text/plain'});
                res.end("Student not found");
                return;
            }

            res.writeHead(200, {'Content-Type':'text/plian'});
            res.end(`Student deleted: ${result.affectedRows}`);


        });

    }
});

port = 7070;
myServer.listen(port, ()=>{
    console.log(`Server Running at port ${port}`);
});
