const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const crypto = require("crypto");
const Category = require("./models/Category");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/restaurant");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const generateVerificationCode = () => {
  return crypto.randomInt(100000, 999999).toString();
};

app.post("/api/send-verification-code", async (req, res) => {
  const { email, toName, fromName } = req.body;

  try {
    const code = generateVerificationCode();
    res.status(200).json({ message: "Verification code sent successfully!", code });
  } catch (error) {
    console.error("Failed to send verification code:", error);
    res.status(500).json({ message: "Failed to send verification code." });
  }
});

app.post("/api/verify-code", (req, res) => {
  const { userCode, serverCode } = req.body;

  if (userCode === serverCode) {
    res.status(200).json({ message: "Verification successful!" });
  } else {
    res.status(400).json({ message: "Incorrect verification code." });
  }
});

app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "خطأ في الخادم" });
  }
});

server.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});