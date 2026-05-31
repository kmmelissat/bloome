import Image from "next/image";
import Link from "next/link";

export default function LandingNav() {
  return (
    <nav className="relative flex items-center justify-between px-8 py-6 max-w-6xl mx-auto w-full">
      <Image src="/logo.svg" alt="bloomé" width={110} height={21} priority />
      <Link
        href="/login"
        className="text-[14px] font-semibold text-text-muted hover:text-text transition-colors"
      >
        Log in
      </Link>
    </nav>
  );
}
