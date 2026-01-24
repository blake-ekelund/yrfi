"use client";

import { useEffect, useState } from "react";
import { TableViewDesktop } from "./TableViewDesktop";
import { TableViewMobile } from "./TableViewMobile";
import type { Calculator } from "../components/types";

export function TableView({
  calculators,
}: {
  calculators: Calculator[];
}) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isDesktop ? (
    <TableViewDesktop calculators={calculators} />
  ) : (
    <TableViewMobile calculators={calculators} />
  );
}
