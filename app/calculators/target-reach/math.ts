export type YearResult = {
  year: number;
  contributions: number;
  interestEarned: number;
  endingValue: number;
};

export function calculateYearsToTarget({
  targetAmount,
  startingAmount,
  monthlyContribution,
  annualReturnRate,
  maxYears = 100,
}: {
  targetAmount: number;
  startingAmount: number;
  monthlyContribution: number;
  annualReturnRate: number;
  maxYears?: number;
}): YearResult[] {
  const results: YearResult[] = [];
  let portfolio = startingAmount;
  let cumulativeContributions = 0;
  let cumulativeInterest = 0;

  for (let year = 1; year <= maxYears; year++) {
    const yearlyContributions = monthlyContribution * 12;
    cumulativeContributions += yearlyContributions;
    portfolio += yearlyContributions;

    const interest = portfolio * annualReturnRate;
    cumulativeInterest += interest;
    portfolio += interest;

    results.push({
      year,
      contributions: Math.round(cumulativeContributions),
      interestEarned: Math.round(cumulativeInterest),
      endingValue: Math.round(portfolio),
    });

    if (portfolio >= targetAmount) break;
  }

  return results;
}
