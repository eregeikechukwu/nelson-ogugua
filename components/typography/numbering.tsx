import { FastRevealText } from "./text-reveal";

export function Numbering({ list }: { list: string[] }) {
  return (
    <div className="flex flex-col gap-[1.5rem]">
      {list.map((item, i) => (
        <div className="flex gap-[0.5rem]" key={`numbering-${i}`}>
          <span className="!mt-[-0.15rem] text-[var(--color-text-gray)]">
            {i + 1}.
          </span>
          <FastRevealText className="text-[var(--color-text-gray)]">
            {item}
          </FastRevealText>
        </div>
      ))}
    </div>
  );
}
