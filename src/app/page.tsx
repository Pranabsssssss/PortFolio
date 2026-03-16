import React from "react";
import HeroSection from "@/components/home/HeroSection";
import AboutPreview from "@/components/home/AboutPreview";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import SkillsSection from "@/components/home/SkillsSection";
import AchievementsPreview from "@/components/home/AchievementsPreview";
import SupportContactPreview from "@/components/home/SupportContactPreview";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <AboutPreview />
      <FeaturedProjects />
      <SkillsSection />
      <AchievementsPreview />
      <SupportContactPreview />
    </div>
  );
}
