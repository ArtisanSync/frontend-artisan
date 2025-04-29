import AuthForm from "@/components/AuthForm";

export const metadata = {
  title: "Sign In - Artisan Sync",
  description: "Sign in to your Artisan Sync account",
};

export default function SyncPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">Welcome back</h1>
          <p className="mt-2 text-white/60">
            Sign in to your account to continue
          </p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
}
