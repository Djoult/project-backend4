import { Schema, model } from "mongoose";
import { handleSaveError, handleUpdateValidate } from "../hooks/index.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    avatarURL: {
        type: String,
        default: null,
      },
    token: {
        type: String,
        default: null,
      },
    
      verify: {
        type: Boolean,
        default: false,
      },
      verificationToken: {
        type: String
      },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre("findOneAndUpdate", handleUpdateValidate);

userSchema.post("save", handleSaveError);

userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;
