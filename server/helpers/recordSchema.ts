import { z } from "zod";

export const medicalRecordSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  fileName: z
    .string()
    .min(1, "File name is required")
    .transform((name) => (name.endsWith(".pdf") ? name : `${name}.pdf`)), //added .pdf at end
  file: z
    .instanceof(File)
    .refine(
      (file) =>
        file.type === "application/pdf" || file.type.startsWith("image/"),
      {
        message: "File must be a PDF or an image",
      }
    ),
  testType: z.string().optional(),
  hospitalName: z.string().optional(),
  visitDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  description: z.string().optional(),
  isConfidential: z.string().transform((value) => value === "true"),
});

export const recordIdSchema = z.object({
  recordId: z.string().min(1, "Record ID is required"),
});

export const updatedRecordSchema = z.object({
  updatedName: z.string().min(1, "Updated name is required"),
});
