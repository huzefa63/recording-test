// "use client";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { useSession } from "next-auth/react";
// import { createContext, useContext, useEffect } from "react";

// const Context = createContext();
// function AppProvider({ children }) {
//     const {data:students} = useQuery({
//       queryKey:['students'],
//       queryFn:handleGetStudents,
//       refetchOnWindowFocus:false,
//     })
//     const session = useSession();
//     console.log(session.data?.jwt);

//     async function handleGetStudents(){
//       // const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/student/getAllStudents`)
//       return [];
//     }
//   return <Context.Provider value={{  }}>{children}</Context.Provider>;
// }

// export default AppProvider;

// export function useAppProvider() {
//   const context = useContext(Context);

//   if (!context) {
//     throw new Error("useUser must be used within UserProvider");
//   }

//   return context;
// }
