import { play } from "elevenlabs";
import { client } from "../configs/elevenlabs.js";

export const textToSpeech = async (prompt) => {
  try {
    const audio = await client.textToSpeech.convert("JBFqnCBsd6RMkjVDRZzb", {
      text: prompt,
      model_id: "eleven_multilingual_v2",
      output_format: "mp3_44100_128",
    });

    await play(audio);
    return audio;
  } catch (error) {
    console.log(error.message);
    throw new Error("Failed to convert text to speech!");
  }
};
