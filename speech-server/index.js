import express from "express";
import aiRouter from "./routes/aiResponseRoutes.js";
import dotenv from "dotenv";
const app = express();
import multer from "multer";

const upload = await multer({ dest: "uploads/" });
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/generate", upload.single("audioFile"), aiRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
