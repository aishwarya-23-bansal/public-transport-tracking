require("dotenv").config();
const connectDB = require("./config/db");
const express=require('express');
const cors=require('cors');
const authRoutes=require('./routes/authRoutes');
const userRoutes=require('./routes/userRoutes');
const routeRoutes = require("./routes/routeRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const tripRoutes = require("./routes/tripRoutes");
const savedRouteRoutes = require("./routes/savedRouteRoutes");
const trackingRoutes = require("./routes/trackingRoutes");
const app=express();
const alertRoutes = require("./routes/alertRoutes");
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

connectDB();

app.get('/',(req,res)=>{
    res.send('Hello World!');
});

app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/tracking", trackingRoutes);
app.use("/api/saved-routes", savedRouteRoutes);
const port=process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});

