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
      <main className="container flex flex-col px-55">
        <div className="flex-col-50 mb-84">
          <RoundImage />
          <IntroSection />
          <div className="absolute top-0 right-[-5%]">
            <PassiveName />
          </div>
        </div>
        <StorySection />
        <MyProcess />
      </main>
    </PageWrapper>
  );
}
