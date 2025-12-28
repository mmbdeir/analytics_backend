import bcrypt from "bcrypt";

export async function login(db, email, password) {
  const users = db.collection("users");
  try {
    const document = await users.findOne({
      _id: email,
    });
    const passwordHash = document.passwordHash;
    const compare = await bcrypt.compare(password, passwordHash);
    console.log(compare);
  } catch (e) {
    // If passwordHash doesnt exist its because it cant find the email in the document, so make a catch statement to catch specifically that.
    console.log(e);
    if (e instanceof TypeError) {
      console.log("Couldnt find email.");
    }
  }
}
