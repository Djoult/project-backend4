import { User } from '../../models/index.js';
import { HttpError } from '../../helpers/index.js';

const { CLIENT_URL } = process.env;

const verify = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, 'User not found');
  }
  await User.findByIdAndUpdate(
    user._id,
    {
      verified: true,
    },
    { new: true }
  );

  //Need to be changed
  res.redirect(`${CLIENT_URL}/signin`);
};

export default verify;
