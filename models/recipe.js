import { Schema, model } from "mongoose";

import { handleSaveError, handleUpdateValidate } from "../hooks/index.js";

const recipeSchema = new Schema(
  {},

  { versionKey: false, timestamps: true }
);

recipeSchema.pre("findOneAndUpdate", handleUpdateValidate);

recipeSchema.post("save", handleSaveError);

recipeSchema.post("findOneAndUpdate", handleSaveError);

const Recipe = model("recipe", recipeSchema);

export default Recipe;
