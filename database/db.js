const {createPool } = require('mysql');


const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'CLIENT',
    connectionLimit:10
})


pool.query(`SELECT * FROM EMPLOYEE`,(err, result,fields) => {
    if (err) {
        return console.error(err);
    }
    return console.log(result);
})