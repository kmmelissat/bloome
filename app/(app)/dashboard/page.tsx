import { getGreeting } from "@/app/utils/greeting";

export default function HomePage() {
  const greeting = getGreeting();

  return (
    <div className="scroll-touch">
      <h1 className="text-[34px] font-bold text-text tracking-[-0.5px]">
        {greeting}, User!
      </h1>
    </div>
  );
}
