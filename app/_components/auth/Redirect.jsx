'use client';

import { useRouter } from "next/navigation";
import { useUser } from "../providers/UserProvider";
import { useEffect } from "react";

function Redirect({unauthorizedRole}) {
    // const router = useRouter();
    // const {user,isFetching} = useUser();
    // // console.log('user',user);
    // useEffect(() => {
    //     if(isFetching) return;
    // // console.log('after fetching')
    // if(!user?.role && !isFetching) return router.replace('/auth');
    // if(user?.role && unauthorizedRole.includes(user.role)){
    //      return router.replace("/profile");
    // }},[isFetching,user?.role,router,unauthorizedRole]);
    return null;
    }


export default Redirect
