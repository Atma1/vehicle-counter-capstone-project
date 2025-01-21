import mysql from 'mysql2/promise';

const createDBConnection = () => {
    return mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    })
}

export default createDBConnection;



