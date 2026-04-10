import { H2 } from "../typography/h2";

export function Table({
  items,
  className,
}: {
  items: { label: string; value: string }[];
  className?: string;
}) {
  return (
    <section
      className={`w-screen center-content  !py-[var(--container-padding)] ${className || ""}`}
    >
      <div className="w-full max-w-[var(--container-width)] overflow-x-auto !mx-auto flex flex-col md:gap-[3rem]">
        <H2 className="text-black">User goals and features</H2>

        {/* Table */}
        <div className="add-border-not-last">
          {/* heading */}
          <div className="flex table-heading">
            <div className="table-head !pb-[1.556rem]">User Persona</div>
            <div className="flex-1">Needs & Priorities</div>
          </div>
          {/* Table proper */}
          {items.map((item) => (
            <div key={item.label} className="flex items-center !py-[1.556rem]">
              <div className="table-head md:text-[1.5rem] font-bold text-black">
                {item.label}
              </div>
              <div className="flex-1 md:text-[1.25rem] text-black leading-[1.6]">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
