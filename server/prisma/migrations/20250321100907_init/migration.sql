/*
  Warnings:

  - You are about to drop the column `diagnosis` on the `MedicalRecord` table. All the data in the column will be lost.
  - You are about to drop the column `doctorName` on the `MedicalRecord` table. All the data in the column will be lost.
  - You are about to drop the column `fileUrls` on the `MedicalRecord` table. All the data in the column will be lost.
  - You are about to drop the column `medication` on the `MedicalRecord` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `MedicalRecord` table. All the data in the column will be lost.
  - You are about to drop the column `treatment` on the `MedicalRecord` table. All the data in the column will be lost.
  - You are about to drop the column `allergies` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `bloodGroup` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `chronicConditions` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `currentMedications` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - Added the required column `testType` to the `MedicalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- AlterTable
ALTER TABLE "MedicalRecord" DROP COLUMN "diagnosis",
DROP COLUMN "doctorName",
DROP COLUMN "fileUrls",
DROP COLUMN "medication",
DROP COLUMN "notes",
DROP COLUMN "treatment",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "fileUrl" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "isConfidential" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "testType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "allergies",
DROP COLUMN "bloodGroup",
DROP COLUMN "chronicConditions",
DROP COLUMN "currentMedications",
DROP COLUMN "password",
ADD COLUMN     "gender" "Gender" NOT NULL;

-- CreateTable
CREATE TABLE "MedicalInformation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bloodGroup" "BloodGroup" NOT NULL,
    "allergies" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "chronicConditions" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "currentMedications" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "MedicalInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AadhaarDetails" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "aadhaarHash" TEXT NOT NULL,

    CONSTRAINT "AadhaarDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AddressDetails" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pinCode" TEXT NOT NULL,

    CONSTRAINT "AddressDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MedicalInformation_userId_key" ON "MedicalInformation"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AadhaarDetails_userId_key" ON "AadhaarDetails"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AddressDetails_userId_key" ON "AddressDetails"("userId");

-- AddForeignKey
ALTER TABLE "MedicalInformation" ADD CONSTRAINT "MedicalInformation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AadhaarDetails" ADD CONSTRAINT "AadhaarDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddressDetails" ADD CONSTRAINT "AddressDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
