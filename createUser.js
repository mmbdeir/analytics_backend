/*
How to start: node createUser.js email password
*/

import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function main(params) {
  await client.connect();
  const db = client.db("analytics");
  const users = db.collection("users");

  const [email, password] = process.argv.slice(2);

  if (!email || !password) {
    console.log("Usage: node createUser.js <email> <password>");
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await users.insertOne({
    email,
    passwordHash,
    createdAt: new Date(),
    role: "user",
  });
}

main().catch((err) => {
  console.log(`Error: ${err}`);
});
process.exit(1);
