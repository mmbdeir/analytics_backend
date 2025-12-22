/*
How to start: node createUser.js email password
*/
import getDB from "./index.js";
import crypto from "crypto";

async function main() {
  const db = await getDB();
  const users = db.collection("websites");

  const websiteName = process.argv.slice(2);

  if (!websiteName) {
    console.log("Use: node createWebsite.js <website name> <email>");
    process.exit(1);
  }

  await users.insertOne({
    _id: "site_" + crypto.randomBytes(8).toString("hex"),
    owners: [],
    createdAt: new Date(),
  });
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
    process.exit(1);
  });
