import jwt from "jsonwebtoken";

export function auth(req, res, next) {
  const bearer = req.headers.authorization;
  if (!bearer)
    return res.json({
      error: "No token recieved in headers.",
    });

  const parts = header.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ error: "Invalid Authorization header" });
  }

  const token = parts[1];

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.json({ error: "Invalid or expire token" });
    }
    req.user = decoded;
    next();
  });
}
