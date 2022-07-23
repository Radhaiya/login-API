const router = require('express').Router()
const User = require('../model/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv') 

dotenv.config()



router.post('/register', async (req, res) => {


     const emailExist = await User.findOne({email:req.body.email})
   
   
     
    if (emailExist) {
      return res.status(400).send("Email Already Exist")
  }

 //Hashing
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password,salt)
    

     const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedpassword,
        
     });
    
    
    
    
    try {
        const savedUser = await user.save()
        res.send("User Registered")
    } catch (err) {
        res.status(400).send(err)
    }

});

router.post('/login', async (req, res) => {


    const user = await User.findOne({email:req.body.email})
    if (!user) {
        return res.status(400).send('User Doesnt Exist')
       
    }
    const validpass= await bcrypt.compare(req.body.password,user.password)
    console.log(validpass)
    if (!validpass) {
        return res.status(400).send('Invalid password')
    } 
    ;
    const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token);
});





module.exports = router;