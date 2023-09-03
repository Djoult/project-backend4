import { User } from '../../models/index.js';
import path from 'path';
import Jimp from 'jimp';
import fs from 'fs';

const updateUser = async (req, res) => {
  const { _id: owner } = req.user;
  const { name } = JSON.parse(req.body?.json || {});
  const { filename } = req.file || {};

  if (filename) {
    const avatarUrl = path.join('avatars', filename)?.replace(/\\/g, '/');

    Jimp.read(path.join('tmp', filename), async (err, file) => {
      if (err) {
        throw err;
      }

      file.resize(100, 100).write('public/' + avatarUrl);
      await fs.unlink(`tmp/${filename}`, err => {
        if (err) throw err;
      });
      const user = await User.findByIdAndUpdate(
        owner,
        { avatarUrl, name },
        { new: true }
      );
      res
        .status(201)
        .json({
          email: user.email,
          name: user.name,
          avatarUrl: user.avatarUrl,
        });
    });
  } else {
    const user = await User.findByIdAndUpdate(owner, { name }, { new: true });
    res
      .status(201)
      .json({ email: user.email, name: user.name, avatarUrl: user.avatarUrl });
  }
};

export default updateUser;
