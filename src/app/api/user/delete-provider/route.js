import { auth } from "@/auth/core";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const DELETE = auth(async function DELETE(req) {
  if (!req.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    // Parse the request body to get the provider
    const { provider } = await req.json();

    if (!provider) {
      return NextResponse.json({ message: "Provider is required" }, { status: 400 });
    }

    const userEmail = req.auth.user.email;

    // Ensure at least one other provider is present
    const remainingProviders = await prisma.account.findMany({
      where: {
        user: { email: userEmail },
        provider: { not: provider },
      },
    });

    if (remainingProviders.length === 0) {
      return NextResponse.json({ message: "Cannot delete the only provider account" }, { status: 400 });
    }

    // Delete the account for the given provider and authenticated user
    const deletedAccount = await prisma.account.deleteMany({
      where: {
        provider,
        user: { email: userEmail },
      },
    });

    if (deletedAccount.count === 0) {
      return NextResponse.json({ message: "Account not found or already deleted" }, { status: 404 });
    }

    return NextResponse.json({ message: "Account deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting account:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
});