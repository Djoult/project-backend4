// import Subscription from "../../models/subscription.js";
// //Функція для відписки користувача
// export const unsubscribe = async (req, res) => {
//   const { email_address } = req.body;// Отримання електронної адреси з тіла запиту

//   try {
//     // шукаємо існуючу підписку 
//     const existingSubscription = await Subscription.findOne({ email_address });

//     if (existingSubscription) {
//       existingSubscription.subscribed = false;//ставимо на false для відписки
//       await existingSubscription.save();// Збереження змін у базі даних
//       res.json({ status: "success", message: "Unsubscribed successfully" });
//     } else {
//       res.status(404).json({ status: "error", message: "Subscription not found" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ status: "error", message: "Operation failed" });
//   }
// };
