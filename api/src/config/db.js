import mysql from 'mysql2'

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,       
    user: process.env.MYSQL_USER,       
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Contêiner MySQL conectado.');
});

export default db;