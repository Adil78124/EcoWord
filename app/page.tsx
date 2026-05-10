import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { ProblemsSection } from "@/components/sections/ProblemsSection";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { CtaSection } from "@/components/sections/CtaSection";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <StatsSection />
      <ProblemsSection />
      <SolutionsSection />
      <CtaSection />
    </main>
  );
}
