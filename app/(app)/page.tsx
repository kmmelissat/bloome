import Image from "next/image";

export default function HomePage() {
  return (
    <div className="scroll-touch">
      <div className="px-5 pt-15 pb-2">
        <Image src="/logo.svg" alt="bloomé" width={120} height={23} priority className="block" />
      </div>
    </div>
  );
}
