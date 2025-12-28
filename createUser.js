import bcrypt from "bcrypt";

export async function createUser(db, email, password) {
  const users = db.collection("users");

  if (!email || !password) {
    console.log("Use: analytics-cli create-user <email> <password>");
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await users.insertOne({
    _id: email,
    passwordHash,
    createdAt: new Date(),
    role: "user",
  });
}
