"use client";

import { PageWrapper } from "@/components/pages/pageWrapper";
import { H2 } from "@/components/typography/h2";
import { Banner, BigBanner } from "@/components/sections/project/bigBanner";
import { ProjectHeading } from "@/components/sections/project/projectHeading";
import { FormattedText } from "@/components/sections/formattedText";
import {
  dotCampusChallenge,
  dotCampusIntro,
  dotCampusSolution,
  descriptionList,
  tableItems,
  whatOthersThought,
} from "@/utils/projects-info";
import {
  BigPassiveText,
  PassiveTextWithContainer,
} from "@/components/typography/passiveText";
import { StaggerRevealText } from "@/components/typography/text-reveal";
import { Button } from "@/components/secondary/button";

export default function DotCampus() {
  return (
    <PageWrapper>
      <ProjectHeading
        title="DotCampus"
        descriptionList={descriptionList}
        paragraph={dotCampusIntro}
      />
      {/* Big Banner */}
      <BigBanner imgUrl="/svg/dotCampus/dotCampusBanner.svg" />
      {/* The challenge */}
      <div className="container flex flex-col md:gap-[3.5rem]">
        <div className="flex-col-40">
          <H2>The Challenge</H2>
          <FormattedText text={dotCampusChallenge} />
        </div>

        {/* banner */}
        <Banner imgUrl="/svg/dotCampus/dotCampusChallenge.svg" />

        {/* The solution */}
        <div className="flex-col-40">
          <H2>The Solution</H2>
          <FormattedText text={dotCampusSolution} />
        </div>
      </div>{" "}
      {/* Table */}
      <section className="w-screen center-content  !py-[var(--container-padding)] bg-[#ffc218]">
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
            {tableItems.map((item, index) => (
              <div key={item.head} className="flex items-center !py-[1.556rem]">
                <div className="table-head md:text-[1.5rem] font-bold text-black">
                  {item.head}
                </div>
                <div className="flex-1 md:text-[1.25rem] text-black leading-[1.6]">
                  {item.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Big banner2 & 3 */}
      <BigBanner imgUrl="/svg/dotCampus/dotCampus_Bigbanner2.svg" />
      <BigBanner imgUrl="/svg/dotCampus/dotCampus_Bigbanner3.svg" />
      {/* WHat other thought */}
      <div className="container flex flex-col md:gap-[3.4rem]">
        {whatOthersThought.map((item) => (
          <div key={item.head} className="flex flex-col md:gap-[1.22rem]">
            <BigPassiveText>{item.head}</BigPassiveText>
            <div className="stagger-reveal-container">
              {item.content.split(" ").map((item, i) => {
                return (
                  <span key={`div-${i}`}>
                    <H2 key={`span-${i}`} className="word">
                      {item}&nbsp;
                    </H2>
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {/* Banner 5 & 6 */}
      <BigBanner imgUrl="/svg/dotCampus/dotCampus_Bigbanner4.svg" />
      <BigBanner imgUrl="/svg/dotCampus/dotCampus_Bigbanner5.svg" />
      {/* Visual Identity */}
      <section className="container flex-col-40">
        {/* Write-up */}
        <div className="flex-col-40">
          <H2>Visual Identity</H2>
          <StaggerRevealText className="text-[var(--color-text-gray)]">
            We established a cohesive visual language designed for scalability
            across web and mobile. The system combines a geometric logo mark
            with high-readability typography, ensuring the brand remains
            distinct and accessible whether on a marketing banner or a dark-mode
            code editor.
          </StaggerRevealText>
        </div>

        {/* Images grid */}
        <div className="flex-col-40">
          <Banner imgUrl="/svg/dotCampus/dotCampus_gris1.svg" />
          <Banner imgUrl="/svg/dotCampus/dotCampus_gris2.svg" />

          <div className="flex-row-tocol-40 ">
            <Banner imgUrl="/svg/dotCampus/dotCampus_gris3.svg" />
            <Banner imgUrl="/svg/dotCampus/dotCampus_gris4.svg" />
          </div>

          <div className="flex-row-tocol-40 ">
            <Banner imgUrl="/svg/dotCampus/dotCampus_gris5.svg" />
            <Banner imgUrl="/svg/dotCampus/dotCampus_gris6.svg" />
          </div>

          <Banner imgUrl="/svg/dotCampus/dotCampus_gris7.svg" />
          <Banner imgUrl="/svg/dotCampus/dotCampus_gris8.svg" />
          <Banner imgUrl="/svg/dotCampus/dotCampus_gris9.svg" />

          <div className="flex-row-tocol-40 ">
            <Banner imgUrl="/svg/dotCampus/dotCampus_gris13.svg" />
            <Banner imgUrl="/svg/dotCampus/dotCampus_gris10.svg" />
          </div>

          <div className="flex-row-tocol-40 ">
            <Banner imgUrl="/svg/dotCampus/dotCampus_gris11.svg" />
            <Banner imgUrl="/svg/dotCampus/dotCampus_gris12.svg" />
          </div>
        </div>
      </section>
      {/* NExt page CTA */}
      <section className="w-screen bg-[var(--color-cta-gray)]">
        <div className="w-full max-w-[var(--container-width)] overflow-x-auto !mx-auto flex justify-between items-center !py-[1.5rem]">
          {/* content */}
          <div className="md:gap-[0.875rem] max-w-[45rem]">
            <PassiveTextWithContainer>Next project</PassiveTextWithContainer>
            <H2>Bulvds</H2>
            <p className="paragraph-text">
              Making property search more conversational, personal, and
              effortless with AI.
            </p>
          </div>

          {/* Button */}
          <Button>View project</Button>
        </div>
      </section>
    </PageWrapper>
  );
}
