import { auth } from "@/auth/core";
import { redirect } from "next/navigation";
import { cache } from "react";


const getServerSession = cache(auth);
export default getServerSession;



// SignedIn component
export async function SignedIn({ children }) {
  const session = await getServerSession();

  if (!session?.user) return null;

  const user = session.user;

  return <>{children(user)}</>;
}


// SignedOut component
export async function SignedOut({ children }) {
  const session = await getServerSession();

  if (session?.user) return null;

  return <>{children}</>;
}

export async function protectRoute(next = '/') {
  const session = await getServerSession();

  if (!session?.user) {
    redirect(`/login?next=${encodeURIComponent(next)}`);
  }

  return session;
}

export async function redirectOnAuth(redirectTo = '/') {
  const session = await getServerSession();

  if (session?.user) {
    redirect(redirectTo);
  }
}