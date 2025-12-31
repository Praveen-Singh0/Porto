-- CreateTable
CREATE TABLE "EducationCard" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "collageImage" TEXT NOT NULL,
    "collageName" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "subjects" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EducationCard_pkey" PRIMARY KEY ("id")
);
