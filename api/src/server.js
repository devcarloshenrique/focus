import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'
import "dotenv/config"

const PORT = process.env.NODE_LOCAL_PORT
const HOST = process.env.NODE_LOCAL_HOST

const app = express()
app.use(express.json())
app.use(cors());

const conn = mysql.createConnection({
    host: process.env.MYSQL_HOST,       
    user: process.env.MYSQL_USER,       
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

conn.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('MySQL container connected.');
});

app.get('/', (req, res) => {
    return res.status(200).send('Helow World');
});

app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});
