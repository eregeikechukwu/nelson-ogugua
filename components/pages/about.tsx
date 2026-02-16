import { PassiveName } from "@/components/secondary/passiveName";
import { RoundImage } from "@/components/secondary/roundImage";
import {
  StorySection,
  IntroSection,
  MyProcess,
} from "@/components/sections/about";
import { useScreenSize } from "@/hooks/useScreenSize";

export function AboutPage() {
  return (
    <main className="w-full flex justify-center ">
      <div className="relative w-full max-w-[80rem]  my-0 mx-auto center-content !flex-col md:flex-row">
        <div className="block md:hidden w-[inherit] !px-[var(--container-inline-padding-mobile)]">
          <PassiveName />
        </div>

        <div className="container max-md:!pt-0 flex flex-col">
          <div className="flex flex-col md:!gap-[3.125rem] gap-56 !mb-[3.5rem] md:!mb-[5.25rem]">
            <RoundImage />
            <IntroSection />
          </div>
          <StorySection />
          <MyProcess />
        </div>

        <div className="hidden md:block absolute top-12 right-0">
          <PassiveName />
        </div>
      </div>
    </main>
  );
}
