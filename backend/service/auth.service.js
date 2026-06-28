import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/user.model.js";

export const registerUser = async (fullName, email, password) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
 
  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
  });
  
  return {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
  }
}
export const loginUser = async(email,password) =>{
    const user = await User.findOne({email});
    const isMatch = await bcrypt.compare(password,user.password)
    
    if (!user || !isMatch){
      throw new Error("Invalid email or password")
    }
    const token = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);
  return {
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email
    }
  }
}
