"use server";

import { redirect } from "next/navigation";

export async function signIn() {
  console.log("Fake login action");
}

export async function signUp() {
  console.log("Fake signup action");
}

export async function handleResetPassword() {
  redirect("/login?message=Check email to reset password");
}