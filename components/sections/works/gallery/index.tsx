import { Button } from "@/components/secondary/button";
import { Typewriter } from "@/components/secondary/typeWriter";
import { PassiveTextWithContainer } from "@/components/typography/passiveText";
import { selectedWorks } from "@/utils/selectedWorks";

export function SelectedWorksGallery() {
  return (
    <div className="w-full flex flex-col gap-40">
      {selectedWorks.map((work, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row border-gray skew-in-item"
        >
          {/* Text */}
          <div className="order-2 md:order-1 flex-1 flex flex-col justify-between gap-[2rem] md:gap-0 !p-[1rem] max-md:!pt-[1.5rem] md:!p-[2.5rem] md:!pr-[3.75rem]">
            <div className="flex flex-col gap-[0.5rem] md:gap-[0.875rem]">
              <h3 className="text-[1.75rem] md:text-[2.5rem] font-bold leading-[1] md:leading-[1.2]">
                {work.name}
              </h3>
              <PassiveTextWithContainer scaleDown={false}>
                {work.services.join(" | ")}
              </PassiveTextWithContainer>
            </div>

            <div className="flex flex-col  gap-0 md:gap-[2.6875rem]">
              <Typewriter
                speed={30}
                className="text-[0.875rem] md:text-[1.25rem] text-[var(--color-text-gray)]"
              >
                {work.description}
              </Typewriter>
              <Button className="hidden  md:flex" variant="dark">
                View Project
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 md:order-2 md:basis-[49.44%] bg-[#151515] h-[23.5rem] md:h-[36.4rem]"></div>
        </div>
      ))}
    </div>
  );
}
