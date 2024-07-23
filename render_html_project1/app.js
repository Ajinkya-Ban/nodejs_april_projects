const http = require('http');
const fs = require('fs');
const path = require('path');

const myserver = http.createServer((req,res)=>{

    if(req.url === '/')
    {
        fs.readFile('index.html',(err, data)=>{
            if(err)
            {
                res.writeHead("500",{'Content-Type':'text/plain'});
                res.writeHead("500 internal server error");
            }
            else
            {
                res.writeHead("200",{'Content-Type':'text/html'});
                res.end(data);
            }
        });
        
    }
    else if(req.url ==='/styles.css')
        {
            fs.readFile('css/styles.css',(err,data)=>{

                if(err)
                {
                    res.writeHead("500",{'Content-Type':'text/plain'});
                    res.writeHead("500 Internal server error");
                }
                else
                {
                    res.writeHead("200",{'Content-Type':'text/css'});
                    res.end(data);
                }

            })
        }
        else
        {

        }

})

const port = 7070;
myserver.listen(port,()=>{
    console.log("Server Started")
})

