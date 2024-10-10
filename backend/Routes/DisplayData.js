const express = require('express');
const router = express.Router();
global.food_items = require("/foodData2.json");
global.foodCategory = require("/foodCategory.json")
router.post('/foodData',(req,res)=>{
        try {
               res.send([global.food_items,global.foodCategory])
               console.log(global.food_items) 
        } catch (error) {
                console,error(error.massage)
                res.send("server started")
        }
})

module.exports = router;