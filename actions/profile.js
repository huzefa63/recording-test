'use server';

import axios from "axios";

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