"use server"

import { signIn, signOut } from "@/auth/core";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/auth/utils";
import getServerSession from "@/auth/session";



export async function LoginWithOAuthProvider(provider, redirectTo){
  try {
    if (!provider) {
      throw new Error("Provider not mentioned error!");
    }
  } catch (error) {
    return {success: false, message: error.message}
  }

  await signIn(provider, { redirectTo: redirectTo ? redirectTo : "/" });
}


export async function loginWithEmailPassword(email, password) {
  try {
    const session = await getServerSession();

    if (session?.user) {
      throw new Error("User already logged in! Please logout to login with another account");
    }


    if (!email || !password) {
      throw new Error("Please provide your registered email address and password");
    }

    await signIn("credentials", {
      email, password,
      redirect: false,
    });

  } catch (error) {
    if (error instanceof Error) {
      const type = error.type;
      const cause = error.cause;

      switch (type) {
        case "CredentialsSignin":
          return {message: "Invalid login credentials."};
        case "CallbackRouteError":
          return {message: cause && cause.err ? cause.err.toString() : "Callback route error."};
        default:
          return {message: error.message || "Something went wrong. Please try again"};
      }
    }
  }

  redirect("/")
}




export async function logout(redirectTo){
  await signOut({redirect: false});
  redirect(redirectTo ? redirectTo : "/login")
}

export async function createRecoveryLink(email) {
  try {
    const session = await getServerSession();

    if (session?.user) {
      throw new Error("User already logged in! Please logout to create a recovery link");
    }

    if (!email) {
      throw new Error("Please provide your registered email address");
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("User not found with given email adress not found!");
    }

    const existingToken = await prisma.verificationToken.findFirst({
      where: {
        identifier: email,
      },
    });

    if (existingToken) {
      throw new Error("A recovery link has already been sent to this email address. Please check your email.");
    }

    await signIn("nodemailer", {
      email,
      redirect: false,
      callbackUrl: "/",
    });


  } catch (error) {
    if (error instanceof Error) {
      const type = error.type;
      const cause = error.cause;

      switch (type) {
        case "CredentialsSignin":
          return {message: "Invalid credentials."};
        case "CallbackRouteError":
          return {message: cause && cause.err ? cause.err.toString() : "Callback route error."};
        default:
          return {message: error.message || "Something went wrong. Please try again"};
      }
    }
  }

  redirect("/")
}


export async function createNewAccountLink(email, fullname, password) {
  try {
    const session = await getServerSession();

    if (session?.user) {
      throw new Error("User already logged in! Please logout to create a new account");
    }

    if (!email || !fullname || !password) {
      throw new Error("Please provide your email address, full name and password.");
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      throw new Error("User with given email already exists! Try loging in with credentials.");
    }

    const existingPreregistration = await prisma.preregistration.findUnique({
      where: {
        email: email,
      },
    });

    if (existingPreregistration) {
      throw new Error("A preregistration entry already exists with this email! Please check your email for the verification link.");
    }

    // Hash the password
    const phash = await hashPassword(password);

    // Create a new preregistration entry
    await prisma.preregistration.create({
      data: {
        fullName: fullname,
        email: email,
        passwordHash: phash,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });



    await signIn("nodemailer", {
      email,
      redirect: false,
      callbackUrl: "/",
    });

    
  } catch (error) {
    if (error instanceof Error) {
      const type = error.type;
      const cause = error.cause;

      switch (type) {
        case "CredentialsSignin":
          return {message: "Invalid credentials."};
        case "CallbackRouteError":
          return {message: cause && cause.err ? cause.err.toString() : "Callback route error."};
        default:
          return {message: error.message || "Something went wrong. Please try again"};
      }
    }
  }

  redirect("/")
}


export async function deleteProfile(){
  try {
    const session = await getServerSession();

    if (!session?.user) {
      throw new Error("Please login with your verified account to continue");
    }


    const userId = session?.user.id

    await prisma.user.delete({
      where: { id: userId },
    });

  } catch (error) {
    return {message: error.message || "Something went wrong. Please try again"};
  }

  await signOut({redirect: false});
  redirect("/signup")
}


export async function deleteProvider(provider) {
  try {
    // Get the current session
    const session = await getServerSession();

    if (!session?.user) {
      throw new Error("Not authenticated. Please login with your verified account to continue.");
    }

    const userEmail = session.user.email;

    if (!provider) {
      throw new Error("Provider is required.");
    }

    // Ensure at least one other provider is present
    const remainingProviders = await prisma.account.findMany({
      where: {
        user: { email: userEmail },
        provider: { not: provider },
      },
    });

    if (remainingProviders.length === 0) {
      throw new Error("Cannot delete the only provider account.");
    }

    // Delete the account for the given provider and authenticated user
    const deletedAccount = await prisma.account.deleteMany({
      where: {
        provider,
        user: { email: userEmail },
      },
    });

    if (deletedAccount.count === 0) {
      throw new Error("Account not found or already deleted.");
    }

    return { message: "Account deleted successfully" };
  } catch (error) {
    console.error("Error deleting account:", error);
    return { message: error.message || "Internal server error" };
  }
}