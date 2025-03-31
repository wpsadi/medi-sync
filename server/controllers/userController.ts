import type { Context } from "hono";
import { prisma } from "../configs/prisma";
import { hashAadhaar } from "../utils/aadhaarHash";
import { HTTPException } from "hono/http-exception";
import { decryptKey } from "../utils/decryptKey";

export const registerUser = async (c: Context) => {
  const {
    id,
    name,
    email,
    gender,
    phone,
    dateOfBirth,
    addressDetails,
    aadhaarDetails,
    medicalInformation,
  } = c.req.valid("json");
  // console.log(data);

  //hashing aadhaar number
  const aadhaarHash = await hashAadhaar(aadhaarDetails.aadhaarNumber);

  const user = await prisma.user
    .create({
      data: {
        id,
        name,
        email,
        gender,
        phone,
        dateOfBirth: dateOfBirth,
        addressDetails: {
          create: {
            address: addressDetails.address,
            city: addressDetails.city,
            state: addressDetails.state,
            pinCode: addressDetails.pinCode,
          },
        },
        aadhaarDetails: {
          create: {
            aadhaarHash: aadhaarHash,
          },
        },
        medicalInformation: {
          create: {
            bloodGroup: medicalInformation.bloodGroup,
            allergies: medicalInformation.allergies,
            chronicConditions: medicalInformation.chronicConditions,
            currentMedications: medicalInformation.currentMedications,
          },
        },
      },
    })
    .catch((err) => {
      throw new HTTPException(500, {
        message: `Failed to register user!`,
      });
    });
  return c.json({
    success: true,
    message: "User registered successfully!",
    data: user,
  });
};


export const getUser = async (c: Context) => {
  const { userId } = c.req.valid("param");

  //finding user by id
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    }as any,
    include: {
      addressDetails: true,
      aadhaarDetails: true,
      medicalInformation: true,
      medicalRecords: true,
      qrCode: true,
      emergencyContacts: true,
    },
  });
  if (!user) {
    throw new HTTPException(404, { message: "User not found!" });
  }
  return c.json({
    success: true,
    message: "User fetched successfully!",
    data: user,
  });
};


