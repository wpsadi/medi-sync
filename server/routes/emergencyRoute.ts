import { Hono } from "hono";
import {
  contactIdSchema,
  emergencyContactSchema,
  updatedContactSchema,
} from "../helpers/emergencySchema";
import { zValidator } from "@hono/zod-validator";
import {
  addContact,
  deleteContact,
  getContacts,
  updateContact,
} from "../controllers/emergencyController";
import { userIdSchema } from "../helpers/userSchema";

export const emergencyInstance = new Hono();

emergencyInstance.post(
  "/addContact",
  zValidator("json", emergencyContactSchema),
  addContact
);

emergencyInstance.get(
  "/getContacts/:userId",
  zValidator("param", userIdSchema),
  getContacts
);

emergencyInstance.put(
  "/updateContact/:contactId",
  zValidator("param", contactIdSchema),
  zValidator("json", updatedContactSchema),
  updateContact
);

emergencyInstance.delete(
  "/deleteContact/:contactId",
  zValidator("param", contactIdSchema),
  deleteContact
);
