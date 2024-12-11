require('dotenv').config()
const express=require('express');
const cors=require('cors');
const app=express();

const port=5000;

//db connection
const dbConnection=require('./DbConfiger/dbConfig.js')



// user routers middleware file
const userRoutes=require('./routes/userRoute.js')

// question route middleware file
const questionRoutes=require('./routes/questionRoute.js');
// authentication middleWare
const authMiddleware=require('./middleware/authMiddleware.js')

// json middleware to extract json data
app.use(express.json())

// user routes middleware
app.use('/api/users',userRoutes);

// question router middleware
app.use('/api/questions',authMiddleware,questionRoutes);

async function start(){
    try {
     const result=   await dbConnection.execute("select 'test' ")
     await app.listen(port);
     console.log("Database connection established")
     console.log(`listing on ${port}`)
    } catch (error) {
        console.log(error.message)
    }
}
start();

