'use client'
import { Cinzel } from "next/font/google"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUser } from "react-icons/fa"

const font = Cinzel({
    subsets:['latin'],
    weight:['500','600','700']
})
function PhoneTopBar() {
    const pathname = usePathname();
    if(pathname.includes('auth')) return null;
    return (
      <div className={`flex lg:hidden justify-between items-center p-3 text-lg border-b border-gray-200`}>
        <div>
          <h1 className={`text-xl ${font.className} font-semibold`}>
            Tahfeez Dohad
          </h1>
          <p className="text-xs text-gray-500">
            Learn. Memorize. Grow With Us.
          </p>
        </div>
        <Link href={'/profile'} className="p-3 rounded-full bg-(--bg-tertiary)/50">
          <FaUser className="text-amber-900" />
        </Link>
      </div>
    );
}

export default PhoneTopBar
