const mongoose= require('mongoose');

const connectDb = async ()=>{
    try {
        
        await mongoose.connect('mongodb://root:example@localhost:27017')
            console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}
module.exports= connectDb;