import Image from "next/image";

export function BigBanner({ imgUrl }: { imgUrl: string }) {
  return (
    <div className="center-content">
      <Image
        src={imgUrl}
        alt="big banner"
        width={1440}
        height={709}
        className="w-screen max-w-[100rem] h-auto object-cover"
      />
    </div>
  );
}

export function Banner({ imgUrl }: { imgUrl: string }) {
  return (
    <div className="center-content">
      <Image
        src={imgUrl}
        alt="banner"
        width={1072}
        height={504}
        className="w-full max-w-[100rem] h-auto object-cover"
      />
    </div>
  );
}
