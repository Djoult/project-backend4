import "dotenv/config";
import { User } from "../../models/index.js";

const getCurrent = async(req, res) => {
  const { email } = req.user;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "User not found");
  }

  console.log(user);

  res.json({ email: user.email, name: user.name, avatarUrl: user.avatarURL});
};

export default getCurrent;
