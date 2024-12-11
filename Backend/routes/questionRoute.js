const express=require('express');
const router=express.Router();
router.get('/all-question', (req,res)=>{
    res.send('get all question')
})
module.exports=router;