/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `QRCode` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "QRCode_userId_key" ON "QRCode"("userId");
