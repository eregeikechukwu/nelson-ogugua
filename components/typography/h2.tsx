export function H2({
  children = "H2",
  className = "text-white",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={`md:text-[2rem] font-bold ${className}`}>{children}</h2>
  );
}
