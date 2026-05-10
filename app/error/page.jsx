import Link from "next/link";

function Page() {
    return (
      <div className="h-screen flex flex-col gap-4 items-center justify-center">
        <div className="text-center font-bold">
          <h1>oops! something went wrong while signing in</h1>
          <h1>please try again</h1>
        </div>
        <Link href="/auth" className="bg-amber-900 text-white px-5 py-1 rounded-sm">back</Link>
      </div>
    );
}

export default Page
