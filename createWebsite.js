import crypto from "crypto";
import express from "express";
import { auth } from "./auth.js";

export function createWebsiteRouter(db) {
  const router = express.Router();
  const websites = db.collection("websites");

  router.post("/:websiteName", auth, async (req, res) => {
    const websiteName = req.params.websiteName;
    const creator = req.user.email;

    // This will throw an error automatically cuz mongodb handles that
    await websites.insertOne({
      _id: "site_" + crypto.randomBytes(8).toString("hex"),
      name: websiteName,
      // add owner id from appdata to owners.
      admin: [creator],
      createdAt: new Date(),
    });
    res.status(200).json({ success: "True" });
  });
  return router;
}
