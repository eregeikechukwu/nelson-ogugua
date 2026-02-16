import Image from "next/image";

export function RoundImage() {
  return (
    <div className="popOut rounded-full thick-border p-[0.975rem] w-137 h-137 md:!w-[9.374rem] md:!h-[9.374rem] center-content">
      <div className="rounded-full overflow-hidden h-109 md:!w-[7.375rem] w-109 md:!h-[7.375rem]">
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
