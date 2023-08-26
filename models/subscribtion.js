import { Schema, model } from 'mongoose';

// Створення схеми та моделі підписки
const subscriptionSchema = new Schema({
  email_address: String,
  subscribed: { type: Boolean, default: true },
});

const Subscription = model("Subscription", subscriptionSchema);

export default Subscription;