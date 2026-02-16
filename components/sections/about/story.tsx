import { Button } from "@/components/secondary/button";
import { aboutStoryData } from "@/utils/about-data";

export function StorySection() {
  const paragraphs = aboutStoryData.split("\n\n").map((paragraph, index) => (
    <div key={index} className="">
      {paragraph.split(" ").map((word, wordIndex) => (
        <span key={wordIndex} className="paragraph-text">
          <span className="fastword">{word}&nbsp;</span>
        </span>
      ))}
    </div>
  ));

  return (
    <div className="flex-col-50">
      {/* heading */}
      <div className="line-reveal-container ">
        <h2 data-text="My Professional Journey" className="normalText line">
          My Professional Journey
        </h2>
      </div>

      {/* paragraphs */}
      <div className="add-margin-not-last fast-stagger-reveal-container ">
        {paragraphs}
      </div>

      <div className="center-content md:!mt-0 mt-20">
        <Button
          width="w-auto"
          padding="!px-[1.25rem]"
          takeMeOut
          link="/Nelson_Ogugua CV.pdf"
        >
          View my CV
        </Button>
      </div>
    </div>
  );
}
