import { registerUser, loginUser } from "../service/auth.service.js";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await registerUser(email, password);

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
  
    const result = await loginUser(email, password);

    res.status(200).json(result);
  
  }
    catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}