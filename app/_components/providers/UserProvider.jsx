'use client';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const Context = createContext();
function UserProvider({ children }) {

  const session = useSession();
  const router = useRouter();
  const [user,setUser] = useState({});
  const [isFetching,setIsFetching] = useState(false);
   const { data:token } = useQuery({
     queryKey: ["token"],
     queryFn:() =>  getCookie(session),
     refetchOnWindowFocus: false,

    //  enabled: !!session.data?.jwt,
   });
   // console.log(session.data?.jwt);

    async function getCookie(session){
      // toast.success(session?.status);
      try{
        // console.log('run')
        // toast.success(session?.data?.role);
        // console.log('getting token');
        let res;
        if(session?.data?.idToken){
          res = await axios.post(
            `${process.env.NEXT_PUBLIC_URL}/auth/googleSignin`,
            { role: session?.data?.role, idToken: session?.data?.idToken },
            { withCredentials: true },
          );
          // toast.success('got cookie');
        }
        setIsFetching(true);
       const ress = await axios.get(
         `${process.env.NEXT_PUBLIC_URL}/user/getUser`,
         { withCredentials: true },
       );
       setUser(ress.data.user);
        // if(ress.data.user.role === 'student')router.replace('/profile');
        // else router.replace('/students');
        return null;
      }catch(err){
        console.log('something went wrong');  
        return null;
      }finally{
        setIsFetching(false);
      }
    }
    
  

   async function handleGetUser() {
    if(session.data?.idToken) return user;
     try {
      
       const res = await axios.get(
         `${process.env.NEXT_PUBLIC_URL}/user/getUser`,
         { withCredentials:true },
       );
       console.log('got user');
       return res.data.user;
     } catch (err) {
      toast.error('failed to get user');
       console.log('failed');
       return {};
     }
   }
  return <Context.Provider value={{ user,isFetching }}>{children}</Context.Provider>;
}

export default UserProvider;

export function useUser() {
  const context = useContext(Context);

  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }

  return context;
}