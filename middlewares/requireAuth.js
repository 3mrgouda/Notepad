import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(401)
      .json({ success: false, error: "Authorization header is missing" });
  }

  const token = authorization.replace("Bearer ", "");

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      console.error("JWT verification error:", err);
      return res
        .status(401)
        .json({
          success: false,
          error: "Invalid token or you must be logged in",
        });
    }

    if (!payload.id) {
      console.error("Token payload does not contain user ID:", payload);
      return res
        .status(401)
        .json({
          success: false,
          error: "Invalid token or you must be logged in",
        });
    }

    req.user = payload.id;
    next();
  });
};
