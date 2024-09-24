-- AlterTable
ALTER TABLE "Vaga" ADD COLUMN "validName" TEXT;

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "senha" TEXT
);
