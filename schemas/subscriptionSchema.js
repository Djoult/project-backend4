// import { Schema } from "mongoose";

// // Створення схеми 
// const subscriptionSchema = new Schema({
//   email_address: String,
//   subscribed: { type: Boolean, default: true },
// });

// export default Subscription
import { Schema } from "mongoose";

// Створення схеми 
const subscriptionSchema = new Schema({
  email_address: String,
  subscribed: { type: Boolean, default: true },
});

export default subscriptionSchema;