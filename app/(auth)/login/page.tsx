import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm relative">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-20 -left-16 w-64 h-64 rounded-full bg-primary/25 blur-3xl" />
      <div className="pointer-events-none absolute -top-8 -right-16 w-52 h-52 rounded-full bg-warm/60 blur-3xl" />
      <div className="pointer-events-none absolute top-40 left-1/3 w-40 h-40 rounded-full bg-accent/50 blur-3xl" />

      <div className="relative flex justify-center mb-8">
        <Image src="/logo.svg" alt="bloomé" width={120} height={23} priority />
      </div>

      <div className="relative glass rounded-card shadow-card p-6 flex flex-col gap-5">
        <div>
          <h1 className="text-[22px] font-bold text-text tracking-[-0.5px]">Welcome back</h1>
          <p className="text-text-muted text-[14px] mt-1">Sign in to your account</p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-text-muted">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl bg-bg border border-border text-text text-[15px] outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[13px] font-medium text-text-muted">Password</label>
              <Link href="/forgot-password" className="text-[13px] text-primary font-medium">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-bg border border-border text-text text-[15px] outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        <button className="w-full py-3.5 rounded-2xl bg-linear-to-r from-primary to-warm font-semibold text-[16px] text-text transition-opacity hover:opacity-85 active:opacity-70">
          Log in
        </button>
      </div>

      <p className="relative text-center text-[14px] text-text-muted mt-5">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-primary font-semibold">
          Sign up
        </Link>
      </p>
    </div>
  );
}
