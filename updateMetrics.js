import express from "express";

export function updateMetrics(db) {
  const router = express.Router();
  const websites = db.collection("websites");

  router.post("/:id", async (req, res) => {
    try {
      const siteID = req.params.siteID;

      if (!siteID) return res.status(400).json({ error: "Missing siteID" });

      const extra = req.body;

      await websites.updateOne(
        { _id: siteID },
        {
          $inc: { visits: 1 },
          $set: { lastVisit: new Date() },
        },
        ...extra
      );

      res.status(200).json({ success: "True" });
    } catch (err) {
      return res.json({ error: err });
    }
  });
}
