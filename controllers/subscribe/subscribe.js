import { validateEmail } from "../../helpers/subscripionHelper.js";
import { mailer } from "../../helpers/subscrptionMailService.js";
import Subscription from "../../models/subscription.js";

export const subscribe = async function(req, res) {
    try {
        // Check if the email exists first of all
        let checkSubscription = await Subscription.Subscription.find({ 'email' : req.body.email });
        
        // If it doesn't..
        if(checkSubscription.length === 0) {
            // Then validate the email
            if(validateEmail(req.body.email)) {
                // And add it to the database
                const newSubscription = new Subscription.Subscription({
                    email: req.body.email,
                });
                newSubscription.save(function(err) {
                    if(err) {
                        res.status(400).send({ "message" : "Error saving your email.", "code" : "02" });
                    } else {
                      mailer("Subscription Confirmation", { 'content': "You have successfully subscribed!" });  
                      res.status(200).send({ "message": "User has subscribed.", "code": "03" });
                    }
                })
            } else {
                // Otherwise show errors
                res.status(400).send({ "message" : "Error saving your email.", "code" : "02" });
            }
        } else {
            res.status(201).send({ "message" : "User Already Subscribed.", "code" : "02"  });
        }
    } catch(e) {
        // Or a real error if something really goes wrong
        console.log(e);
    }
};

export const unsubscribe = async (req, res) => {
    // Unsubscribe email
    if(typeof req.params.email !== "undefined") {
        // When we unsubscribe, check for an email
        let findEmail = await Subscription.Subscription.find({ "email" : req.params.email });

        if(findEmail.length > 0) {
            // If it exists, remove it
            await Subscription.Subscription.deleteOne({ "email" : req.params.email });
          mailer("Unsubscribe Confirmation", { 'content': "You have successfully unsubscribed!" });  
          res.send({ "message": "Email deleted.", "code": "00" });
        }
        else {
            // Otherwise the user wasn't even subscribed to begin with
            res.send({ "message" : "Email doesn't exist.", "code" : "01"})
        }
    }
}