import { getGreeting } from "@/app/utils/greeting";
import FinanceSummaryCard from "./components/FinanceSummaryCard";

export default function HomePage() {
  const greeting = getGreeting();

  return (
    <div className="scroll-touch flex flex-col gap-5">
      <h1 className="text-[34px] font-bold text-text tracking-[-0.5px]">
        {greeting}, User!
      </h1>
      <FinanceSummaryCard />
    </div>
  );
}
