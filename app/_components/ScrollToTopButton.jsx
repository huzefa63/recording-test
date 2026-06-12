'use client';

import { IoIosArrowUp } from "react-icons/io";

function ScrollToTopButton() {
    return <button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} className="fixed lg:bottom-5 bottom-17 lg:right-5 right-0 p-2 rounded-full bg-(--card) shadow-(--shadow-md) border border-(--border) hover:cursor-pointer hover:bg-(--card-highlight) transition-all duration-300 ease-in-out"><IoIosArrowUp /></button>;
}

export default ScrollToTopButton
