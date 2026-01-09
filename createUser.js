import bcrypt from "bcrypt";
import express from "express";

export function createUser(db) {
  const router = express.Router();
  const users = db.collection("users");

  router.post("/:email/:password", async (req, res) => {
    try {
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
      res.status(200).json({ success: "True" });
    } catch (err) {
      if (err.code == 11000) {
        return res
          .status(409)
          .json({ error: "User with email already exists." });
      }
      return res.status(500).json({ error: err.message });
    }
    //HANDLE DUPLICATE KEY ERROR
  });
  return router;
}
