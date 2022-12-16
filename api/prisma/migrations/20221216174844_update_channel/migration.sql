-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "description" TEXT NOT NULL DEFAULT 'null',
ALTER COLUMN "teamId" DROP NOT NULL;
