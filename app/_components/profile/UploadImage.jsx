'use client';

import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "../providers/UserProvider";

function UploadImage() {
    const {user} = useUser();
    const [image,setImage] = useState(null);
    const queryClient = useQueryClient();
    function handleImageChange(e){
        // console.log(e.target.files[0])
        const isConfirm = confirm('are you sure');
        if(!isConfirm) return setImage(null);
        const url = URL.createObjectURL(e.target.files[0]);
        setImage(url);
        const formData = new FormData();
        formData.append('image',e.target.files[0]);
        toast.promise(async function(){
          try{
            await axios.post(`${process.env.NEXT_PUBLIC_URL}/user/image`,formData,{withCredentials:true})
            queryClient.invalidateQueries({queryKey:['user']});
          }catch(err){
            setImage(null);
            throw new Error();
          }
        },{loading:'updating image',success:'image updated',error:"failed to update image"});
        // try{

        // }catch(err){

        // }
    }
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-28 h-28 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
          {image && <Image src={image} fill alt="profile image" className="text-[#8a6a3d] text-sm font-medium"/>}
          {(user?.profileImage && !image) && <Image  src={user.profileImage} fill alt="profile image" className="text-[#8a6a3d] text-sm font-medium"/>}
        </div>

        <label className="px-5 py-2.5 bg-[#5c4320] text-white rounded-xl cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition font-medium shadow-md">
          Upload Image
          <input name="image" onChange={handleImageChange} type="file" className="hidden" />
        </label>
      </div>
    );
}

export default UploadImage