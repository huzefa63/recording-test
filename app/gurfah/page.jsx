import { auth } from "@/auth";
import StudentContainer from "@/app/_components/gurfah/StudentContainer";

async function Page() {
        const session = await auth();
    
    return (
      <div className="p-5 h-full">
        <StudentContainer session={session} />
      </div>
    );
}

export default Page
