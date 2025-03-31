import type { Context } from "hono";
import { prisma } from "../configs/prisma";
import { Prisma } from "@prisma/client";
import { HTTPException } from "hono/http-exception";

export const addContact = async (c: Context) => {
  const { userId, name, phone, email, relationship, isNotificationEnabled } =
    c.req.valid("json");

  const contact = await prisma.emergencyContact
    .create({
      data: {
        name,
        phone,
        email,
        relationship,
        isNotificationEnabled,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })
    .catch((err) => {
      throw new HTTPException(500, {
        message: "Failed to add emergency contact!",
      });
    });

  return c.json({
    success: true,
    message: "Emergency contact added successfully!",
    data: contact,
  });
};

export const getContacts = async (c: Context) => {
  const { userId } = c.req.valid("param");

  const contacts = await prisma.emergencyContact.findMany({
    where: {
      userId,
    },
  });

  return c.json({
    success: true,
    message: "All contacts fetched successfully!",
    data: contacts,
  });
};

export const updateContact = async (c: Context) => {
  const { contactId } = c.req.valid("param");
  const { updatedName, updatedphone, updatedemail } = c.req.valid("json");

  const contact = await prisma.emergencyContact
    .update({
      where: {
        id: contactId,
      },
      data: {
        name: updatedName,
        phone: updatedphone,
        email: updatedemail,
      },
    })
    .catch((err) => {
      throw new HTTPException(500, {
        message: "Failed to update emergency contact!",
      });
    });

  return c.json({
    success: true,
    message: "Emergency contact updated successfully!",
    data: contact,
  });
};

export const deleteContact = async (c: Context) => {
  const { contactId } = c.req.valid("param");
  const contact = await prisma.emergencyContact
    .delete({
      where: {
        id: contactId,
      },
    })
    .catch((err) => {
      throw new HTTPException(500, {
        message: "Failed to delete emergency contact!",
      });
    });
  return c.json({
    success: true,
    message: "Emergency contact deleted successfully!",
    data: contact,
  });
};
