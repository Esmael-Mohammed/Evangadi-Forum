const express=require('express');
const router=express.Router();
//authentication  middleware
const authMiddleware=require('../middleware/authMiddleware')
router.get('/all-question',authMiddleware,(req,res)=>{
    res.send('get all question')
})
module.exports=router;