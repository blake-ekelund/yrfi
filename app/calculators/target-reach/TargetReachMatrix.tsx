"use client";

import { useEffect, useState } from "react";
import { TargetReachMatrixMobile } from "./TargetReachMatrixMobile";
import { TargetReachMatrixDesktop } from "./TargetReachMatrixDesktop";

export function TargetReachMatrix(props: any) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isDesktop ? (
    <TargetReachMatrixDesktop {...props} />
  ) : (
    <TargetReachMatrixMobile {...props} />
  );
}
