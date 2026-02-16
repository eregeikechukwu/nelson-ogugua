import { AboutPage } from "@/components/pages/about";
import { PageWrapper } from "@/components/pages/pageWrapper";

export const metadata = {
  title: "About",
  description: "About me and my professional experience",
};

export default function About() {
  return (
    <PageWrapper>
      <AboutPage />
    </PageWrapper>
  );
}
