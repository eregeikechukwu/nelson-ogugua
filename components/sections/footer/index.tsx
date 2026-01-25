import { RotatingSVG } from "@/components/secondary/rotatingSVG";
import { PassiveText } from "@/components/typography/passiveText";
import { footerLinksPages, footerLinksSocials } from "@/utils/Links";
import Link from "next/link";

const FooterList = ({ list }: { list: { name: string; href: string }[] }) => {
  return (
    <div className=" flex flex-col gap-32">
      {list.map((item, i) => (
        <Link key={`item-${i}`} href={item.href}>
          <h1 className=" text-white uppercase font-bold flex items-center gap-6  animate-hover2">
            <span className=" inline-block w-4 h-[-webkit-fill-available] bg-[var(--color-yellow)]" />
            <span className="translate-y-[3px] text-14 tracking-[2px] leading-[1]">
              {item.name}
            </span>
          </h1>
        </Link>
      ))}
    </div>
  );
};

export function Footer() {
  return (
    <footer className="container pb-30 flex flex-col gap-50">
      {/* Name */}
      <div className="flex flex-col gap-100 relative">
        <div className="w-[17.35rem] absolute -top-[15%] right-[20%]">
          <RotatingSVG />
        </div>

        <div className="">
          <h1 className="extralargeText">Nelson</h1>
          <h1 className="extralargeText">Ogugua</h1>
        </div>

        {/* Links */}

        <div className="flex gap-88">
          <FooterList list={footerLinksPages} />
          <FooterList list={footerLinksSocials} />
        </div>
      </div>

      {/* Landing */}
      <div className="p-24 border-gray flex">
        <PassiveText>
          © 2026 &bull; Designed by NELSON OGUGUA &bull;&nbsp;
        </PassiveText>
        <Link
          href={"https://nelson-erege-portfolio.vercel.app"}
          className="underline"
        >
          <PassiveText>BUILT BY NELSON EREGE</PassiveText>
        </Link>
      </div>
    </footer>
  );
}
