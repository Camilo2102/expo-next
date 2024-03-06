-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('ALTA', 'NORMAL', 'BAJA');

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "dueDate" TIMESTAMP(3),
    "priority" "Priority" NOT NULL DEFAULT 'NORMAL',

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
