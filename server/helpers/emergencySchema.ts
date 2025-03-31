import { z } from "zod";

export const emergencyContactSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  name: z.string().min(1, "Name is required"),
  relationship: z.string().optional(),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters long")
    .max(15, "Phone number must be at most 15 characters long"),
  email: z.string().email("Invalid email format").optional(),
  isNotificationEnabled: z.boolean().default(false),
});

export const contactIdSchema = z.object({
  contactId: z.string().min(1, "User ID is required"),
});

export const updatedContactSchema = z.object({
  updatedName: z.string().min(1, "Updated name is required"),
  updatedphone: z
    .string()
    .min(10, "Updated phone number must be at least 10 characters long")
    .max(15, "Updated phone number must be at most 15 characters long"),
  updatedemail: z.string().email("Invalid updated email format").optional(),
});
