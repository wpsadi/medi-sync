
import { ElevenLabsClient, play } from "elevenlabs";
import dotenv from "dotenv";
dotenv.config();

// console.log(process.env.ELEVENLABS_API_KEY); 
export const client = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});
