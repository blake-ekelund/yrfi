"use client";

import { useEffect, useState } from "react";
import { CalculatorsFiltersMobile } from "./CalculatorsFiltersMobile";
import { CalculatorsFiltersDesktop } from "./CalculatorsFiltersDesktop";
import type { CalculatorTag } from "./types";

type ViewMode = "grid" | "table";

export function CalculatorsFilters({
  search,
  setSearch,
  activeTag,
  setActiveTag,
  view,
  setView,
}: {
  search: string;
  setSearch: (v: string) => void;
  activeTag: CalculatorTag | null;
  setActiveTag: (v: CalculatorTag | null) => void;
  view: ViewMode;
  setView: (v: ViewMode) => void;
}) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isDesktop ? (
    <CalculatorsFiltersDesktop
      search={search}
      setSearch={setSearch}
      activeTag={activeTag}
      setActiveTag={setActiveTag}
    />
  ) : (
    <CalculatorsFiltersMobile
      search={search}
      setSearch={setSearch}
      view={view}
      setView={setView}
    />
  );
}
