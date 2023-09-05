// import dotenv from 'dotenv';
import mongoose from 'mongoose';
// dotenv.config();
// mongoose.createConnection(process.env.DB_HOST, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });


// Створення схеми 
const subscriptionSchema = new mongoose.Schema({
  email: String,
});

export default subscriptionSchema;