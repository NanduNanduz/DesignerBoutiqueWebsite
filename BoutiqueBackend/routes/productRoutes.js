const express = require("express");

const router = express.Router();

router.use(express.json());

const userModel = require("../model/productData");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const validator = require("validator")

const upload = require('../middleware/multer')





//add product
router.post(
  "/add",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
        
    } catch (error) {
        
    }
  }
);


//list product
router.get('/list', async(req,res)=>{

})


//single product info
router.get('/single', async(req,res)=>{

})


//remove product
router.post('/remove', async(req,res)=>{

})


module.exports = router;





