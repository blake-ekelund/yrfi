"use client";

import { useEffect, useState } from "react";
import { ManagementFeesMatrixMobile } from "./ManagementFeesMatrixMobile";
import { ManagementFeesMatrixDesktop } from "./ManagementFeesMatrixDesktop";

export function ManagementFeesMatrix(props: any) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isDesktop ? (
    <ManagementFeesMatrixDesktop {...props} />
  ) : (
    <ManagementFeesMatrixMobile {...props} />
  );
}
