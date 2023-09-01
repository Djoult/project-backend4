import { ctrlWrapper } from '../../decorators/index.js';

import singUp from './signup.js';
import singIn from './signin.js';
import updateUser from './updateUser.js';
import verify from './verify.js';
// import resendVerify from "./resendVerify.js";
import getCurrent from './getCurrent.js';
import logOut from './logout.js';

export default {
  singUp: ctrlWrapper(singUp),
  singIn: ctrlWrapper(singIn),
  updateUser: ctrlWrapper(updateUser),
  verify: ctrlWrapper(verify),
  // resendVerify: ctrlWrapper(resendVerify),
  getCurrent: ctrlWrapper(getCurrent),
  logOut: ctrlWrapper(logOut),
};
