"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  formatCurrencyInput,
  formatPercentInput,
  parseNumber,
} from "../../lib/formatters";

export default function FireExample() {
  const [expensesInput, setExpensesInput] = useState("60,000");
  const [rateInput, setRateInput] = useState("4");
  const [showInfo, setShowInfo] = useState(false);

  const expenses = parseNumber(expensesInput);
  const rate = Number(rateInput.replace(/,/g, ""));

  const target =
    expenses && rate ? Math.round(expenses / (rate / 100)) : 0;

  return (
    <>
      <div
        style={{
          background: "#F0F8A4",
          padding: 24,
          borderRadius: 16,
          maxWidth: 520,
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {/* Annual Expenses */}
          <div>
            <label style={labelStyle}>Annual expenses</label>
            <div style={{ maxWidth: 180 }}>
              <input
                type="text"
                value={expensesInput}
                onChange={(e) =>
                  setExpensesInput(formatCurrencyInput(e.target.value))
                }
                inputMode="numeric"
                style={inputStyle}
                placeholder="75,000"
              />
            </div>
          </div>

          {/* Withdrawal Rate */}
          <div>
            <label style={labelStyle}>Withdrawal rate (%)</label>
            <div style={{ maxWidth: 120 }}>
              <input
                type="text"
                value={rateInput}
                onChange={(e) =>
                  setRateInput(formatPercentInput(e.target.value))
                }
                inputMode="decimal"
                style={inputStyle}
                placeholder="4"
              />
            </div>
          </div>

          {/* RESULT */}
          <div
            style={{
              paddingTop: 16,
              borderTop: "1px solid rgba(54,101,107,0.25)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 6,
              }}
            >
              <div style={{ fontSize: 14, opacity: 0.8 }}>
                Rough FIRE number
              </div>

              <button
                onClick={() => setShowInfo(true)}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  fontSize: 12,
                  color: "#36656B",
                  textDecoration: "underline",
                  cursor: "pointer",
                  opacity: 0.8,
                }}
              >
                What is this?
              </button>
            </div>

            <div style={{ fontSize: 28, fontWeight: 600 }}>
              {target ? `$${target.toLocaleString()}` : "—"}
            </div>
          </div>
        </div>
      </div>

      {/* FIRE INFO MODAL */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.4)",
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
            }}
            onClick={() => setShowInfo(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                background: "#fff",
                color: "#36656B",
                borderRadius: 16,
                padding: 24,
                maxWidth: 480,
                width: "100%",
                boxSizing: "border-box",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 style={{ marginTop: 0 }}>What is a FIRE number?</h3>

              <p style={{ lineHeight: 1.6 }}>
                A FIRE number is an estimate of how much money you would need
                invested so that your yearly expenses could be covered without
                relying on work income.
              </p>

              <p style={{ lineHeight: 1.6 }}>
                It’s commonly calculated by dividing annual spending by a
                withdrawal rate (often around 4%). The result isn’t a promise or
                guarantee — it’s a way to make the idea of financial independence
                concrete.
              </p>

              <p style={{ lineHeight: 1.6 }}>
                Think of it as a reference point, not a finish line.
              </p>

              <button
                onClick={() => setShowInfo(false)}
                style={{
                  marginTop: 16,
                  background: "#F0F8A4",
                  color: "#36656B",
                  border: "none",
                  borderRadius: 999,
                  padding: "10px 18px",
                  cursor: "pointer",
                  fontSize: 14,
                }}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: 6,
  fontSize: 14,
};

const inputStyle: React.CSSProperties = {
  padding: "12px 14px",
  borderRadius: 12,
  border: "none",
  fontSize: 16,
  color: "#36656B",
  background: "#fff",
};
