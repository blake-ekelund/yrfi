export type CalculatorTag =
  | "Debt"
  | "Savings"
  | "Investing"
  | "Retirement";

export type Calculator = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  tags: CalculatorTag[];
  comingSoon?: boolean;
};
