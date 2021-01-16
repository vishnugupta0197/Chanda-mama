const express = require('express');
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//router

const userRoutes =  require('./routes/user');


// environment variable or you can say constants
env.config();

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
app.use('/api', userRoutes);


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
