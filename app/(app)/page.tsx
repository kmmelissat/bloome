import Image from "next/image";

export default function HomePage() {
  return (
    <div className="scroll-touch">
      <div
        style={{
          paddingLeft: "20px",
          paddingTop: "60px",
          paddingRight: "20px",
          paddingBottom: "8px",
        }}
      >
        <Image
          src="/logo.svg"
          alt="bloomé"
          width={120}
          height={23}
          priority
          style={{ display: "block" }}
        />
      </div>
    </div>
  );
}
