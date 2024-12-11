const mysql=require('mysql2');

const dbConnection=mysql.createPool({
    user:process.env.USER,
    database:process.env.DATABASE,
    password:process.env.PASSWORD,
    host:"localhost"
})


module.exports=dbConnection.promise();
