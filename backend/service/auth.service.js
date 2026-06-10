import bcrypt from "bcrypt"
import User from "../models/user.model.js";

export const registerUser = async (email, password) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
 
  const user = await User.create({
    email,
    password: hashedPassword,
  });
  
  return {
    id: user._id,
    email: user.email,
  }
}
export const loginUser = async(email,password) =>{
    const user = await User.findOne({email});
    if (!user){
      throw new Error("User not found")
    }
    const isMatch = await bcrypt.compare(password,user.password)
    
    if (!isMatch){
      throw new Error("Invalid credentials")
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
      email: user.email
    }
  }
}
