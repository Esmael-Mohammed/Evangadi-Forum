const express=require('express');
const cors=require('cors');
const app=express();

const port=5000;
app.listen(port,(error)=>{
    if(error){
        console.log(error)
    }else{
       console.log(`listing on ${port}`) 
    }
})