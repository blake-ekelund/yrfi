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

  const {
    template,
    startingPortfolio,
    monthlyContribution,
    years,
    annualReturnRate,
  } = body;

  if (template !== "compound-interest") {
    return NextResponse.json(
      { error: "Invalid template" },
      { status: 400 }
    );
  }

  if (
    typeof startingPortfolio !== "number" ||
    typeof monthlyContribution !== "number" ||
    typeof years !== "number" ||
    typeof annualReturnRate !== "number"
  ) {
    return NextResponse.json(
      { error: "Invalid input payload" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase.storage
    .from("templates")
    .download("Compound-Interest-Calculator-v1.0.0.xlsx");

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

  sheet.getCell("D8").value = startingPortfolio;
  sheet.getCell("D9").value = monthlyContribution;
  sheet.getCell("D10").value = annualReturnRate;
  sheet.getCell("D11").value = years;

  const outputBuffer = await workbook.xlsx.writeBuffer();

  return new NextResponse(outputBuffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition":
        'attachment; filename="Compound-Interest-Calculator-v1.0.0.xlsx"',
    },
  });
}
