export type IncomeFrequency =
  | "Daily"
  | "Weekly"
  | "Every 2 Weeks"
  | "Twice a Month"
  | "Monthly"
  | "Quarterly"
  | "Annually";

export type IncomeItem = {
  id: string;
  source: string;
  frequency: IncomeFrequency;
  nextDate: string; // ISO date
  amount: string;   // text input, parsed later
};

export type ExpenseFrequency =
  | "Daily"
  | "Weekly"
  | "Every 2 Weeks"
  | "Twice a Month"
  | "Monthly"
  | "Quarterly"
  | "Annually";

export type ExpenseCategory =
  | "Housing"
  | "Utilities"
  | "Food"
  | "Transportation"
  | "Insurance"
  | "Subscriptions"
  | "Healthcare"
  | "Debt"
  | "Other";

export type ExpenseItem = {
  id: string;
  name: string;
  category: ExpenseCategory;
  frequency: ExpenseFrequency;
  nextDate: string;
  amount: string; // text input
};
