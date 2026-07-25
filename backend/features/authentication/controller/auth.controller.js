import { registerUser, loginUser } from "../service/auth.service.js";

export const register = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    const user = await registerUser(fullName, email, password);

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
  
    const result = await loginUser(email, password);

    res.status(200).json(result);
  
  }
    catch (error) {
    next(error);
  }
}
