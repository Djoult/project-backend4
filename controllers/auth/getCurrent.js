import "dotenv/config";
import { User } from "../../models/index.js";

const getCurrent = async(req, res) => {
  const { email, name, avatarUrl } = req.user;

  res.json({ email, name, avatarUrl});
};

export default getCurrent;
