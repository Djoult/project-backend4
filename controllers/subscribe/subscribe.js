import { validateEmail } from "../../helpers/subscripionHelper.js";
import { mailer } from "../../helpers/subscrptionMailService.js";
import Subscription from "../../models/subscription.js";

export const subscribe = async function (req, res) {
    try {
        const { email } = req.body;

        // Перевіряємо, чи існує адреса електронної пошти в базі даних
        const existingSubscription = await Subscription.findOne({ email });

        if (existingSubscription) {
            return res.status(200).send({ "message": "User Already Subscribed.", "code": "02" });
        }

        if (validateEmail(email)) {
            const newSubscription = new Subscription({
                email,
            });

            await newSubscription.save();

            mailer("Subscription Confirmation", { 'content': "You have successfully subscribed!" });
            return res.status(200).send({ "message": "User has subscribed.", "code": "03" });
        } else {
            return res.status(400).send({ "message": "Invalid email format.", "code": "02" });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).send({ "message": "Internal Server Error", "code": "01" });
    }
};

export const unsubscribe = async (req, res) => {
    // Відписати email
    const { email } = req.params;

    if (email) {
        const existingSubscription = await Subscription.findOne({ email });

        if (existingSubscription) {
            await Subscription.deleteOne({ email });
            mailer("Unsubscribe Confirmation", { 'content': "You have successfully unsubscribed!" });
            return res.status(200).send({ "message": "Email deleted.", "code": "00" });
        } else {
            return res.status(400).send({ "message": "Email not found.", "code": "01" });
        }
    } else {
        return res.status(400).send({ "message": "Email parameter is missing.", "code": "01" });
    }
};