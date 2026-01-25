export function PassiveText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <p
      className={`${className} text-12 leading-[2] tracking-[2px] uppercase text-[var(--color-text-gray)]`}
    >
      {children}
    </p>
  );
}
