import { User } from "../../models/index.js";
import { HttpError } from "../../helpers/index.js";

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  console.log(verificationToken);
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
    new: true,
  });
  res.json({ message: "Verification successful" });
};

export default verify;
