export function PassiveText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <p
      className={` ${className} text-12 leading-[2] tracking-[2px] uppercase text-[var(--color-text-gray)]`}
    >
      {children}
    </p>
  );
}

export function PassiveTextWithContainer({ children }: { children: string }) {
  return (
    <div className="w-max px-12 py-10 bg-[var(--color-gray-transparent3)] backdrop-blur-[20px]">
      <PassiveText className="text-white !leading-[1]">{children}</PassiveText>
    </div>
  );
}
