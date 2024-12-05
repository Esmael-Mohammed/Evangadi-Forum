const mysql=require('mysql2');

const dbConnection=mysql.createPool({
    user:"evangadi-admin",
    database:"evangadi-db",
    password:"123456",
    host:"localhost"
})
dbConnection.execute("select ' test'",(err,result)=>{
    if(err){
        console.log(err)
    }else
    {
        console.log(result) 
    }
})
