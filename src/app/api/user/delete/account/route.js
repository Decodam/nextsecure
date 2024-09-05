import { auth } from "@/auth/core";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export const DELETE = auth(async function DELETE(req) {
  if (!req.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const userId = req.auth.user.id;

    // Delete the user and cascade delete related records (e.g., accounts)
    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({ message: "Account deleted successfully" }, {
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
});
