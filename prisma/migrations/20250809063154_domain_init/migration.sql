-- CreateEnum
CREATE TYPE "public"."ProductType" AS ENUM ('PACKAGE', 'ITEM');

-- CreateEnum
CREATE TYPE "public"."BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "public"."PaymentStatus" AS ENUM ('INITIATED', 'AUTHORIZED', 'CAPTURED', 'REFUNDED', 'FAILED');

-- CreateTable
CREATE TABLE "public"."Profile" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "displayName" TEXT,
    "grade" TEXT,
    "language" TEXT,
    "currency" TEXT,
    "interests" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."InviteCode" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "creditCents" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" TIMESTAMP(3),
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "issuedByProfileId" UUID,
    "ownedByProfileId" UUID,

    CONSTRAINT "InviteCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Product" (
    "id" SERIAL NOT NULL,
    "type" "public"."ProductType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "basePriceCents" INTEGER,
    "currency" TEXT,
    "durationMinutes" INTEGER,
    "locationName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PackageItem" (
    "id" SERIAL NOT NULL,
    "packageId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PackageItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Itinerary" (
    "id" SERIAL NOT NULL,
    "profileId" UUID,
    "title" TEXT NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Itinerary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ItineraryItem" (
    "id" SERIAL NOT NULL,
    "itineraryId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "scheduledStart" TIMESTAMP(3),
    "scheduledEnd" TIMESTAMP(3),
    "dayIndex" INTEGER,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ItineraryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Booking" (
    "id" SERIAL NOT NULL,
    "profileId" UUID,
    "itineraryId" INTEGER,
    "status" "public"."BookingStatus" NOT NULL DEFAULT 'PENDING',
    "totalAmountCents" INTEGER,
    "currency" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Payment" (
    "id" SERIAL NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "amountCents" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "provider" TEXT,
    "transactionId" TEXT,
    "status" "public"."PaymentStatus" NOT NULL DEFAULT 'INITIATED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InviteCode_code_key" ON "public"."InviteCode"("code");

-- CreateIndex
CREATE INDEX "PackageItem_packageId_idx" ON "public"."PackageItem"("packageId");

-- CreateIndex
CREATE INDEX "PackageItem_itemId_idx" ON "public"."PackageItem"("itemId");

-- CreateIndex
CREATE INDEX "Itinerary_profileId_idx" ON "public"."Itinerary"("profileId");

-- CreateIndex
CREATE INDEX "ItineraryItem_itineraryId_idx" ON "public"."ItineraryItem"("itineraryId");

-- CreateIndex
CREATE INDEX "ItineraryItem_productId_idx" ON "public"."ItineraryItem"("productId");

-- CreateIndex
CREATE INDEX "ItineraryItem_itineraryId_sortOrder_idx" ON "public"."ItineraryItem"("itineraryId", "sortOrder");

-- CreateIndex
CREATE INDEX "Booking_profileId_idx" ON "public"."Booking"("profileId");

-- CreateIndex
CREATE INDEX "Booking_itineraryId_idx" ON "public"."Booking"("itineraryId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_transactionId_key" ON "public"."Payment"("transactionId");

-- CreateIndex
CREATE INDEX "Payment_bookingId_idx" ON "public"."Payment"("bookingId");

-- AddForeignKey
ALTER TABLE "public"."InviteCode" ADD CONSTRAINT "InviteCode_issuedByProfileId_fkey" FOREIGN KEY ("issuedByProfileId") REFERENCES "public"."Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InviteCode" ADD CONSTRAINT "InviteCode_ownedByProfileId_fkey" FOREIGN KEY ("ownedByProfileId") REFERENCES "public"."Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PackageItem" ADD CONSTRAINT "PackageItem_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PackageItem" ADD CONSTRAINT "PackageItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Itinerary" ADD CONSTRAINT "Itinerary_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ItineraryItem" ADD CONSTRAINT "ItineraryItem_itineraryId_fkey" FOREIGN KEY ("itineraryId") REFERENCES "public"."Itinerary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ItineraryItem" ADD CONSTRAINT "ItineraryItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_itineraryId_fkey" FOREIGN KEY ("itineraryId") REFERENCES "public"."Itinerary"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "public"."Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
