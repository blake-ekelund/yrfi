// math.ts

export function calculateFireNumber({
  annualSpending,
  withdrawalRate,
}: {
  annualSpending: number;
  withdrawalRate: number;
}) {
  if (withdrawalRate <= 0) return 0;

  return annualSpending / withdrawalRate;
}
