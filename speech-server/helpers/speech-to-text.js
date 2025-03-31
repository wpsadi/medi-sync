import { play } from "elevenlabs";
import { client } from "../configs/elevenlabs.js";
import fs from "fs";

export const speechToText = async (audioFile) => {
  try {
    // const response = await fetch(
    //   "https://storage.googleapis.com/eleven-public-cdn/audio/marketing/nicole.mp3"
    // );
    // const audioBlob = new Blob([await audioFile.arrayBuffer()], {
    //   type: "audio/mp3",
    // });

    const audioFileStream = fs.createReadStream(audioFile.path);

    // console.log(audioFileStream);

    const transcription = await client.speechToText.convert({
      file: audioFileStream,
      model_id: "scribe_v1",
    });
    return transcription;
  } catch (error) {
    console.log(error); 
    throw new Error("Failed to convert speech to text!");
  }
};
