import { model } from 'mongoose';
import subscriptionSchema from '../schemas/subscriptionSchema.js';

// Створення моделі підписки
const Subscription = model("subscriptions", subscriptionSchema);

export default Subscription;
