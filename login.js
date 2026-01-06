import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";

export function login(db) {
  const router = express.Router();
  const users = db.collection("users");

  router.post("/:email/:password", async (req, res) => {
    const email = req.params.email;
    const password = req.params.password;

    const userDocument = await users.findOne({ _id: email });
    if (!userDocument) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, userDocument.passwordHash);

    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ email }, process.env.SECRET);
    res.status(200).json({ token });
  });
  return router;
  //Login logic
  // console.log("Login successful");
}
