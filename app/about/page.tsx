import { PageWrapper } from "@/components/pages/pageWrapper";
import { PassiveName } from "@/components/secondary/passiveName";
import { RoundImage } from "@/components/secondary/roundImage";
import { IntroSection } from "@/components/sections/about/intro";
import { MyProcess } from "@/components/sections/about/myProcess";
import { StorySection } from "@/components/sections/about/story";

export default function AboutPage() {
  return (
    <PageWrapper>
      <main className="container flex flex-col gap-84 px-55">
        <div className="flex-col-50 ">
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
