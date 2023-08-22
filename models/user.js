import { Schema, model } from "mongoose";
import { handleSaveError, handleUpdateValidate } from "../hooks/index.js";

const userSchema = new Schema({}, { versionKey: false, timestamps: true });

userSchema.pre("findOneAndUpdate", handleUpdateValidate);

userSchema.post("save", handleSaveError);

userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;
