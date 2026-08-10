require("dotenv").config();
const connectDB = require("./config/db");
const express=require('express');
const cors=require('cors');
const authRoutes=require('./routes/authRoutes');
const userRoutes=require('./routes/userRoutes');

const app=express();

app.use(cors());
app.use(express.json());

connectDB();

app.get('/',(req,res)=>{
    res.send('Hello World!');
});

app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);

const port=process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});