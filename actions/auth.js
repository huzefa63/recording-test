'use server';

import { signIn, signOut } from "@/auth";
import { cookies } from "next/headers";

export async function handleSignIn(data){
    const cookieStore = await cookies();
    const role = data.get("role");
    cookieStore.set('role',role);
    await signIn('google',{redirectTo:role === 'student'?'/gurfah':'/students'});
}
export async function handleLogout(){
    // const cookieStore = await cookies();
    // cookieStore.delete('jwt',{
    //     sameSite:'none',
    //     httpOnly:true,
    //     secure:true,
    // });
    await signOut({redirectTo:'/auth'});
}