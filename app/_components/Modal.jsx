"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { RxCross2 } from "react-icons/rx";

export default function Modal({ children, onClose,className,heading }) {
    const [isMounted,setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    },[])
    if(!isMounted) return;
  return createPortal(
    <div
      onClick={onClose}
      className="z-1000 fixed inset-0 bg-black/40 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative bg-[#FFF1D3] p-8 rounded-xl w-3/4 h-1/2 ${className}`}
      >
        <h1 className="text-center mb-3 text-lg tracking-wider font-semibold">
          {/* {filterType === "student" ? "select student" : "select teacher"} */}
          {heading}
        </h1>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute right-2 top-2"
        >
          <RxCross2 />
        </button>

        {children}
      </div>
    </div>,
    document.getElementById("root"),
  );
}
