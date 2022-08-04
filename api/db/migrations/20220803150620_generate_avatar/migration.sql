-- CreateTable
CREATE TABLE "Avatar" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "avatarStyle" TEXT NOT NULL,
    "topType" TEXT NOT NULL,
    "accessoriesType" TEXT NOT NULL,
    "hatColor" TEXT NOT NULL,
    "hairColor" TEXT NOT NULL,
    "facialHairType" TEXT NOT NULL,
    "facialHairColor" TEXT NOT NULL,
    "clotheType" TEXT NOT NULL,
    "clotheColor" TEXT NOT NULL,
    "graphicType" TEXT NOT NULL,
    "eyeType" TEXT NOT NULL,
    "eyebrowType" TEXT NOT NULL,
    "mouthType" TEXT NOT NULL,
    "skinColor" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Avatar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Avatar_userId_key" ON "Avatar"("userId");

-- AddForeignKey
ALTER TABLE "Avatar" ADD CONSTRAINT "Avatar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
