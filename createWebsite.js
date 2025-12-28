import crypto from "crypto";

export async function createWebsite(db, websiteName) {
  const websites = db.collection("websites");

  if (!websiteName) {
    throw new Error("Use: analytics-cli create-website <website name>.");
  }

  await websites.insertOne({
    _id: "site_" + crypto.randomBytes(8).toString("hex"),
    // add owner id from appdata to owners.
    owners: [],
    createdAt: new Date(),
  });
}
