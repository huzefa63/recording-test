import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  console.log(cookieStore.get('jwt'));
  if(!cookieStore.get('jwt')?.value) redirect('/auth');
  else redirect('/students');
}
