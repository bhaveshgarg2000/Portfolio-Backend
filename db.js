const {createPool } = require('mysql');


const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'form',
    connectionLimit:100
})


pool.query(`SELECT * FROM CLIENT`,(err, result,fields) => {
    if (err) {
        return console.error(err);
    }
    return console.log(result);
})