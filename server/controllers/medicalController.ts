import type { Context } from "hono";
import cloudinary from "../configs/cloudinary";
import { uploadMedicalRecord } from "../utils/recordUpload";
import { prisma } from "../configs/prisma";
import { HTTPException } from "hono/http-exception";

export const uploadRecord = async (c: Context) => {
  const {
    userId,
    fileName,
    file,
    testType,
    hospitalName,
    visitDate,
    description,
    isConfidential,
  } = c.req.valid("form");

  //uploading file to cloudinary
  const { fileUrl, fileType } = await uploadMedicalRecord(
    userId,
    fileName,
    file
  );
  // console.log(fileUrl, fileType);

  const record = await prisma.medicalRecord
    .create({
      data: {
        fileName,
        fileType,
        testType,
        hospitalName,
        visitDate,
        fileUrl,
        description,
        isConfidential,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })
    .catch((err) => {
      console.log(err);
      throw new HTTPException(500, {
        message: "Failed to upload record!",
      });
    });

  return c.json({
    success: true,
    message: "Record uploaded successfully!",
    data: record,
  });
};

export const getRecords = async (c: Context) => {
  const { userId } = c.req.valid("param");
  const records = await prisma.medicalRecord.findMany({
    where: {
      userId,
    },
  });
  return c.json({
    success: true,
    message: "All records fetched successfully!",
    data: records,
  });
};

export const renameRecord = async (c: Context) => {
  const { recordId } = c.req.valid("param");
  const { updatedName } = c.req.valid("json");

  console.log(recordId, updatedName);

  const record = await prisma.medicalRecord
    .update({
      where: {
        id: recordId,
      },
      data: {
        fileName: updatedName,
      },
    })
    .catch((err) => {
      throw new HTTPException(500, {
        message: "Failed to rename record!",
      });
    });

  return c.json({
    success: true,
    message: "Record renamed successfully!",
    data: record,
  });
};

export const deleteRecord = async (c: Context) => {
  const { recordId } = c.req.valid("param");

  const record = await prisma.medicalRecord
    .delete({
      where: {
        id: recordId,
      },
    })
    .catch((err) => {
      throw new HTTPException(500, {
        message: "Failed to delete record!",
      });
    });

  return c.json({
    success: true,
    message: "Record deleted successfully!",
    data: record,
  });
};
