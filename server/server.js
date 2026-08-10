require("dotenv").config();
const connectDB = require("./config/db");
const express=require('express');
const cors=require('cors');
const authRoutes=require('./routes/authRoutes');

const app=express();

app.use(cors());
app.use(express.json());

connectDB();

app.get('/',(req,res)=>{
    res.send('Hello World!');
});
app.use('/api/auth',authRoutes);


const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});