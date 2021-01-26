const express = require('express');
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//router

const authRoutes =  require('./routes/auth');
const adminRoutes = require('./routes/admin/auth')


// environment variable or you can say constants
env.config();
//mongodb+srv://<username>:<password>@cluster0.qhgav.mongodb.net/test
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.qhgav.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
     {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex:true
    }
).then(()=>{
    console.log('database connected');

});
app.use(bodyParser.json());
app.use('/api', authRoutes);
app.use('/api',adminRoutes);



app.get('/',(req,res,next)=>{
    res.status(200).json({
        message: 'Hello from server'
    });
});

app.post('/data',(req,res,next)=>{
    res.status(200).json({
        message: req.body
    });
});

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});
