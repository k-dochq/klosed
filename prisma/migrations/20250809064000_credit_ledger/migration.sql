-- CreateTable
CREATE TABLE "public"."CreditLedger" (
    "id" SERIAL NOT NULL,
    "profileId" UUID,
    "inviteCodeId" INTEGER,
    "bookingId" INTEGER,
    "amountCents" INTEGER NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CreditLedger_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CreditLedger_profileId_idx" ON "public"."CreditLedger"("profileId");

-- CreateIndex
CREATE INDEX "CreditLedger_inviteCodeId_idx" ON "public"."CreditLedger"("inviteCodeId");

-- CreateIndex
CREATE INDEX "CreditLedger_bookingId_idx" ON "public"."CreditLedger"("bookingId");

-- AddForeignKey
ALTER TABLE "public"."CreditLedger" ADD CONSTRAINT "CreditLedger_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CreditLedger" ADD CONSTRAINT "CreditLedger_inviteCodeId_fkey" FOREIGN KEY ("inviteCodeId") REFERENCES "public"."InviteCode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CreditLedger" ADD CONSTRAINT "CreditLedger_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "public"."Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;
