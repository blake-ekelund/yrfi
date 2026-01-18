"use client";

import HomeHero from "@/components/home/HomeHero";
import HomeWhatWeDo from "@/components/home/HomeWhatWeDo";
import HomeWhy from "@/components/home/HomeWhy";
import HomeNewsletter from "@/components/home/HomeNewsletter";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <main
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "80px 20px",
          color: "#36656B",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <HomeWhatWeDo />
        <HomeWhy />
        <HomeNewsletter />
      </main>
    </>
  );
}
