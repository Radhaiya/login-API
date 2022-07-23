const express = require('express')
const app = express()
const dotenv = require('dotenv') 
const mongoose = require('mongoose')

dotenv.config();
const authRoute=require('./routes/auth')
const postRoute=require('./routes/posts')



mongoose.connect(process.env.DB_CONNECT).then(() => {
    console.log('Connected to Db');
}).catch((err)=>console.log(err))




app.use(express.json())



app.use('/api/posts', postRoute);

app.use('/api/user', authRoute);
  
app.get('/', (req, res) => {
    res.send("welcome")
})



app.listen(3000, () => {
    console.log("Running on Port 3000")

})