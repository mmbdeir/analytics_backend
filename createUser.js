import bcrypt from "bcrypt";

export async function createUser(db, email, password) {
  const users = db.collection("users");

  if (!email || !password) {
    throw new Error("Use: analytics-cli create-user <email> <password>.");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await users.insertOne({
    _id: email,
    passwordHash,
    createdAt: new Date(),
    role: "user",
  });
}
