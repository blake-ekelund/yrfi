"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function GlobalNav() {
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleShare = async () => {
    const url = window.location.origin;

    if (navigator.share) {
      await navigator.share({
        title: "yrfi.io — Your Financial Independence",
        text: "Simple calculators that explain money clearly.",
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard");
    }
  };

  const closeMobile = () => setOpen(false);

  return (
    <>
      {/* TOP BAR */}
      <nav
        style={{
          background: "#36656B",
          color: "#F0F8A4",
          padding: "14px 18px",
          position: "sticky",
          top: 0,
          zIndex: 20,
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* LOGO */}
          <button
            onClick={() => router.push("/")}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              margin: 0,
              fontWeight: 600,
              color: "#F0F8A4",
              cursor: "pointer",
              fontSize: "inherit",
            }}
          >
            yrfi.io
          </button>

          {/* DESKTOP NAV (NO LINKS) */}
          {isDesktop && (
            <div style={{ display: "flex", gap: 28 }}>
              <button
                onClick={() => router.push("/calculators")}
                style={desktopNavItemStyle}
              >
                Calculators
              </button>
              <button
                onClick={() => router.push("/about")}
                style={desktopNavItemStyle}
              >
                About
              </button>
            </div>
          )}

          {/* MOBILE TOGGLE */}
          {!isDesktop && (
            <button
              onClick={() => setOpen(true)}
              style={{
                background: "transparent",
                border: "none",
                color: "#F0F8A4",
              }}
            >
              <Menu />
            </button>
          )}
        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {!isDesktop && open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "#36656B",
              color: "#F0F8A4",
              zIndex: 30,
              display: "flex",
              flexDirection: "column",
              padding: 20,
            }}
          >
            {/* HEADER */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Link
                href="/"
                onClick={closeMobile}
                style={{
                  fontWeight: 600,
                  color: "#F0F8A4",
                  textDecoration: "none",
                }}
              >
                yrfi.io
              </Link>

              <button
                onClick={closeMobile}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#F0F8A4",
                }}
              >
                <X />
              </button>
            </div>

            {/* CENTERED NAV */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 28,
                fontSize: 24,
              }}
            >
              <Link
                href="/calculators"
                onClick={closeMobile}
                style={{ color: "#F0F8A4", textDecoration: "none" }}
              >
                Calculators
              </Link>

              <Link
                href="/about"
                onClick={closeMobile}
                style={{ color: "#F0F8A4", textDecoration: "none" }}
              >
                About
              </Link>

              <button
                onClick={handleShare}
                style={{
                  marginTop: 12,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: "#F0F8A4",
                  color: "#36656B",
                  border: "none",
                  borderRadius: 999,
                  padding: "10px 18px",
                  fontSize: 16,
                  cursor: "pointer",
                }}
              >
                <Share2 size={18} />
                Share yrfi.io
              </button>
            </div>

            {/* FOOTER */}
            <div
              style={{
                borderTop: "1px solid rgba(240,248,164,0.3)",
                paddingTop: 16,
                textAlign: "center",
                fontSize: 13,
                opacity: 0.85,
              }}
            >
              <div style={{ marginBottom: 8 }}>
                <Link
                  href="/terms"
                  onClick={closeMobile}
                  style={{ color: "#F0F8A4", marginRight: 16 }}
                >
                  Terms
                </Link>
                <Link
                  href="/privacy"
                  onClick={closeMobile}
                  style={{ color: "#F0F8A4" }}
                >
                  Privacy
                </Link>
              </div>
              <div>© 2026 yrfi.io</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const desktopNavItemStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  padding: 0,
  margin: 0,
  color: "#F0F8A4",
  cursor: "pointer",
  fontSize: "inherit",
};
