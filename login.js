import bcrypt from "bcrypt";

export async function login(db, email, password) {
  const users = db.collection("users");
  if (!email || !password) {
    throw new Error("Use: analytics-cli create-user <email> <password>");
  }

  const userDocument = await users.findOne({ _id: email });

  if (!userDocument) {
    throw new Error("Couldn't find email.");
  }

  const match = await bcrypt.compare(password, userDocument.passwordHash);

  if (!match) {
    throw new Error("Make sure the email and password are correct.");
  }

  //Login logic
  // console.log("Login successful");
}
