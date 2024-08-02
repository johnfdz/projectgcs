/*
  Warnings:

  - The primary key for the `services` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_serviceId_fkey";

-- AlterTable
ALTER TABLE "events" ALTER COLUMN "serviceId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "services" DROP CONSTRAINT "services_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "services_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
