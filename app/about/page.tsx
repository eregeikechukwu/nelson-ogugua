import { PageWrapper } from "@/components/pages/pageWrapper";
import { Button } from "@/components/secondary/button";
import { PassiveName } from "@/components/secondary/passiveName";
import { RoundImage } from "@/components/secondary/roundImage";
import {
  StorySection,
  IntroSection,
  MyProcess,
} from "@/components/sections/about";

export const metadata = {
  title: "About",
  description: "About me and my professional experience",
};

export default function AboutPage() {
  return (
    <PageWrapper>
      <main className="relative w-full max-w-[80rem]  my-0 mx-auto center-content">
        <div className="container  flex flex-col">
          <div className="flex-col-50 mb-84 px-55">
            <RoundImage />
            <IntroSection />
          </div>
          <StorySection />
          <MyProcess />
        </div>

        <div className="absolute top-12 right-0">
          <PassiveName />
        </div>
      </main>
    </PageWrapper>
  );
}
