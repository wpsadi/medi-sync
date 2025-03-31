import crypto from "crypto";

export const hashAadhaar = async (aadhaarNumber: string): Promise<string> => {
  const hash = crypto.createHash("sha256");
  hash.update(aadhaarNumber);
  return hash.digest("hex");
};
