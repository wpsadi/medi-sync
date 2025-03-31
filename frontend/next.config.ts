/** @type {import('next').NextConfig} */
import { NextConfig } from "next"; // Import the NextConfig type

// Define the RemotePattern type
interface RemotePattern {
  protocol: "http" | "https"; // Restrict to valid protocols
  hostname: string;
}


// Define the configuration
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "img.daisyui.com" },
      { protocol: "https", hostname: "ui-avatars.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "www.gravatar.com" },
      {
        protocol: "https",
        hostname:"images.pexels.com"
      },
      { protocol: "https", hostname: "flowbite.s3.amazonaws.com" },
      { protocol: "https", hostname: "googleusercontent.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "img.freepik.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
      { protocol: "https", hostname: "cloud.appwrite.io" },
      {
        protocol: "https",
        hostname: "tailwindui.com"
      }
    ] as RemotePattern[], // Use the RemotePattern type
  },
  experimental: {
    serverActions: {  
      bodySizeLimit: '200mb',
    },
  },
};

export default nextConfig;