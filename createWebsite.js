import crypto from "crypto";

export async function createWebsite(db, websiteName) {
  const users = db.collection("websites");

  if (!websiteName) {
    console.log("Use: analytics-cli create-website <website name>");
    process.exit(1);
  }

  await users.insertOne({
    _id: "site_" + crypto.randomBytes(8).toString("hex"),
    // add owner id from appdata to owners.
    owners: [],
    createdAt: new Date(),
  });
}
