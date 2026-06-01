'use client';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect } from "react";
import toast from "react-hot-toast";

const Context = createContext();
function UserProvider({ children }) {

  const session = useSession();
  const queryClient = useQueryClient();
   const { data:user,isFetching } = useQuery({
     queryKey: ["user"],
     queryFn: handleGetUser,
     refetchOnWindowFocus: false,
    //  enabled: !!session.data?.jwt,
   });
   // console.log(session.data?.jwt);

   useEffect(() => {
    async function getCookie(){
      try{
        const res = await axios.post(
            `${process.env.URL}/auth/googleSignin`,
            {role:session?.data?.role,idToken:session?.data?.idToken},
              {withCredentials:true},
          );
          queryClient.invalidateQueries();
      }catch(err){
        toast.error('something went wrong');
      }
    }
   },[session?.data])

   async function handleGetUser() {
     try {
       const res = await axios.get(
         `${process.env.NEXT_PUBLIC_URL}/user/getUser`,
         { withCredentials:true },
       );
       return res.data.user;
     } catch (err) {
       console.log(err);
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