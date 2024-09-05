# MongoDB Schema

To align the MongoDB Prisma schema with the PostgreSQL schema and incorporate the additional fields from the PostgreSQL version, you'll need to add equivalent fields and relationships. To get started add your database URL to the `.env` file and then run `npx prisma migrate dev` or else `npx prisma studio` to visualise the database.

```bash
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id            String          @id @default(auto()) @map("_id") @db.ObjectId
  name          String?
  email         String?         @unique
  emailVerified DateTime?
  image         String?
  isActive      Boolean         @default(false)
  role          String          @default("user")
  credential    Credential?
  accounts      Account[]
  sessions      Session[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([email])
}

model Account {
  id                String  @id @default(auto()) @map("_id") @db.ObjectId
  userId            String  @db.ObjectId
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.String
  access_token      String? @db.String
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.String
  session_state     String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@index([userId, provider])
}

model Session {
  id           String   @id @default(auto()) @map("_id") @db.ObjectId
  sessionToken String   @unique
  userId       String   @db.ObjectId
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model VerificationToken {
  id         String   @id @default(auto()) @map("_id") @db.ObjectId
  identifier String
  token      String
  expires    DateTime

  createdAt  DateTime @default(now())

  @@unique([identifier, token])
  @@index([identifier])
}

model Preregistration {
  id            String          @id @default(auto()) @map("_id") @db.ObjectId
  fullName      String
  email         String          @unique
  passwordHash  String
  createdAt     DateTime        @default(now())
  expiresAt     DateTime?       // Optional: Set an expiration time for preregistration entries

  @@index([email])
}

model Credential {
  id            String          @id @default(auto()) @map("_id") @db.ObjectId
  userId        String          @db.ObjectId
  passwordHash  String

  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt

  user          User            @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

```