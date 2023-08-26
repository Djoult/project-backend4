//     Якщо action дорівнює "subscribe":
//         Перевіряємо, чи існує підписка для заданої електронної адреси.
//         Якщо така підписка вже існує і не підписана, то ми встановлюємо subscribed значення true.
//         Якщо підписка не існує, ми створюємо новий запис підписки в базі даних.
//         Після цього ми надсилаємо підтвердження підписки на вказану електронну адресу.
//         Відправляємо відповідь з статусом success.

//     Якщо action дорівнює "unsubscribe":
//         Перевіряємо, чи існує підписка для заданої електронної адреси.
//         Якщо така підписка існує, ми встановлюємо subscribed false.
//         Відправляємо відповідь з повідомленням про успішну відписку.
//         Якщо підписка не знайдена, відправляємо відповідь зі статусом 404.

//     Якщо параметр action має інше значення, ми відправляємо відповідь зі статусом 400 та повідомленням "Invalid action".

// В разі помилки під час виконання будь-якої з цих операцій, ми надсилаємо відповідь зі статусом 500 та повідомленням "Operation failed".

import express from "express";
import {Subscription} from '../../models/index.js'

const subscriptionRouter = express.Router();

//додав свою пошту
const emailBox = "taras.papka@ukr.net";


subscriptionRouter.post("/", async (req, res) => {
  const { action, email_address } = req.body;

  try {
    const existingSubscription = await Subscription.findOne({ email_address });

    if (action === "subscribe") {
      if (existingSubscription) {
        if (!existingSubscription.subscribed) {
          existingSubscription.subscribed = true;
          await existingSubscription.save();
        }
      } else {
        const newSubscription = new Subscription({ email_address });
        await newSubscription.save();
      }
//лист сповіщення про підписку
      const confirmationEmail = {
        to: email_address,
        from: emailBox,
        subject: "Subscription Confirmation",
        html: "<p>Thank you for subscribing to our newsletter!</p>",
      };

      await transporter.sendMail(confirmationEmail);
      res.json({ status: "success", message: "Subscription successful" });
    } else if (action === "unsubscribe") {
      if (existingSubscription) {
        existingSubscription.subscribed = false;
        await existingSubscription.save();
        res.json({ status: "success", message: "Unsubscribed successfully" });
      } else {
        res.status(404).json({ status: "error", message: "Subscription not found" });
      }
    } else {
      res.status(400).json({ status: "error", message: "Invalid action" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Operation failed" });
  }
});

export default subscriptionRouter;