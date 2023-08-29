import { User } from '../../models/index.js';
import { HttpError, sendEmail } from '../../helpers/index.js';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
import { nanoid } from 'nanoid';

const singUp = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name);
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, 'Email in use');
  }

  const verificationToken = nanoid();
  console.log(verificationToken);
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
    html: `<a href="${BASE_URL}/api/auth/verify/${verificationToken}" target="_blank">Click verify email</a>`,
  };

  await sendEmail(verifyEmail).then(() => {
    return res.status(201).json({
      name: newUser.name,
      email: newUser.email,
      needVerification: true,
    });
  });
};

export default singUp;
