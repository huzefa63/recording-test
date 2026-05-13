'use server';

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function changeDiary(data){
    const session = await auth();
    try{
        await fetch(`${process.env.URL}/student/changeDiary?studentId=${data.get('studentId')}&teacherId=${data.get('teacherId')}`,{
        method:'PATCH',
        headers:{
            authorization:`Bearer ${session.jwt}`,
        }
    });
    revalidatePath('/students');
    }catch(err){
        console.log(err);
    }
}