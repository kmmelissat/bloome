import FloatingNav from "@/app/components/landing/components/FloatingNav";
import Hero3D from "@/app/components/landing/components/Hero3D";
import FeaturesSection from "@/app/components/landing/components/FeaturesSection";

export default function LandingPage() {
  return (
    <div className="min-h-dvh bg-bg flex flex-col overflow-hidden">
      <div className="pointer-events-none fixed top-0 -right-24 w-96 h-96 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none fixed top-24 -left-24 w-80 h-80 rounded-full bg-warm/40 blur-3xl" />
      <div className="pointer-events-none fixed bottom-32 right-1/3 w-64 h-64 rounded-full bg-accent/35 blur-3xl" />

      <FloatingNav />
      <Hero3D />
      <FeaturesSection />
    </div>
  );
}
