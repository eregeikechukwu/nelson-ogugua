export function CTA({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`${className} center-content w-full mt-38 md:mt-[2.5rem] `}>
      {children}
    </div>
  );
}
