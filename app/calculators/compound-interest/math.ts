export type YearResult = {
  year: number;
  startingValue: number;
  contributions: number;
  interestEarned: number;
  endingValue: number;
};

export function calculateCompoundGrowth({
  startingPortfolio,
  monthlyContribution,
  years,
  annualReturnRate,
}: {
  startingPortfolio: number;
  monthlyContribution: number;
  years: number;
  annualReturnRate: number;
}): YearResult[] {
  const results: YearResult[] = [];
  let portfolio = startingPortfolio;
  let cumulativeContributions = 0;
  let cumulativeInterest = 0;

  for (let year = 1; year <= years; year++) {
    const startingValue = portfolio;

    const yearlyContributions = monthlyContribution * 12;
    cumulativeContributions += yearlyContributions;
    portfolio += yearlyContributions;

    const interestEarned = portfolio * annualReturnRate;
    cumulativeInterest += interestEarned;
    portfolio += interestEarned;

    results.push({
      year,
      startingValue: Math.round(startingValue),
      contributions: Math.round(cumulativeContributions),
      interestEarned: Math.round(cumulativeInterest),
      endingValue: Math.round(portfolio),
    });
  }

  return results;
}
