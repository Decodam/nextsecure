"use server"

import { signIn, signOut } from "@/auth/core";
import { redirect } from "next/navigation";


export async function LoginWithOAuthProvider(provider, redirectTo){
  try {
    if (!provider) {
      throw new Error("Provider not mentioned error!");
    }
  } catch (error) {
    return {message: error.message}
  }

  await signIn(provider, { redirectTo: redirectTo ? redirectTo : "/" })
}


export async function logout(){
  await signOut({redirect: false});
  redirect("/login")
}