-- CreateEnum
CREATE TYPE "Type" AS ENUM ('Model', 'Client');

-- CreateEnum
CREATE TYPE "Types" AS ENUM ('All', 'FashionEditorial', 'FashionCatalog', 'Commercial', 'Mature', 'Runway', 'Swimsuit', 'Lingerie', 'Fitness', 'Fit', 'Parts', 'Promotional', 'Glamour', 'Child', 'Petite', 'PlusSize', 'Freelance', 'Print', 'Other');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Ongoing', 'Done');

-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('Thumbnail', 'ProfileImages', 'Gallery', 'Misc');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "counter" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" "Type" NOT NULL DEFAULT 'Model',
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "isAuthenticated" BOOLEAN NOT NULL DEFAULT false,
    "emailVerified" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT,
    "provider_account_id" TEXT,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" TIMESTAMP(3),
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "oauth_token_secret" TEXT,
    "oauth_token" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" SERIAL NOT NULL,
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Model" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "height" TEXT,
    "bust" TEXT,
    "waist" TEXT,
    "hip" TEXT,
    "shoeSize" TEXT,
    "weight" TEXT,
    "complexion" TEXT NOT NULL,
    "DOB" TEXT NOT NULL,
    "social" JSONB,
    "state" TEXT,
    "country" TEXT,
    "address" TEXT,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "bio" TEXT NOT NULL,
    "phone" JSONB,
    "types" "Types",
    "unavailableDays" TEXT,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" JSONB NOT NULL,
    "social" JSONB NOT NULL,
    "state" TEXT,
    "country" TEXT,
    "address" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContractedModel" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "modelId" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Ongoing',
    "locations" JSONB NOT NULL,
    "startDate" TEXT,
    "startTime" TEXT,
    "hours" TEXT,
    "days" TEXT,
    "fee" TEXT,

    CONSTRAINT "ContractedModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModelHistory" (
    "id" SERIAL NOT NULL,
    "modelId" INTEGER NOT NULL,
    "job" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ModelHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientJobs" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "jobRole" TEXT NOT NULL,
    "jobDescription" TEXT NOT NULL,
    "salary" TEXT,
    "jobType" TEXT,
    "jobLength" TEXT,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ClientJobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "contentType" "ContentType" NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_provider_account_id_key" ON "Account"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "Session_session_token_key" ON "Session"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Model_userId_key" ON "Model"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Client_userId_key" ON "Client"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Media_userId_key" ON "Media"("userId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractedModel" ADD CONSTRAINT "ContractedModel_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractedModel" ADD CONSTRAINT "ContractedModel_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModelHistory" ADD CONSTRAINT "ModelHistory_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientJobs" ADD CONSTRAINT "ClientJobs_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
