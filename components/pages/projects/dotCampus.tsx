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
} from "@/utils/projects-info/dotcampus-info";
import {
  BigPassiveText,
  PassiveTextWithContainer,
} from "@/components/typography/passiveText";
import { StaggerRevealText } from "@/components/typography/text-reveal";
import { Button } from "@/components/secondary/button";
import { Table } from "@/components/secondary/table";
import { NextProjectCTA, WhatOthersThought } from "./secondary";

export function DotCampusPageContent() {
  return (
    <PageWrapper>
      <ProjectHeading
        title="DotCampus"
        descriptionList={descriptionList}
        paragraph={dotCampusIntro}
        livelink="https://dotcampus.co"
      />
      {/* Big Banner */}
      <BigBanner imgUrl="/webps/dotcampus/dotCampusBanner.webp" />
      {/* The challenge */}
      <div className="container flex flex-col md:gap-[3.5rem]">
        <div className="flex-col-40">
          <H2>The Challenge</H2>
          <FormattedText text={dotCampusChallenge} />
        </div>

        {/* banner */}
        <Banner
          className="md:rounded-[1rem] rounded-[0.5rem] md:!my-0 my-[1.5rem]"
          imgUrl="/webps/dotcampus/dotCampusChallenge.webp"
        />

        {/* The solution */}
        <div className="flex-col-40">
          <H2>The Solution</H2>
          <FormattedText text={dotCampusSolution} />
        </div>
      </div>
      {/* Table */}
      <Table items={tableItems} className="bg-[#ffc218]" />
      {/* Big banner2 & 3 */}
      <BigBanner imgUrl="/webps/dotcampus/dotCampus_Bigbanner2.webp" />
      <BigBanner imgUrl="/webps/dotcampus/dotCampus_Bigbanner3.webp" />
      {/* WHat other thought */}
      <WhatOthersThought whatOthersThought={whatOthersThought} />
      {/* Banner 5 & 6 */}
      <BigBanner imgUrl="/webps/dotcampus/dotCampus_Bigbanner4.webp" />
      <BigBanner imgUrl="/webps/dotcampus/dotCampus_Bigbanner5.webp" />
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
        <div className="image-gallery-flex">
          <Banner
            className="md:rounded-[1rem] rounded-[0.8rem]"
            imgUrl="/webps/dotcampus/dotCampus_grid1.webp"
          />
          <Banner imgUrl="/svg/dotCampus/dotCampus_gris2.svg" />

          <div>
            <Banner imgUrl="/svg/dotCampus/dotCampus_gris3.svg" />
            <Banner imgUrl="/svg/dotCampus/dotCampus_gris4.svg" />
          </div>

          <div>
            <Banner imgUrl="/svg/dotCampus/dotCampus_gris5.svg" />
            <Banner imgUrl="/svg/dotCampus/dotCampus_gris6.svg" />
          </div>

          <Banner imgUrl="/svg/dotCampus/dotCampus_gris7.svg" />
          <Banner imgUrl="/svg/dotCampus/dotCampus_gris8.svg" />
          <Banner imgUrl="/svg/dotCampus/dotCampus_gris9.svg" />

          <div>
            <Banner imgUrl="/svg/dotCampus/dotCampus_gris13.svg" />
            <Banner imgUrl="/svg/dotCampus/dotCampus_gris10.svg" />
          </div>

          <div>
            <Banner imgUrl="/svg/dotCampus/dotCampus_gris11.svg" />
            <Banner imgUrl="/svg/dotCampus/dotCampus_gris12.svg" />
          </div>
        </div>
      </section>

      {/* NExt page CTA */}
      <NextProjectCTA
        nextLink="/bulvds"
        name="Bulvds"
        description="Making property search more conversational, personal, and
              effortless with AI."
      />
    </PageWrapper>
  );
}
