import { User } from '../../models/index.js';
import { HttpError, sendEmail } from '../../helpers/index.js';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
import { nanoid } from 'nanoid';
import { PASSWORD_MAX, PASSWORD_MIN } from '../../constants/misc.js';

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, 'Email in use');
  }

  const verificationToken = nanoid();

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
    verificationToken,
  });

  const { BASE_URL } = process.env;

  const verifyEmail = {
    to: email,
    subject: 'Verify Email',
    html: `
<div style ="border:0; background: black; width: 100%; display:block;outline:none;text-decoration:none;font-size:24px; color: white; padding-top: 6px; padding-left:1px;">
If you have not registered with Drink Master, ignore this letter. If you want to verify your account, follow <a style ="color: orange" href="${BASE_URL}/api/auth/verify/${verificationToken}" target="_blank">the link</a></div>
<img alt="Drink Master" height="auto" src="https://resizing.flixster.com/lLn5KKVLPHuCDOmZ-0UjoN6MuRo=/ems.cHJkLWVtcy1hc3NldHMvdHZzZXJpZXMvMWEwNGRiMTQtODRkMi00ZjE3LWEzZDctNjY1ZGE1OGQyNTg1LmpwZw==" style="border:0;display:inline;outline:none;text-decoration:none;height:auto;width:100%;font-size:15px" class="CToWUd" data-bit="iit">`,
  };

  await sendEmail(verifyEmail).then(() => {
    return res.status(201).json({
      name: newUser.name,
      email: newUser.email,
      needVerification: true,
    });
  });
};

export default signUp;
