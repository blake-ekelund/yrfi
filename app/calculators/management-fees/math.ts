// math.ts

export function calculateManagementFeeDrag({
  startingPortfolio,
  annualFeeRate,
  annualReturnRate,
  years,
}: {
  startingPortfolio: number;
  annualFeeRate: number;
  annualReturnRate: number;
  years: number;
}) {
  let portfolioWithFees = startingPortfolio;
  let portfolioWithoutFees = startingPortfolio;

  let cumulativeFeesPaid = 0;
  let cumulativeOpportunityCost = 0;

  const results = [];

  for (let year = 1; year <= years; year++) {
    // Baseline (no fees)
    portfolioWithoutFees *= 1 + annualReturnRate;

    // With fees
    const beforeFee = portfolioWithFees * (1 + annualReturnRate);
    const fee = beforeFee * annualFeeRate;
    const afterFee = beforeFee - fee;

    cumulativeFeesPaid += fee;

    const remainingYears = years - year;
    const missedGrowth =
      fee * Math.pow(1 + annualReturnRate, remainingYears);

    cumulativeOpportunityCost += missedGrowth;

    results.push({
      year,
      withFees: afterFee,
      withoutFees: portfolioWithoutFees,
      feesPaid: cumulativeFeesPaid,
      opportunityCost: cumulativeOpportunityCost,
    });

    portfolioWithFees = afterFee;
  }

  return results;
}
