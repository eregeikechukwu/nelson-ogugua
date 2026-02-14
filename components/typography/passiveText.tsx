export function PassiveText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <p
      className={` ${className} text-10 md:!text-[0.75rem] leading-[1.51] md:!leading-[2] tracking-[1.26px] md:!tracking-[2px] uppercase text-[var(--color-text-gray)]`}
    >
      {children}
    </p>
  );
}

export function PassiveTextWithContainer({ children }: { children: string }) {
  return (
    <div className="w-max !py-[0.39375rem] !px-[0.475rem] md:!px-[0.75rem] md:!py-[0.625rem]  bg-[var(--color-gray-transparent3)] backdrop-blur-[20px]">
      <PassiveText className="text-white !leading-[1]">{children}</PassiveText>
    </div>
  );
}
