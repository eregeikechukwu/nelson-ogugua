import { Button } from "@/components/secondary/button";
import { Title } from "@/components/secondary/title";

export function ProjectHeading({
  title,
  descriptionList,
  paragraph,
}: {
  title: string;
  descriptionList: { title: string; text: string }[];
  paragraph: string;
}) {
  return (
    <div className="container flex justify-between">
      {/* Head and list */}
      <div className="md:max-w-[25.56rem] md:gap-[2.5rem] flex flex-col gap-[1.5rem]">
        <div className="line-reveal-container">
          <h1 data-text="Dot Campus" className="line mediumNormalText">
            {title}
          </h1>
        </div>

        {/* Roles list */}
        <ul className="slide-in-container flex flex-col md:gap-[1rem]">
          {descriptionList.map((item) => (
            <li key={item.title} className="slide uppercase">
              <Title>
                <span>{item.title}: </span>
                <span className="font-normal leading-[1.6] text-[var(--color-text-gray)]">
                  {item.text}
                </span>
              </Title>
            </li>
          ))}
        </ul>
      </div>

      {/* Paragraph */}
      <div className="md:max-w-[27.2rem] flex flex-col gap-[2.5rem]">
        <div className="stagger-reveal-container add-margin-not-last">
          {paragraph.split("\n\n").map((item, i) => (
            <div key={i}>
              {item.split(" ").map((word, wordIndex) => (
                <span
                  key={`div-${i}-${wordIndex}`}
                  className="text-[var(--color-text-gray)]"
                >
                  <span
                    key={`span-${i}-${wordIndex}`}
                    className="word paragraph-text"
                  >
                    {word}&nbsp;
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Button */}
        <Button variant="dark">View live site</Button>
      </div>
    </div>
  );
}
