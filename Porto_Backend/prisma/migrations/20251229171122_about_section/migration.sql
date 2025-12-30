/*
  Warnings:

  - You are about to drop the column `profileImageUrl` on the `HeroSection` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "HeroSection" DROP COLUMN "profileImageUrl";

-- CreateTable
CREATE TABLE "AboutSection" (
    "id" SERIAL NOT NULL,
    "bio" TEXT NOT NULL,
    "ImageUrl" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "documents" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutSection_pkey" PRIMARY KEY ("id")
);
