import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";


const UserSchema = new Schema(
  {
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Method to compare password
UserSchema.methods.comparePassword = async function (
  candidatePassword
){
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.User || mongoose.model("User", UserSchema);
