const http = require('http');
const mysql = require('mysql2');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// MySQL connection configuration
const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    port: 3306,
    database: 'nodejsdb'
});

dbConn.connect((err) => {
    if (err) throw err;
    console.log("Connected to database...");
});

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' }); // Ensure this directory exists

const myServer = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/add-student') {
        // Parse the form data using multer
        upload.single('imag')(req, res, (err) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end("Error in file upload");
                console.error(err);
                return;
            }

            const { sname, city } = req.body;
            const file = req.file;

            if (!file) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end("No file uploaded");
                return;
            }

            const filePath = file.path;
            console.log(`File uploaded to: ${filePath}`); // Debugging: log the file path

            fs.readFile(filePath, "base64", (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end("Error in reading file data");
                    console.error(err);
                    return;
                }

                const sqlQry = "INSERT INTO student (sname, city, photo) VALUES (?, ?, ?)";
                dbConn.query(sqlQry, [sname, city, data], (err, result) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end("Error in inserting data");
                        console.error(err);
                        return;
                    }

                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end(`Student added: ${result.affectedRows}`);
                });
            });
        });
    }
    else if (req.method === 'GET' && req.url === '/get-students') {
        const sqlQry = "SELECT sid, sname, city, photo FROM student";
        dbConn.query(sqlQry, (err, results) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end("Error in fetching data");
                console.error(err);
                return;
            }

            // Format the results to include the base64 data
            const formattedResults = results.map(student => ({
                id: student.id,
                sname: student.sname,
                city: student.city,
                photo: `data:image/jpeg;base64,${student.photo}` // Assuming the image is a JPEG
            }));

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(formattedResults));
        });

    } 
    else if (req.method === 'DELETE' && req.url.startsWith('/delete-student')) {
        // Parse the ID from the query string
        const urlParts = req.url.split('?');
        const query = new URLSearchParams(urlParts[1]);
        const studentId = query.get('id');

        if (!studentId) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end("Student ID is required");
            return;
        }

        const sqlQry = "DELETE FROM student WHERE sid = ?";
        dbConn.query(sqlQry, [studentId], (err, result) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end("Error in deleting data");
                console.error(err);
                return;
            }

            if (result.affectedRows === 0) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end("Student not found");
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Student deleted: ${result.affectedRows}`);
        });
    }
    
    else 
    {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("Not Found");
    }
    
});



const port = 7070;
myServer.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
