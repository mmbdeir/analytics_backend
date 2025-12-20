/*
How to start: node createUser.js email password
*/
import bcrypt from "bcrypt";
import { getDB } from "./index.js";

async function main() {
  const db = await getDB();
  const users = db.collection("users");

  const [email, password] = process.argv.slice(2);

  if (!email || !password) {
    console.log("Use: node createUser.js <email> <password>");
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

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
    process.exit(1);
  });
