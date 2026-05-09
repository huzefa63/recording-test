import SignInForm from "../_components/auth/AuthForm";

export default function Page() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="border border-(--highlightBorder) w-full max-w-md rounded-2xl bg-(--layer) p-8 shadow-lg">
        <SignInForm />
      </div>
    </div>
  );
}
