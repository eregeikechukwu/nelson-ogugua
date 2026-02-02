import { aboutStoryData } from "@/utils/about-data";

export function StorySection() {
  const paragraphs = aboutStoryData.split("\n\n").map((paragraph, index) => (
    <div key={index} className="stagger-reveal-container ">
      {paragraph.split(" ").map((word, wordIndex) => (
        <span key={wordIndex} className="paragraph-175">
          <span className="word">{word}&nbsp;</span>
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
      <div className="add-margin-not-last">{paragraphs}</div>
    </div>
  );
}
