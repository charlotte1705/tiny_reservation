import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export type UserType = {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    // verificationToken: string; // New field to store verification token
    // verified: boolean; // New field to indicate if email is verified
};
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, required: true },
    // verificationToken: { type: String }, // Added field
    // verified: { type: Boolean, default: false }, // Added field with default value
  });

  userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 8);
    }
    next();
  });

const User = mongoose.model<UserType>("User", userSchema);


export default User;