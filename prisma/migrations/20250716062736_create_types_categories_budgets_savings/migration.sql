/*
  Warnings:

  - You are about to drop the column `category` on the `TrackerData` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `TrackerData` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `TrackerData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_name` to the `TrackerData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `TrackerData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_name` to the `TrackerData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TrackerData" DROP COLUMN "category",
DROP COLUMN "type",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "category_name" TEXT NOT NULL,
ADD COLUMN     "typeId" INTEGER NOT NULL,
ADD COLUMN     "type_name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Budgets" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nominal" INTEGER NOT NULL,
    "spent" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    "type_name" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "category_name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Budgets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Savings" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nominal" INTEGER NOT NULL,
    "saved" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    "type_name" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "category_name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Savings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Budgets" ADD CONSTRAINT "Budgets_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Budgets" ADD CONSTRAINT "Budgets_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Budgets" ADD CONSTRAINT "Budgets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Savings" ADD CONSTRAINT "Savings_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Savings" ADD CONSTRAINT "Savings_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Savings" ADD CONSTRAINT "Savings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackerData" ADD CONSTRAINT "TrackerData_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackerData" ADD CONSTRAINT "TrackerData_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
