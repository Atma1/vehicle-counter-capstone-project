import { LoginForm } from "@/components/login-form"
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function Login() {
  const session = await auth();

  // Redirect to dashboard if  session exists
  if (session) redirect('/dashboard');

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-muted">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}