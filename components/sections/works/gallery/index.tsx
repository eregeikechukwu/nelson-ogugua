import { Button } from "@/components/secondary/button";
import { Typewriter } from "@/components/secondary/typeWriter";
import { PassiveTextWithContainer } from "@/components/typography/passiveText";
import { selectedWorks } from "@/utils/selectedWorks";

export function SelectedWorksGallery() {
  return (
    <div className="w-full flex flex-col gap-40">
      {selectedWorks.map((work, index) => (
        <div key={index} className="flex border-gray skew-in-item">
          {/* Text */}
          <div className="flex-1 flex flex-col justify-between p-40 pr-60">
            <div className="flex flex-col gap-14">
              <h3 className="text-[2.5rem] font-bold leading-[1.2]">
                {work.name}
              </h3>
              <PassiveTextWithContainer>
                {work.services.join(" | ")}
              </PassiveTextWithContainer>
            </div>

            <div className="flex flex-col gap-43">
              <Typewriter
                speed={30}
                className="text-20 text-[var(--color-text-gray)]"
              >
                {work.description}
              </Typewriter>
              <Button variant="dark">View Project</Button>
            </div>
          </div>

          {/* Image */}
          <div className="basis-[49.44%] bg-[#151515] h-[36.4rem]"></div>
        </div>
      ))}
    </div>
  );
}
