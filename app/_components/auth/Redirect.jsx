'use client';

import { useRouter } from "next/navigation";
import { useUser } from "../providers/UserProvider";

function Redirect({unauthorizedRole}) {
    const router = useRouter();
    const {user,isFetching} = useUser();
    console.log(user);
    if(isFetching) return;
    if(!user) return router.replace('/auth');
    if(unauthorizedRole.includes(user.role)){
         return router.replace("/profile");
    }
}

export default Redirect
