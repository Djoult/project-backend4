import { User } from "../../models/index.js";
import path from "path";
import Jimp from "jimp";
import fs from "fs";

const updateUser = async (req, res) => {
  const { _id: owner } = req.user;
  const { name } = req.body;
  const { filename, path: oldPath } = req.file;
  if (filename) {
    const avatarURL = path.join("public", "avatars", filename);

    Jimp.read(path.join("tmp", filename), async (err, file) => {
      if (err) {
        throw err;
      }

      file.resize(100, 100).write(avatarURL);
      await fs.unlink(oldPath, (err) => {
        if (err) throw err;
      });
      const result = await User.findByIdAndUpdate(
        owner,
        { avatarURL, name },
        { new: true }
      );
      res.status(201).json(result);
    });
  } else {
    const result = await User.findByIdAndUpdate(owner, { name }, { new: true });
    res.status(201).json(result);
  }
};

export default updateUser;
