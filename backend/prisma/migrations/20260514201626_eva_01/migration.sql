-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'AUXILIAR', 'PARENT');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PRESENT', 'LATE', 'ABSENT');

-- CreateEnum
CREATE TYPE "Method" AS ENUM ('QR', 'NAME');

-- CreateEnum
CREATE TYPE "Severity" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "IncidentType" AS ENUM ('DISCIPLINE', 'LATE', 'UNIFORM', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "idUser" SERIAL NOT NULL,
    "firstname" VARCHAR(50) NOT NULL,
    "lastname" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("idUser")
);

-- CreateTable
CREATE TABLE "Grade" (
    "idGrade" SERIAL NOT NULL,
    "level" INTEGER NOT NULL,

    CONSTRAINT "Grade_pkey" PRIMARY KEY ("idGrade")
);

-- CreateTable
CREATE TABLE "Section" (
    "idSection" SERIAL NOT NULL,
    "name" VARCHAR(10) NOT NULL,
    "idGrade" INTEGER NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("idSection")
);

-- CreateTable
CREATE TABLE "Student" (
    "idStudent" SERIAL NOT NULL,
    "firstname" VARCHAR(50) NOT NULL,
    "lastname" VARCHAR(50) NOT NULL,
    "code" UUID NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "idSection" INTEGER NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("idStudent")
);

-- CreateTable
CREATE TABLE "Parent" (
    "idParent" SERIAL NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "idUser" INTEGER NOT NULL,

    CONSTRAINT "Parent_pkey" PRIMARY KEY ("idParent")
);

-- CreateTable
CREATE TABLE "ParentStudentDetail" (
    "idStudent" INTEGER NOT NULL,
    "idParent" INTEGER NOT NULL,

    CONSTRAINT "ParentStudentDetail_pkey" PRIMARY KEY ("idParent","idStudent")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "idAttendance" SERIAL NOT NULL,
    "status" "Status" NOT NULL,
    "method" "Method" NOT NULL,
    "idCreatedBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" DATE NOT NULL,
    "idStudent" INTEGER NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("idAttendance")
);

-- CreateTable
CREATE TABLE "Incident" (
    "idIncident" SERIAL NOT NULL,
    "type" "IncidentType" NOT NULL,
    "points" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "severity" "Severity" NOT NULL,
    "idCreatedBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idStudent" INTEGER NOT NULL,

    CONSTRAINT "Incident_pkey" PRIMARY KEY ("idIncident")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Grade_level_key" ON "Grade"("level");

-- CreateIndex
CREATE UNIQUE INDEX "Student_code_key" ON "Student"("code");

-- CreateIndex
CREATE INDEX "Student_idSection_idx" ON "Student"("idSection");

-- CreateIndex
CREATE UNIQUE INDEX "Parent_phone_key" ON "Parent"("phone");

-- CreateIndex
CREATE INDEX "Attendance_date_idx" ON "Attendance"("date");

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_idStudent_date_key" ON "Attendance"("idStudent", "date");

-- CreateIndex
CREATE INDEX "Incident_createdAt_idx" ON "Incident"("createdAt");

-- CreateIndex
CREATE INDEX "Incident_idStudent_createdAt_idx" ON "Incident"("idStudent", "createdAt");

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_idGrade_fkey" FOREIGN KEY ("idGrade") REFERENCES "Grade"("idGrade") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_idSection_fkey" FOREIGN KEY ("idSection") REFERENCES "Section"("idSection") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parent" ADD CONSTRAINT "Parent_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParentStudentDetail" ADD CONSTRAINT "ParentStudentDetail_idStudent_fkey" FOREIGN KEY ("idStudent") REFERENCES "Student"("idStudent") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParentStudentDetail" ADD CONSTRAINT "ParentStudentDetail_idParent_fkey" FOREIGN KEY ("idParent") REFERENCES "Parent"("idParent") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_idCreatedBy_fkey" FOREIGN KEY ("idCreatedBy") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_idStudent_fkey" FOREIGN KEY ("idStudent") REFERENCES "Student"("idStudent") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_idCreatedBy_fkey" FOREIGN KEY ("idCreatedBy") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_idStudent_fkey" FOREIGN KEY ("idStudent") REFERENCES "Student"("idStudent") ON DELETE RESTRICT ON UPDATE CASCADE;
