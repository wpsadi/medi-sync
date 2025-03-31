/*
  Warnings:

  - Added the required column `qrCodeUrl` to the `QRCode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QRCode" ADD COLUMN     "qrCodeUrl" TEXT NOT NULL;
