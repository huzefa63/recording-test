'use client';

import Image from "next/image";
import { useState } from "react";

function UploadImage() {
    const [image,setImage] = useState(null);
    function handleImageChange(e){
        console.log(e.target.files[0])
        const url = URL.createObjectURL(e.target.files[0]);
        setImage(url);
    }
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-28 h-28 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
          {image && <Image src={image} fill alt="profile image" className="text-[#8a6a3d] text-sm font-medium"/>}
        </div>

        <label className="px-5 py-2.5 bg-[#5c4320] text-white rounded-xl cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition font-medium shadow-md">
          Upload Image
          <input name="image" onChange={handleImageChange} type="file" className="hidden" />
        </label>
      </div>
    );
}

export default UploadImage