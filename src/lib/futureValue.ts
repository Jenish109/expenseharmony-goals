
/**
 * Calculate future value of an amount
 * @param principal Initial amount
 * @param rate Annual interest rate (as a decimal, e.g., 0.08 for 8%)
 * @param time Time in years
 * @param compoundingFrequency How often to compound (1 = annually, 12 = monthly, 365 = daily)
 * @returns Future value of the investment
 */
export function calculateFutureValue(
  principal: number,
  rate: number,
  time: number,
  compoundingFrequency: number = 12
): number {
  // Future Value = P(1 + r/n)^(nt)
  // Where P = principal, r = rate, n = compounding frequency, t = time in years
  const n = compoundingFrequency;
  const r = rate;
  const t = time;
  const futureValue = principal * Math.pow(1 + r / n, n * t);
  return futureValue;
}

/**
 * Calculate how many hours of work an expense represents
 * @param expense Amount spent
 * @param hourlyRate User's hourly rate
 * @returns Hours of work required
 */
export function calculateWorkHours(expense: number, hourlyRate: number): number {
  if (hourlyRate <= 0) return 0;
  return expense / hourlyRate;
}

/**
 * Calculate how long a goal will be delayed by an expense
 * @param expense Amount spent
 * @param monthlySavings How much user saves per month
 * @returns Number of months delayed
 */
export function calculateGoalDelay(expense: number, monthlySavings: number): number {
  if (monthlySavings <= 0) return 0;
  return expense / monthlySavings;
}

/**
 * Calculate monthly payment needed to reach a goal
 * @param goalAmount Target amount
 * @param years Years to reach goal
 * @param rate Annual interest rate (as a decimal)
 * @returns Monthly payment required
 */
export function calculateMonthlyPayment(goalAmount: number, years: number, rate: number): number {
  // PMT = (PV * r * (1 + r)^n) / ((1 + r)^n - 1)
  const monthlyRate = rate / 12;
  const numPayments = years * 12;
  const denominator = Math.pow(1 + monthlyRate, numPayments) - 1;
  
  if (denominator === 0 || rate === 0) {
    // Simple division for 0% interest
    return goalAmount / numPayments;
  }
  
  const numerator = goalAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments);
  return numerator / denominator;
}
