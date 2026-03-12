import { MongoClient, ServerApiVersion } from "mongodb";
import { createWebsiteRouter } from "./createWebsite.js";
import { createUser } from "./createUser.js";
import { login } from "./login.js";
import { this_website } from "./updateMetrics.js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();
const uri = process.env.MONGODB_URI;
const app = express();
const port = 4000;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

await client.connect();
let db = client.db("analytics");

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ type: ["application/json", "text/plain"] }));
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (mobile apps, curl, sendBeacon etc.)
      if (!origin) return callback(null, true);

      callback(null, origin); // reflect requesting origin
    },
    credentials: true,
  }),
);

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});

app.use("/createWebsite", createWebsiteRouter(db));
app.use("/createUser", createUser(db));
app.use("/login", login(db));
app.use("/this_website", this_website(db));
