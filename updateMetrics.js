import express from "express";

export function updateMetrics() {
  const router = express.Router();
  const websites = db.collection("websites");

  router.post("/", async (req, res) => {
    try {
      const siteID = req.body.siteID;
      const url = req.body.url;

      if (!siteID) return res.status(400).json({ error: "Missing siteID" });

      const website = websites.findOne({ _id: siteID });

      if (!website)
        return res.status(404).json({ error: "Website ID not found." });

      //Update metrics bellow:

      res.status(200).json({ success: "True" });
    } catch (err) {
      return res.json({ error: err });
    }
  });
}
