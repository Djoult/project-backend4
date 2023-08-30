import sendEmail from "../../helpers/sendEmail.js";
import Subscription from "../../models/subscription.js";
import User from "../../models/user.js";
// Функція для підписки користувача
export const subscribe = async (req, res) => {
  const { email_address } = req.body;
  const { id } = req.user;

  try {
    // Шукаємо існуючу підписку
    let existingSubscription = await Subscription.findOne({ email_address });

    if (!existingSubscription) {
      // Якщо підписки немає, створюємо нову
      existingSubscription = new Subscription({ email_address });
      await existingSubscription.save(); // Зберігаємо нову підписку в базі даних
    } else if (!existingSubscription.subscribed) {
      // Якщо підписка існує, але не підписана
      existingSubscription.subscribed = true;
      await existingSubscription.save(); // Зберігаємо зміни в базі даних
    }
    //знаходимо користувача та підписуємо його
    await User.findByIdAndUpdate(id, { subscription: email });
 // Підготовка та надсилання листа підтвердження підписки
    const confirmationEmail = {
      to: email_address,
      subject: "Subscription Confirmation",
      html: "<p>Thank you for subscribing to our recipes!</p>",
    };

    await sendEmail(confirmationEmail);
    res.json({ status: "success", message: "Subscription successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Operation failed" });
  }
};


