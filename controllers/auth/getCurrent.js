import "dotenv/config";
import { User } from "../../models/index.js";

const getCurrent = async(req, res) => {
  const { email } = req.user;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "User not found");
  }

  res.json({ email: user.email, name: user.name, avatarUrl: user.avatarUrl});
};

export default getCurrent;
