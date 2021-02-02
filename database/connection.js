const mongoose = require('mongoose');
// MONGODB_URI is in ".env" file
const connection = async()=>{
    const conn=await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
}

module.exports=connection;