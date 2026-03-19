import React from "react";
import HeroSection from "@/components/home/HeroSection";
import AboutPreview from "@/components/home/AboutPreview";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import TechStack from "@/components/home/TechStack";
import AchievementsPreview from "@/components/home/AchievementsPreview";
import SupportContactPreview from "@/components/home/SupportContactPreview";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <AboutPreview />
      <FeaturedProjects />
      <TechStack />
      <AchievementsPreview />
      <Testimonials />
      <SupportContactPreview />
    </div>
  );
}
