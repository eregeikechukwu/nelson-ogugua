"use client";

import { PageWrapper } from "@/components/pages/pageWrapper";
import { H2 } from "@/components/typography/h2";
import { StaggerRevealText } from "@/components/typography/text-reveal";
import { RotatingSVG } from "@/components/secondary/rotatingSVG";

export function ComingSoon({ projectName }: { projectName: string }) {
  return (
    <PageWrapper>
      <section className="w-screen px-[0.3rem] md:!px-0 py-[3rem] md:!py-[4rem] flex flex-col items-center justify-center min-h-[80vh] relative">
        {/* Background accent */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute right-0 top-0 h-[24rem] w-[24rem] rounded-full bg-[var(--color-yellow)] opacity-10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-[24rem] w-[24rem] rounded-full bg-[var(--color-yellow)] opacity-10 blur-3xl" />
          <div className="absolute left-[50%] top-[50%] transform -translate-x-[50%] -translate-y-[50%] h-[32rem] w-[32rem] rounded-full bg-[var(--color-yellow)] opacity-5 blur-3xl" />
        </div>

        <div className="flex flex-col items-center gap-[3rem] text-center max-w-[40rem] z-10">
          {/* Rotating SVG */}
          <div className="w-[6rem] h-auto md:w-[11.375rem] popOut">
            <RotatingSVG />
          </div>

          {/* Status indicator */}
          <div className=" justify-center inline-flex items-center gap-[0.5rem] rounded-full bg-[var(--background)] !px-[1rem] !py-[0.5rem] border border-[var(--color-gray-transparent)] shadow-lg">
            <span className="inline-block h-[0.5rem] w-[0.5rem] rounded-full bg-[var(--color-yellow)] animate-pulse" />
            <span className="text-[0.75rem] font-medium translate-y-[2px] text-[var(--foreground)]">
              Details Coming Soon
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-[1.5rem]">
            <h1 className="largeText line" data-text={projectName}>
              {projectName}
            </h1>
            <StaggerRevealText className="text-[var(--color-text-gray)] text-[1.125rem] leading-[1.7]">
              This project is being prepared for showcase. We&apos;re crafting
              an exceptional case study that highlights the design process,
              challenges overcome, and innovative solutions implemented.
            </StaggerRevealText>
          </div>

          {/* Description */}
          <div className="space-y-[1rem]  py-[2.5rem] w-full">
            <StaggerRevealText className="text-[var(--color-text-gray)] text-[0.875rem]">
              Details, case study, and process are being organized with
              meticulous care.
            </StaggerRevealText>
            <StaggerRevealText className="text-[var(--color-light-gray)] text-[0.75rem]">
              Check back soon to see the full story behind this exciting
              project.
            </StaggerRevealText>
          </div>

          {/* Call to action */}
          <div className="pt-[1rem]">
            <StaggerRevealText className="text-[var(--color-light-gray)] text-[0.875rem]">
              In the meantime, explore other projects in my portfolio.
            </StaggerRevealText>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
