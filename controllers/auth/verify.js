import { User } from '../../models/index.js';
import { HttpError } from '../../helpers/index.js';
import jwt from 'jsonwebtoken';

const { CLIENT_URL, JWT_SECRET_KEY } = process.env;

const verify = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, 'User not found');
  }

  if (!user.verified) {
    const payload = { id: user._id };
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '30d' });

    await User.findByIdAndUpdate(
      user._id,
      {
        verified: true,
        token,
      },
      { new: true }
    );

  
    res.redirect(`${CLIENT_URL}/signin/?token=${token}`);
  } else {
    res.json({ message: 'User already verified' });
  }
};

export default verify;
