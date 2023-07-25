// this is going to be my style for a while!
import { Model, models, model } from "mongoose";
import { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

interface UserDocument extends Document {
  email: string;
  name: string;
  password: string;
  role: "admin" | "user";
}

interface Methods {
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument, {}, Methods>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

// hash the password before saving it to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    throw error;
  }
});

// compare the password method
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const userModel = models.User || model("User", userSchema);
export default userModel as Model<UserDocument, {}, Methods>;
