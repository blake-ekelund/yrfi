// app/calculators/mortgage/math.ts

export type MortgageInput = {
  homePrice: number;
  downPayment: number;
  interestRate: number; // annual decimal (e.g. 0.0675)
  termYears: number;
};

export function calculateMortgage({
  homePrice,
  downPayment,
  interestRate,
  termYears,
}: MortgageInput) {
  const loanAmount = Math.max(homePrice - downPayment, 0);
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = termYears * 12;

  const monthlyPayment =
    loanAmount *
    (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1);

  let balance = loanAmount;
  const schedule: {
    month: number;
    principal: number;
    interest: number;
    balance: number;
  }[] = [];

  for (let month = 1; month <= totalMonths; month++) {
    const interest = balance * monthlyRate;
    const principal = monthlyPayment - interest;
    balance = Math.max(balance - principal, 0);

    schedule.push({
      month,
      principal,
      interest,
      balance,
    });
  }

  return {
    loanAmount,
    monthlyPayment,
    totalInterest: schedule.reduce(
      (sum, row) => sum + row.interest,
      0
    ),
    schedule,
  };
}
