-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "no_order" VARCHAR(4) NOT NULL,
    "total_price" INTEGER NOT NULL,
    "paid_amount" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
