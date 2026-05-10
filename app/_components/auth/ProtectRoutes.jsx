import { auth } from "@/auth"
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function ProtectRoutes({children}) {
    const session = await auth();
    if(!session?.user) return redirect('/auth');
    return children;
}

export default ProtectRoutes
