import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import ExcelJS from "exceljs";

const supabaseUrl = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  throw new Error("Missing Supabase env vars");
}

const supabase = createClient(supabaseUrl, serviceKey);

export async function POST(req: Request) {
  const body = await req.json();
  const { template } = body;

  if (!template) {
    return NextResponse.json(
      { error: "Missing template type" },
      { status: 400 }
    );
  }

  /* =========================
     TEMPLATE CONFIG
  ========================= */

  let fileName = "";
  let populate: (sheet: ExcelJS.Worksheet) => void;

  /* ---------- Compound Interest ---------- */
  if (template === "compound-interest") {
    const {
      startingPortfolio,
      monthlyContribution,
      years,
      annualReturnRate,
    } = body;

    if (
      typeof startingPortfolio !== "number" ||
      typeof monthlyContribution !== "number" ||
      typeof years !== "number" ||
      typeof annualReturnRate !== "number"
    ) {
      return NextResponse.json(
        { error: "Invalid compound-interest payload" },
        { status: 400 }
      );
    }

    fileName = "Compound-Interest-Calculator-v1.0.0.xlsx";

    populate = (sheet) => {
      sheet.getCell("D8").value = startingPortfolio;
      sheet.getCell("D9").value = monthlyContribution;
      sheet.getCell("D10").value = annualReturnRate;
      sheet.getCell("D11").value = years;
    };
  }

  /* ---------- Mortgage ---------- */
  else if (template === "mortgage") {
    const {
      homePrice,
      downPayment,
      interestRate,
      termYears,
    } = body;

    if (
      typeof homePrice !== "number" ||
      typeof downPayment !== "number" ||
      typeof interestRate !== "number" ||
      typeof termYears !== "number"
    ) {
      return NextResponse.json(
        { error: "Invalid mortgage payload" },
        { status: 400 }
      );
    }

    fileName = "Mortgage-Calculator-v1.0.0.xlsx";

    populate = (sheet) => {
      sheet.getCell("D8").value = homePrice;
      sheet.getCell("D9").value = downPayment;
      sheet.getCell("D10").value = interestRate;
      sheet.getCell("D11").value = termYears;
    };
  }

  /* ---------- Unsupported ---------- */
  else {
    return NextResponse.json(
      { error: "Unsupported template" },
      { status: 400 }
    );
  }

  /* =========================
     LOAD TEMPLATE
  ========================= */

  const { data, error } = await supabase.storage
    .from("templates")
    .download(fileName);

  if (error || !data) {
    return NextResponse.json(
      { error: "Failed to download template" },
      { status: 500 }
    );
  }

  const workbook = new ExcelJS.Workbook();
  const buffer = await data.arrayBuffer();
  await workbook.xlsx.load(buffer);

  const sheet = workbook.getWorksheet(1);
  if (!sheet) {
    return NextResponse.json(
      { error: "Worksheet not found" },
      { status: 500 }
    );
  }

  /* =========================
     POPULATE & RETURN
  ========================= */

  populate(sheet);

  const outputBuffer = await workbook.xlsx.writeBuffer();

  return new NextResponse(outputBuffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition":
        `attachment; filename="${fileName}"`,
    },
  });
}
