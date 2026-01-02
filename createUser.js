import bcrypt from "bcrypt";
import express from "express";

export function createUser(db) {
  const router = express.Router();
  const users = db.collection("users");

  router.post("/:email/:password", async (req, res) => {
    const email = req.params.email;
    const password = req.params.password;
    const passwordHash = await bcrypt.hash(password, 10);

    // This will throw an error automatically
    await users.insertOne({
      _id: email,
      passwordHash,
      createdAt: new Date(),
      role: "user",
    });
    res.json({ statusCode: 200 });
  });
  return router;
}
