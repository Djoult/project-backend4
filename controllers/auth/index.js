import { ctrlWrapper } from '../../decorators/index.js';

import signUp from './signup.js';
import signIn from './signin.js';
import updateUser from './updateUser.js';
import verify from './verify.js';
// import resendVerify from "./resendVerify.js";
import getCurrent from './getCurrent.js';
import logOut from './logOut.js';

export default {
  signUp: ctrlWrapper(signUp),
  signIn: ctrlWrapper(signIn),
  updateUser: ctrlWrapper(updateUser),
  verify: ctrlWrapper(verify),
  // resendVerify: ctrlWrapper(resendVerify),
  getCurrent: ctrlWrapper(getCurrent),
  logOut: ctrlWrapper(logOut),
};
