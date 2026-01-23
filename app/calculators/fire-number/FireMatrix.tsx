"use client";

import { useEffect, useState } from "react";
import { FireMatrixMobile } from "./FireMatrixMobile";
import { FireMatrixDesktop } from "./FireMatrixDesktop";

export function FireMatrix({
  annualSpending,
  withdrawalRate,
}: {
  annualSpending: number;
  withdrawalRate: number;
}) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isDesktop ? (
    <FireMatrixDesktop
      annualSpending={annualSpending}
      withdrawalRate={withdrawalRate}
    />
  ) : (
    <FireMatrixMobile
      annualSpending={annualSpending}
      withdrawalRate={withdrawalRate}
    />
  );
}
