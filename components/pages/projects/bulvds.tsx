"use client";

import { ProjectHeading } from "@/components/sections/project/projectHeading";
import { PageWrapper } from "../pageWrapper";
import { Banner, BigBanner } from "@/components/sections/project/bigBanner";
import { StaggerRevealText } from "@/components/typography/text-reveal";
import { H2 } from "@/components/typography/h2";
import { Numbering } from "@/components/typography/numbering";
import { Table } from "@/components/secondary/table";
import { FormattedText } from "@/components/sections/formattedText";
import { NextProjectCTA, WhatOthersThought } from "./secondary";
import {
  bulvdsIntro,
  descriptionList,
  coreChallenges,
  tableItems,
  solutionsList,
  whatOthersThought,
  visualIdentityText,
} from "@/utils/projects-info/bulvds-info";
import { AnimationVideo } from "@/components/secondary/animationVideo";

export function BulvdsPageContent() {
  return (
    <PageWrapper>
      <ProjectHeading
        title="Bulvds"
        paragraph={bulvdsIntro}
        descriptionList={descriptionList}
        livelink="https://bulvds.com/"
      />
      {/* Big banner */}
      <BigBanner imgUrl="/webps/bulvds/bulvdsBigBanner.jpg" />

      {/* The challenge */}
      <section className="container flex-col-60">
        <div className="flex-col-40">
          <H2>The challenge</H2>
          <StaggerRevealText className="text-[var(--color-text-gray)]">
            To understand why renting is so painful, I analyzed user reviews on
            the Google Play and Apple App Stores and spoke with people actively
            looking for apartments. The feedback was raw: users are tired of
            &quot;clunky&quot; interfaces, unresponsive agents, and the constant
            fear of being scammed.
          </StaggerRevealText>
        </div>

        {/* Challenge banner */}
        <Banner rounded imgUrl="/webps/bulvds/bulvdsChallenge.jpg" />

        {/* Core challenges */}
        <div className="flex-col-40">
          <H2>Core challenges</H2>
          <Numbering list={coreChallenges} />
        </div>

        {/* Every step tells a story */}
        <div className="flex-col-40">
          <H2>Every step tells a story</H2>
          <StaggerRevealText className="text-[var(--color-text-gray)]">
            To understand the rental journey better, we had to map the user’s
            journey based on my findings from the secondary research. My
            findings from the research gave me a clear picture of the typical
            flow people go through, from first search to final payment, and
            revealed where frustration, confusion, and mistrust often creep in.
            Mapping this journey helped me pinpoint exactly where design could
            make the biggest impact.
          </StaggerRevealText>
        </div>

        {/* Every step banner */}
        <Banner rounded imgUrl="/webps/bulvds/bulvdsteps.jpg" />
      </section>

      {/* Table */}
      <Table className="bg-[#aaf937]" items={tableItems} />

      {/* The solution */}
      <section className="container flex-col-60">
        <div className="flex flex-col gap-[1.5rem]">
          <div className="flex-col-40">
            <H2>The solution</H2>
            <StaggerRevealText className="text-[var(--color-text-gray)]">
              With the pain points mapped out, we focused on solving them
              through clear, practical designs. The aim was to make Bulvds feel
              less like a listings app and more like a helpful assistant, one
              that is conversational, transparent, and easy to trust. Based on
              insights from our journey map, we narrowed down the solutions into
              these features below:
            </StaggerRevealText>
            <FormattedText text={solutionsList} />
          </div>
        </div>

        {/* Solution images */}
        <Banner imgUrl="/webps/bulvds/bulvdSolution1.jpg" />
        <Banner imgUrl="/webps/bulvds/bulvdSolution2.jpg" />
        <Banner imgUrl="/webps/bulvds/bulvdSolution3.jpg" />
        <Banner imgUrl="/webps/bulvds/bulvdSolution4.jpg" />
        <Banner imgUrl="/webps/bulvds/bulvdSolution5.jpg" />
        <Banner imgUrl="/webps/bulvds/bulvdSolution6.jpg" />
      </section>

      {/* Solution big banners */}
      <BigBanner imgUrl="/webps/bulvds/bulvdSolutionBanner1.jpg" />
      <AnimationVideo url="/vid/bulvdslanding.webm" />

      {/* WHat others thought */}
      <WhatOthersThought whatOthersThought={whatOthersThought} />

      <section className="container flex flex-col md:gap-[6.25rem] gap-[3rem]">
        {/* Visual Identity */}
        <div className="flex-col-50">
          <div className="flex-col-32">
            <H2>Visual Identity</H2>
            <FormattedText text={visualIdentityText} />
          </div>

          {/* Visual Identity grid */}
          <div className="image-gallery-flex">
            <Banner imgUrl="/svg/bulvds/bulvdsgrid1.svg" />
            <div className="flex-row-tocol-40">
              <Banner
                imgUrl="/webps/bulvds/bulvdsgrid2.jpg"
                className="basis-[54.29%]"
              />
              <Banner
                imgUrl="/webps/bulvds/bulvdsgrid3.jpg"
                className="flex-1"
              />
            </div>
            <Banner imgUrl="/webps/bulvds/bulvdsgrid4.jpg" />
          </div>
        </div>

        {/* Design that scales */}
        <div className="flex-col-50">
          <div className="flex-col-32">
            <H2>Design that scales</H2>
            <StaggerRevealText className="text-[var(--color-text-gray)]">
              A unified design system built to keep every product experience
              consistent and efficient. It provides reusable components, clear
              guidelines, and scalable patterns that help teams design and ship
              faster. As the product grows, the system grows with it without
              losing clarity or quality.
            </StaggerRevealText>
          </div>

          <Banner imgUrl="/webps/bulvds/bulvdsDesign.jpg" />
        </div>

        {/*Social Identity */}
        <div className="flex-col-50">
          <div className="flex-col-32">
            <H2>Building a Consistent Social Identity</H2>
            <StaggerRevealText className="text-[var(--color-text-gray)]">
              These designs translate the Bulvds brand into engaging,
              easy-to-digest content—balancing clarity, trust, and visual appeal
              for a real estate audience.
            </StaggerRevealText>
          </div>

          <Banner imgUrl="/webps/bulvds/bulvdsSocialIdentity.jpg" />
        </div>

        {/* Design brand */}
        <div className="flex-col-50">
          <div className="flex-col-32">
            <H2>Defining the Bulvds Brand</H2>
            <StaggerRevealText className="text-[var(--color-text-gray)]">
              The brand guidelines capture the essence of Bulvds and translating
              its values into a cohesive visual language that stays consistent
              across every interaction.
            </StaggerRevealText>
          </div>

          <div className="image-gallery-flex">
            <Banner imgUrl="/webps/bulvds/bulvdsbrandgrid1.jpg" />

            <div>
              <Banner
                imgUrl="/webps/bulvds/bulvdsbrandgrid2.jpg"
                className="flex-1"
              />
              <Banner
                imgUrl="/webps/bulvds/bulvdsbrandgrid3.jpg"
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Next Project CTA */}
      <NextProjectCTA
        nextLink="/dotcampus"
        name="Bulvds"
        description="Making property search more conversational, personal, and
              effortless with AI."
      />
    </PageWrapper>
  );
}
