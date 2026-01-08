import jwt from "jsonwebtoken";

export function auth(req, res) {
  const bearer = req.headers.token;
  if (!bearer)
    res.json({
      error: "No token recieved in headers.",
    });

  const token = bearer.split(" ")[1];

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    console.log(err);
    return res.json({ error: err });
  });
}
