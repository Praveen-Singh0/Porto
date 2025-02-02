import mongoose, { Schema } from "mongoose";

const skillSchema = new Schema(
  {
    name: {
      type: String,
      required: ["skill name is required"],
      unique: true,
      trim: true
    },
    category: {
      type: String,
    },
    proficiency: {
      type: Number,
      min: 1,
      max: 100
    },
    icon: {
      type: String,
    }
  },
  {
    timestamps: true
  }
);

export const Skill = mongoose.model("Skill", skillSchema);
