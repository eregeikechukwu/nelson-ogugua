import Image from "next/image";

export function RoundImage() {
  return (
    <div className="popOut rounded-full thick-border p-[0.975rem] w-150 h-150 center-content">
      <div className="rounded-full overflow-hidden w-118 h-118">
        <Image
          src="/svg/profile.svg"
          alt="Profile Picture"
          height={118.8}
          width={118.8}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
