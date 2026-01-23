"use client";

import { useEffect, useState } from "react";
import { GrowthChartDesktop } from "./GrowthChartDesktop";
import { GrowthChartMobile } from "./GrowthChartMobile";

export function GrowthChart({ results }: { results: any[] }) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: isDesktop ? 340 : 260,
      }}
    >
      {isDesktop ? (
        <GrowthChartDesktop results={results} />
      ) : (
        <GrowthChartMobile results={results} />
      )}
    </div>
  );
}
