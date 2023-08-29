import sendEmail from "../../helpers/sendEmail.js";
import Subscription from "../../models/subscription.js";
// Функція для підписки користувача
export const subscribe = async (req, res) => {
  const { email_address } = req.body;

  try {
    // шукаємо існуючу підписку 
    const existingSubscription = await Subscription.findOne({ email_address });

    if (existingSubscription) {
      // Якщо підписка існує, перевіряємо, чи вона не підписана
      if (!existingSubscription.subscribed) {
        existingSubscription.subscribed = true; // Якщо не підписана, встановлюємо підписку на true
        await existingSubscription.save();// Зберігаємо зміни в базі даних
      }
    } else {
      // Якщо підписка не існує, створюємо нову підписку
      const newSubscription = new Subscription({ email_address });
      await newSubscription.save();// Зберігаємо нову підписку в базі даних
    }
 // Підготовка та надсилання листа підтвердження підписки
    const confirmationEmail = {
      to: email_address,
      subject: "Subscription Confirmation",
      html: "<p>Thank you for subscribing to our newsletter!</p>",
    };

    await sendEmail(confirmationEmail);
    res.json({ status: "success", message: "Subscription successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Operation failed" });
  }
};


