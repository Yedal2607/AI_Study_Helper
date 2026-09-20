import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authentication token is required"
    });
  }

  const token = authHeader.slice("Bearer ".length);

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { userId };

    next();
  } catch {
    return res.status(401).json({
      message: "Invalid or expired authentication token"
    });
  }
};