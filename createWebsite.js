import crypto from "crypto";
import express from "express";
import { auth } from "./auth.js";

export function createWebsiteRouter(db) {
  const router = express.Router();
  const websites = db.collection("websites");

  router.post("/:websiteName", auth, async (req, res) => {
    const websiteName = req.params.websiteName;
    const creator = req.user.email;

    //Create site ID and add it to following object. Then return it in res.json()

    // This will throw an error automatically cuz mongodb handles that
    const id = crypto.randomBytes(10).toString("hex");
    try {
      await websites.insertOne({
        _id: id,
        name: websiteName,
        admin: [creator],
        createdAt: new Date(),
      });
      res.status(200).json({ success: "True", id: id });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });
  return router;
}
