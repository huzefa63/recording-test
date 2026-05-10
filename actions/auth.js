'use server';

import { signIn, signOut } from "@/auth";

export async function handleSignIn(){
    await signIn('google',{redirectTo:'/students'});
}
export async function handleLogout(){
    await signOut();
}