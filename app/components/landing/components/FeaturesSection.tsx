import {
  IconArrowUpRight,
  IconCoffee,
  IconShoppingBag,
  IconCar,
  IconHome,
  IconSparkles,
} from "@tabler/icons-react";

const transactions = [
  { Icon: IconCoffee,      label: "Coffee",        amount: "$4.50",  cat: "Food",      color: "bg-primary/20" },
  { Icon: IconShoppingBag, label: "Zara",          amount: "$89.00", cat: "Shopping",  color: "bg-warm" },
  { Icon: IconCar,         label: "Uber",          amount: "$12.30", cat: "Transport", color: "bg-accent" },
  { Icon: IconHome,        label: "Rent",          amount: "$950.00",cat: "Housing",   color: "bg-primary/15" },
];

const budgets = [
  { label: "Food & Drink", pct: 72, spent: "$640", total: "$900"  },
  { label: "Shopping",     pct: 45, spent: "$270", total: "$600"  },
  { label: "Transport",    pct: 28, spent: "$84",  total: "$300"  },
  { label: "Housing",      pct: 95, spent: "$950", total: "$1000" },
];

export default function FeaturesSection() {
  return (
    <section className="px-8 pb-24 w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-[12px] font-bold tracking-[0.15em] uppercase text-primary mb-3 block">
          Everything you need
        </span>
        <h2 className="text-[40px] md:text-[52px] font-bold text-text tracking-[-1.5px] leading-[1.05] mb-4">
          One app for all your<br />
          <span className="font-handwritten text-primary text-[52px] md:text-[64px] tracking-normal">money things</span>
        </h2>
        <p className="text-text-muted text-[17px] max-w-md mx-auto leading-relaxed">
          Remove all the friction that stands in the way of your financial goals.
        </p>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 auto-rows-auto">

        {/* Card A — Transactions (portrait, left) */}
        <div className="md:col-span-2 rounded-[28px] bg-text p-7 flex flex-col gap-6 overflow-hidden relative min-h-120">
          {/* Decorative blob */}
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />

          <div>
            <p className="text-white/50 text-[13px] font-medium mb-1">This month</p>
            <p className="text-white text-[42px] font-bold tracking-[-1.5px] leading-none">$2,340</p>
            <div className="flex items-center gap-1.5 mt-2">
              <IconArrowUpRight size={16} stroke={2.5} className="text-primary" />
              <span className="text-primary text-[13px] font-semibold">12% less than last month</span>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 flex-1">
            {transactions.map(({ Icon, label, amount, cat, color }) => (
              <div key={label} className="flex items-center gap-3 bg-white/5 rounded-2xl px-4 py-3">
                <span className={`w-9 h-9 rounded-xl ${color} flex items-center justify-center shrink-0`}>
                  <Icon size={16} stroke={1.8} className="text-text" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-[14px] font-medium leading-none">{label}</p>
                  <p className="text-white/40 text-[12px] mt-0.5">{cat}</p>
                </div>
                <p className="text-white text-[14px] font-semibold">-{amount}</p>
              </div>
            ))}
          </div>

          <p className="text-white/30 text-[13px]">Track every expense, automatically.</p>
        </div>

        {/* Card B — Budgets (landscape, right) */}
        <div className="md:col-span-3 rounded-[28px] bg-warm/30 border border-warm p-7 flex flex-col gap-6 min-h-120">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <IconSparkles size={16} stroke={1.8} className="text-primary" />
              <p className="text-text-muted text-[13px] font-medium">AI-powered</p>
            </div>
            <h3 className="text-text text-[32px] font-bold tracking-[-1px] leading-none">
              Budgets that<br />
              <span className="font-handwritten text-primary text-[40px] tracking-normal leading-tight inline-block">actually work.</span>
            </h3>
          </div>

          <div className="flex flex-col gap-4 flex-1 justify-center">
            {budgets.map(({ label, pct, spent, total }) => {
              const over = pct >= 90;
              return (
                <div key={label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[14px] font-medium text-text">{label}</span>
                    <span className="text-[13px] text-text-muted">
                      <span className={over ? "text-primary font-semibold" : ""}>{spent}</span>
                      {" / "}{total}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-black/8 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${over ? "bg-primary" : "bg-text/30"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* AI insight chip */}
          <div className="glass rounded-2xl px-4 py-3 flex items-start gap-3">
            <span className="w-8 h-8 rounded-xl bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
              <IconSparkles size={15} stroke={1.8} className="text-primary" />
            </span>
            <div>
              <p className="text-[13px] font-semibold text-text">Housing budget almost full</p>
              <p className="text-[12px] text-text-muted mt-0.5">You&apos;ve used 95% of your rent budget. Consider reviewing discretionary spending.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
