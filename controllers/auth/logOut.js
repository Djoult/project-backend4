import { User } from "../../models/index.js";
import "dotenv/config";

const logOut = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({ message: "Logout success" });
};

export default logOut;
