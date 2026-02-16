import { ContactForm } from "@/components/pages/contactForm";
import { PageWrapper } from "@/components/pages/pageWrapper";

const paragraph =
  "Open to freelance projects, collaborations, and full time roles. Reach out and let’s see how we can work together.";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <PageWrapper>
      <main className="container max-md:!pt-[1.5rem] flex flex-col md:flex-row gap-[2rem] md:gap-[7.25rem] justify-between">
        {/* WRitings */}
        <div className="max-w-[22.625rem] w-auto flex flex-col gap-[1.75rem] md:gap-[2.5rem]">
          <div className="line-reveal-container">
            <h1
              data-text="Let's Work Together"
              className="line mediumText !leading-[1.17]"
            >
              Let&apos;s Work Together
            </h1>
          </div>

          <div className="stagger-reveal-container">
            {paragraph.split(" ").map((word, index) => (
              <span key={index} className="paragraph-175">
                <span key={index} className="word ">
                  {word}&nbsp;
                </span>
              </span>
            ))}
          </div>
        </div>

        <ContactForm />
      </main>
    </PageWrapper>
  );
}
