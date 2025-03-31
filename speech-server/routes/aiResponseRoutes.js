import { Router } from "express";
import { textToSpeech } from "../helpers/text-to-speech.js";
import { speechToText } from "../helpers/speech-to-text.js";

const aiRouter = Router();

aiRouter.post("/text-to-speech", async (req, res) => {
  try {
    const { prompt } = req.body;
    const audio = await textToSpeech(prompt);
    console.log(audio);
    res.json({ message: "AI generation successful!", prompt, audio });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
});

aiRouter.post(
  "/speech-to-text",
  async (req, res) => {
    try {
      const audioFile =  req.file;
      console.log(audioFile);
      const { text } = await speechToText(audioFile);
      console.log(text);
      res.json({ message: "AI generation successful!", audioFile, text });
    } catch (error) {
      res.status(500).json({ message: error?.message });
    }
  }
);

export default aiRouter;
