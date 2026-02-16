import { PageWrapper } from "@/components/pages/pageWrapper";
import { SelectedWorksGallery } from "@/components/sections/works/gallery";

export const metadata = {
  title: "Works",
  description: "Nelson Ogugua's flagship projects",
};

const title =
  "A selection of projects that reflect my approach to design, from early thinking to final outcomes across product and brand work.";

export default function SelectedWorks() {
  return (
    <PageWrapper>
      <div>
        <div className="flex flex-col gap-[1.5rem] md:gap-[2.5rem] items-center justify-center container max-md:!pt-[1.5rem] !pb-0">
          <div className="line-reveal-container ">
            <h1 data-text="Selected Works" className="line mediumText">
              Selected Works
            </h1>
          </div>

          <div className="stagger-reveal-container max-w-[42.625rem] text-center">
            {title.split(" ").map((word, index) => (
              <span
                key={index}
                className="inline-block paragraph-text  text-[var(--color-text-gray)]"
              >
                <span className="word">{word}&nbsp;</span>
              </span>
            ))}
          </div>
        </div>

        <div className="container max-md:!pt-[2.5rem]">
          <SelectedWorksGallery />
        </div>
      </div>
    </PageWrapper>
  );
}
