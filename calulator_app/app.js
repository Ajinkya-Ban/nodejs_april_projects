const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req,res)=>{

    if(req.url ==='/' || req.url.toLocaleLowerCase()==='/home')
    {
        fs.readFile(path.join(__dirname,'public','index.html'),(err, data)=>{

            if(err) throw err
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data,'utf8');
        })
    }
    else if(req.url.match(/\.css$/))
        {
            fs.readFile(path.join(__dirname,'public/css',req.url),(err,data)=>{
                if(err) throw err
                res.writeHead(200,{'Content-Type':'text/css'});
                res.end(data,'utf8');
            })
        }
        else if(req.url.match(/\.(png|jpg|jpeg|gif|webp)$/))
        {
            let ext = path.extname(req.url).substring(1);
            fs.readFile(path.join(__dirname,'public/images',req.url),(err,data)=>{
    
                if(err) throw err
                res.writeHead(200,{'Content-Type':`image/${ext}`});
                res.end(data)
            })
        }
        else if(req.url.match(/\.js$/))
            {
                fs.readFile(path.join(__dirname,'public/js',req.url),(err,data)=>{
                    if(err) throw err
                    res.writeHead(200,{'Content-Type':'text/javascript'});
                    res.end(data,'utf8');
                })
            }
});

const port = 7070;
server.listen(port,()=>{
    console.log(`Server running at port ${port}`);
})

