-- CreateTable
CREATE TABLE "refreshToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "refreshToken_pkey" PRIMARY KEY ("id")
);
