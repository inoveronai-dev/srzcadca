import { ClubRacesSection } from "@/components/home/ClubRacesSection";
import { ContactSection } from "@/components/home/ContactSection";
import { HatcherySection } from "@/components/home/HatcherySection";
import { Hero } from "@/components/home/Hero";
import { NewsSection } from "@/components/home/NewsSection";
import { PermitsSection } from "@/components/home/PermitsSection";
import { QuickTiles } from "@/components/home/QuickTiles";
import { WatersSection } from "@/components/home/WatersSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickTiles />
      <NewsSection />
      <WatersSection />
      <PermitsSection />
      <HatcherySection />
      <ClubRacesSection />
      <ContactSection />
    </>
  );
}
