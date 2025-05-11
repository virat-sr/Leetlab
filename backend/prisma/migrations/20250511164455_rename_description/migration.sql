/*
  Warnings:

  - You are about to drop the column `dessciption` on the `Playlist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Playlist" DROP COLUMN "dessciption",
ADD COLUMN     "desciption" TEXT;
