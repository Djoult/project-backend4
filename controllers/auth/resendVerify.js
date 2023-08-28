// import { User } from "../../models/index.js";
// import { HttpError, sendEmail } from "../../helpers/index.js";

// const resendVerify = async (req, res) => {
//   const { email } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) {
//     throw HttpError(404, "User not found");
//   }
//   if(user.verify){
//     throw HttpError(400, "Verification has already been passed");
//   }

//   const { PORT } = process.env;
//   const verifyEmail = {
//     to: email,
//     subject: "Verify Email",
//     html: `<a href="http://localhost:${PORT}/api/auth/verify/${user.verificationToken}" target="_blank">Click verify email</a>`,
//   };
//   await sendEmail(verifyEmail)

//   res.json({message:"Verification email sent"})
// };

// export default resendVerify;