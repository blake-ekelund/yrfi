"use client";

type DownloadExcelButtonProps<T extends object> = {
  endpoint: string;
  payload: T;
  filename: string;
  label?: string;
};

export function DownloadExcelButton<T extends object>({
  endpoint,
  payload,
  filename,
  label = "Download Excel",
}: DownloadExcelButtonProps<T>) {
  async function handleDownload() {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      alert("Failed to generate Excel file");
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    window.URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={handleDownload}
      style={{
        padding: "10px 16px",
        borderRadius: 8,
        border: "none",
        background: "#36656B",
        color: "#F0F8A4",
        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}
