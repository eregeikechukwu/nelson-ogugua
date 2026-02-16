import { aboutIntroData } from "@/utils/about-data";

export function IntroSection() {
  return (
    <div className="flex-col-50">
      <div className="line-reveal-container">
        <h2 data-text="About Me" className="normalText line">
          About Me
        </h2>
      </div>

      <div className="stagger-reveal-container">
        {aboutIntroData.split(" ").map((word, index) => (
          <span key={index} className="paragraph-text">
            <span className="word">{word}&nbsp;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
