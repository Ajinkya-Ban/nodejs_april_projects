const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url.toLocaleLowerCase()==='/home') 
        {
        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf8');
        });
    } 
    else if (req.url.match(/\.css$/)) 
        {
        fs.readFile(path.join(__dirname, 'public/css', req.url), (err, content) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(content, 'utf8');
        });
    }
    else if (req.url.match(/\.(png|jpg|jpeg|gif)$/)) 
        {
        let ext = path.extname(req.url).substring(1); // Get the file extension without the dot
        fs.readFile(path.join(__dirname, 'public/images', req.url), (err, content) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': `image/${ext}` });
            res.end(content);
        });
    }
    else 
    {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('404 Not Found');
    }
});

const PORT = process.env.PORT || 7070;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
