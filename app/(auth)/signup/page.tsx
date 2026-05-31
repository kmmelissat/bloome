import Image from "next/image";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="w-full max-w-sm relative">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-20 -right-16 w-64 h-64 rounded-full bg-primary/25 blur-3xl" />
      <div className="pointer-events-none absolute -top-4 -left-16 w-52 h-52 rounded-full bg-accent/50 blur-3xl" />
      <div className="pointer-events-none absolute top-48 right-1/4 w-40 h-40 rounded-full bg-warm/60 blur-3xl" />

      <div className="relative flex justify-center mb-8">
        <Image src="/logo.svg" alt="bloomé" width={120} height={23} priority />
      </div>

      <div className="relative glass rounded-card shadow-card p-6 flex flex-col gap-5">
        <div>
          <h1 className="text-[22px] font-bold text-text tracking-[-0.5px]">Create account</h1>
          <p className="text-text-muted text-[14px] mt-1">Start managing your finances today</p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-text-muted">Full name</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-xl bg-bg border border-border text-text text-[15px] outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-text-muted">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl bg-bg border border-border text-text text-[15px] outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-text-muted">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-bg border border-border text-text text-[15px] outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        <button className="w-full py-3.5 rounded-2xl bg-linear-to-r from-primary to-warm font-semibold text-[16px] text-text transition-opacity hover:opacity-85 active:opacity-70">
          Create account
        </button>
      </div>

      <p className="relative text-center text-[14px] text-text-muted mt-5">
        Already have an account?{" "}
        <Link href="/login" className="text-primary font-semibold">
          Log in
        </Link>
      </p>
    </div>
  );
}
