'use server';

import axios from "axios";
import { cookies } from "next/headers";

export async function updateProfile(data) {
    const formData = new FormData();
    if(data.get('name')) formData.append('name',data.get('name'));
    if(data.get('image').size > 0) formData.append('image',data.get('image'));
    try{
        await axios.post(`${process.env.URL}/user/update`,formData)

    }catch(err){
        console.log(err);
    }
}

export async function updatePassword(data) {
    const cookieStore = await cookies();
    const jwt = cookieStore.get('jwt');
    // const formData = new FormData();
    // formData.append('password',data.get('password'));
    try{
        await axios.patch(`${process.env.URL}/user/updatePassword`,{password:data.get('password')},{
            headers:{
                Cookie:`jwt=${jwt.value}`
            }
        })

    }catch(err){
        console.log(err);
    }
}