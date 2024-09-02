import { auth } from "@/auth/core";
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
