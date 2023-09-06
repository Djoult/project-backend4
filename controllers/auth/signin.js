import { User } from '../../models/index.js';
import { HttpError } from '../../helpers/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const { JWT_SECRET_KEY } = process.env;

const signIn = async (req, res) => {
  console.log('signIn');
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  }

  if (!user.verified) {
    throw HttpError(401, `Please verify your account on, ${email}`);
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '30d' });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(201).json({
    token,
    user: { email: user.email, name: user.name },
  });
};

export default signIn;
