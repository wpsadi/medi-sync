import { z } from "zod";

export const userDetailsSchema = z.object({
  id: z.string().min(1, "User ID is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  gender: z.enum(["MALE", "FEMALE", "OTHER"], {
    message: "Gender is required",
  }),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters long")
    .max(15, "Phone number must be at most 15 characters long"),
  dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  addressDetails: z
    .object({
      address: z.string().min(1, "Address is required"),
      city: z.string().min(1, "City is required"),
      state: z.string().min(1, "State is required"),
      pinCode: z
        .string()
        .length(6, "Pin code must be exactly 6 characters long"),
    })
    .optional(),
  aadhaarDetails: z
    .object({
      aadhaarNumber: z
        .string()
        .length(12, "Aadhaar number must be exactly 12 characters long"),
    })
    .optional(),
  medicalInformation: z
    .object({
      bloodGroup: z.enum(
        [
          "A_POS",
          "A_NEG",
          "B_POS",
          "B_NEG",
          "AB_POS",
          "AB_NEG",
          "O_POS",
          "O_NEG",
        ],
        { message: "Blood group is required" }
      ),
      allergies: z.array(z.string()).optional(),
      chronicConditions: z.array(z.string()).optional(),
      currentMedications: z.array(z.string()).optional(),
    })
    .optional(),
});

export const userIdSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
});

export const userKeySchema = z.object({
  userKey: z.string().min(1, "User Key is required"),
});
