import crypto from "crypto";
import express from "express";

export function createWebsiteRouter(db) {
  const router = express.Router();
  const websites = db.collection("websites");

  router.post("/:websiteName", async (req, res) => {
    const websiteName = req.params.websiteName;

    // This will throw an error automatically cuz mongodb handles that
    await websites.insertOne({
      _id: "site_" + crypto.randomBytes(8).toString("hex"),
      name: websiteName,
      // add owner id from appdata to owners.
      admin: [],
      createdAt: new Date(),
    });
    res.json({ status: 200 });
  });
  return router;
}
