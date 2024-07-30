const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const { json } = require('stream/consumers');

const server = http.createServer((req,res)=>{

    if(req.url ==='/' || req.url.toLocaleLowerCase()==='/home')
    {
        fs.readFile(path.join(__dirname,'public','index.html'),(err, data)=>{

            if(err) throw err
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data,'utf8');
        })
    }
    else if (req.url === '/jsonData') 
    {
        fs.readFile(path.join(__dirname,'public','jsonData.html'),'utf8',(err, htmlTemplate)=>{
            if(err)
            {
                res.writeHead(500,{'Content-Type':'text/plain'});
                res.end("Internal server error");
                return;
            }
            fs.readFile(path.join(__dirname,'Data','products.json'),'utf8',(error,jsonData)=>{

                if(error)
                {
                    res.writeHead(500,{'Content-Type':'text/plain'});
                    res.end("Internal server error");
                    return;
                }

                let products;
                try
                {
                    products = JSON.parse(jsonData);
                }
                catch(parseError)
                {
                    res.writeHead(500,{'Content-Type':'text/plain'});
                    res.end("Internal server error");
                    return;
                }
               let prodArray = products.map((prod) => {
                    let renderHtml = htmlTemplate.replace('{{%productImage%}}',prod.productImage)
                                                  .replace('{{%name%}}',prod.name)
                                                  .replace('{{%color%}}',prod.color)
                                                  .replace('{{%ROM%}}',prod.ROM)
                                                  .replace('{{%price%}}',prod.price)
                                                  .replace('{{%modeName%}}',prod.modeName)
                                                  .replace('{{%modelNumber%}}',prod.modelNumber)
                                                  .replace('{{%size%}}',prod.size)
                                                  .replace('{{%camera%}}',prod.camera)
                                                  .replace('{{%Description%}}',prod.Description);
                    return renderHtml;
                    
                }).join('');
                res.writeHead(200,{'Content-Type':'text/html'});
                res.end(prodArray);
            });

        });
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
    
    const parsedUrl = url.parse(req.url,true);
    const pathname = parsedUrl.pathname;
    const queryObject = parsedUrl.query;
    const productId = queryObject.id;
        
    if(pathname === '/productlist')
    {
        if(!productId)
        {
            res.writeHead(400,{'Content-Type':'text/plain'});
            res.end("Product id is required");
            return;
        }
        fs.readFile(path.join(__dirname,'public','jsonData.html'),'utf8',(err, htmlTemplate)=>{

            if(err)
            {
                res.writeHead(500,{'Content-Type':"text/plain"})
                res.end("Server error");
                return;
            }

            fs.readFile(path.join(__dirname,'Data','products.json'),'utf8',(error, jsonData)=>{

                if(error)
                {
                    res.writeHead(500,{'Content-Type':"text/plain"})
                    res.end("Server error");
                    return;
                }

                let products;
                try
                {
                   products = JSON.parse(jsonData); 
                }
                catch(parseError)
                {
                    res.writeHead(500,{'Content-Type':"text/plain"})
                    res.end("Error parsing json");
                    return;
                }

                const product = products.find(prod => prod.id == productId);
                if(!product)
                {
                    res.writeHead(400,{'Content-Type':'text/plain'});
                    res.end("Product not found");
                    return;
                }

                let renderedHtml = htmlTemplate.replace('{{%productImage%}}', product.productImage)
                                               .replace('{{%name%}}', product.name)
                                               .replace('{{%color%}}', product.color)
                                               .replace('{{%ROM%}}', product.ROM)
                                               .replace('{{%price%}}', product.price)
                                               .replace('{{%modeName%}}', product.modeName)
                                               .replace('{{%modelNumber%}}', product.modelNumber)
                                               .replace('{{%size%}}', product.size)
                                               .replace('{{%camera%}}', product.camera)
                                               .replace('{{%Description%}}', product.Description);

                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(renderedHtml);

            });
        });

    }
});

const port = 7070;
server.listen(port,()=>{
    console.log(`Server running at port ${port}`);
})

