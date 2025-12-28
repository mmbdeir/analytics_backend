#!/usr/bin/env node
/*
node index.js <function> <arguments...>
*/

import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
import { createUser } from "./createUser.js";
import { createWebsite } from "./createWebsite.js";
import { login } from "./login.js";

dotenv.config();

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function main() {
  await client.connect();
  let db = client.db("analytics");
  const [command, ...args] = process.argv.slice(2);
  console.log("working...");
  if (command === "create-user")
    createUser(db, args[0], args[1])
      .then(() => {
        console.log("User created.");
        process.exit(0);
      })
      .catch((err) => {
        console.log(`Error: ${err.message}`);
        process.exit(1);
      });
  else if (command === "create-website")
    createWebsite(db, args[0])
      .then(() => {
        console.log("Website created.");
        process.exit(0);
      })
      .catch((err) => {
        console.log(`Error: ${err.message}`);
        process.exit(1);
      });
  // Test to see if It works if I put wrong argument count
  else if (command === "login")
    login(db, ...args)
      .then(() => {
        console.log("Login successful.");
        process.exit(0);
      })
      .catch((err) => {
        console.log(`Error: ${err.message}`);
        process.exit(1);
      });
  else {
    console.log("Type it correctly next time.");
  }
  return db;
}

main();
