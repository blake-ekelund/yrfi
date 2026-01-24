export type YearResult = {
  year: number; // may now be fractional
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

  let previousPortfolio = portfolio;

  for (let year = 1; year <= maxYears; year++) {
    previousPortfolio = portfolio;

    const yearlyContributions = monthlyContribution * 12;
    cumulativeContributions += yearlyContributions;
    portfolio += yearlyContributions;

    const interest = portfolio * annualReturnRate;
    cumulativeInterest += interest;
    portfolio += interest;

    let effectiveYear = year;

    // 🔑 interpolate final year
    if (portfolio >= targetAmount) {
      const delta = portfolio - previousPortfolio;
      const needed = targetAmount - previousPortfolio;

      const fractionOfYear =
        delta > 0 ? needed / delta : 1;

      effectiveYear = year - 1 + fractionOfYear;

      results.push({
        year: Number(effectiveYear.toFixed(2)),
        contributions: Math.round(cumulativeContributions),
        interestEarned: Math.round(cumulativeInterest),
        endingValue: Math.round(portfolio),
      });

      break;
    }

    results.push({
      year,
      contributions: Math.round(cumulativeContributions),
      interestEarned: Math.round(cumulativeInterest),
      endingValue: Math.round(portfolio),
    });
  }

  return results;
}
