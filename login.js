import bcrypt from "bcrypt";

export async function login(db, email, password) {
  const users = db.collection("users");
  try {
    const userDocument = await users.findOne({
      _id: email,
    });
    if (!userDocument) {
      console.log("Couldn't find email.");
      return false;
    }
    const compare = await bcrypt.compare(password, userDocument.passwordHash);
    if (!compare) {
      console.log("Make sure the email and password are correct.");
      return false;
    }
    //Login logic
    // console.log("Login successful");
  } catch (e) {
    console.log("Login failed due to error:", e);
    return false;
  }
}
