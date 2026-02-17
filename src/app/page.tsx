import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";
import { SmoothScrollWrapper } from "@/components/landing/SmoothScrollWrapper";
import { ScrollProgress } from "@/components/landing/ScrollProgress";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <SmoothScrollWrapper>
        <main>
          <Hero />
          <Features />
          <HowItWorks />
          <CTA />
        </main>
        <Footer />
      </SmoothScrollWrapper>
    </>
  );
}
