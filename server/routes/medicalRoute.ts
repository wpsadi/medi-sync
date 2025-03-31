import { Hono } from "hono";
import {
  deleteRecord,
  getRecords,
  renameRecord,
  uploadRecord,
} from "../controllers/medicalController";
import { zValidator } from "@hono/zod-validator";
import {
  medicalRecordSchema,
  recordIdSchema,
  updatedRecordSchema,
} from "../helpers/recordSchema";
import { userIdSchema } from "../helpers/userSchema";

export const medicalInstance = new Hono();

medicalInstance.post(
  "/uploadRecord",
  zValidator("form", medicalRecordSchema),
  uploadRecord
);

medicalInstance.get(
  "/getRecord/:userId",
  zValidator("param", userIdSchema),
  getRecords
);
medicalInstance.put(
  "/renameRecord/:recordId",
  zValidator("param", recordIdSchema),
  zValidator("json", updatedRecordSchema),
  renameRecord
);
medicalInstance.delete(
  "/deleteRecord/:recordId",
  zValidator("param", recordIdSchema),
  deleteRecord
);
