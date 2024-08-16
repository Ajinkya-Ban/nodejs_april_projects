const http = require('http')
const {createUser, updateUser, getUserById,deleteUser} = require('./models/users');
const {userSchema} = require('./validation');


const parseBody = (req) =>{

    return new Promise((resolve,reject)=>{

        let body = '';
        req.on('data',(chunk)=>{

            body = body + chunk.toString();
        });

        req.on('end',()=>{
           resolve(JSON.parse(body)); 
        });
    });  
};

const myServer = http.createServer(async(req,res)=>{

    res.setHeader('Content-Type','application/json');
    if(req.method==='POST' && req.url==='/add-user')
    {
        // const user = await parseBody(req);
        // const result = await createUser(user);
        // res.writeHead(201);
        // res.end(JSON.stringify(result));
        try
        {
            const user = await parseBody(req);
            const {error} = userSchema.validate(user);
            if(error)
            {
                res.writeHead(400)
                res.end(JSON.stringify({message:error.details[0].message}));
                return;
            }
            const result = await createUser(user);
            res.writeHead(201);
            res.end(JSON.stringify(result));

        }
        catch(err)
        {
            res.writeHead(500);
            res.end(JSON.stringify({message:'Internal server error'}))
        }

    }
    else if(req.method ==='GET' && req.url.startsWith('/users/'))
    {
        const id = req.url.split('/')[2];
        const user = await getUserById(id);
        if(user)
        {
            res.writeHead(200);
            res.end(JSON.stringify(user));
        }
        else
        {
            res.writeHead(404);
            res.end(JSON.stringify({message:"user not found"}));
        }
    }
    else if(req.method==="PUT" && req.url.startsWith('/users/'))
    {
        const id = req.url.split('/')[2];
        const user = await parseBody(req);
        const result = await updateUser(id,user);

        if(result.modifiedCount > 0)
        {
            res.writeHead(200);
            res.end(JSON.stringify({message:"User updated successfully."}));
        }
        else
        {
            res.writeHead(404);
            res.end(JSON.stringify({message:"user not found"}));
        }
    }
    else if(req.method==="DELETE" && req.url.startsWith('/users/'))
    {
        const id = req.url.split('/')[2];
        const result =  await deleteUser(id);

        if(result.deletedCount > 0)
        {
            res.writeHead(200);
            res.end(JSON.stringify({message:"User deleted successfully."}));
        }
        else
        {
            res.writeHead(404);
            res.end(JSON.stringify({message:"user not found"}));
        }
    }

    else
    {
        res.writeHead(404);
        res.end(JSON.stringify({message:'Route not found'}));
    }
});

port = 7070;
myServer.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})

