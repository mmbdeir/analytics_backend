import jwt from "jsonwebtoken";

export function auth(req, res, next) {
  const bearer = req.headers.token;
  if (!bearer)
    res.json({
      error: "No token recieved in headers.",
    });

  const token = bearer.split(" ")[1];

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.json({ error: "Invalid or expire token" });
    }
    req.user = decoded;
    next();
  });
}
