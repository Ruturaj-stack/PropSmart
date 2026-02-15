import { useState } from "react";
import { Slider } from "@/components/ui/slider";

interface ROICalculatorProps {
  propertyPrice: number;
  expectedRent?: number;
}

/**
 * ROI Calculator Component
 * Interactive calculator for investment returns
 */
const ROICalculator = ({
  propertyPrice,
  expectedRent = propertyPrice * 0.003,
}: ROICalculatorProps) => {
  const [downPayment, setDownPayment] = useState(20); // percentage
  const [loanTenure, setLoanTenure] = useState(20); // years
  const [interestRate, setInterestRate] = useState(8.5); // percentage
  const [monthlyRent, setMonthlyRent] = useState(expectedRent);

  // Calculations
  const downPaymentAmount = (propertyPrice * downPayment) / 100;
  const loanAmount = propertyPrice - downPaymentAmount;
  const monthlyInterest = interestRate / 12 / 100;
  const totalMonths = loanTenure * 12;
  const emi =
    (loanAmount *
      monthlyInterest *
      Math.pow(1 + monthlyInterest, totalMonths)) /
    (Math.pow(1 + monthlyInterest, totalMonths) - 1);

  const annualRent = monthlyRent * 12;
  const rentalYield = (annualRent / propertyPrice) * 100;
  const monthlyProfit = monthlyRent - emi;
  const annualROI = ((monthlyProfit * 12) / downPaymentAmount) * 100;

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="font-semibold text-lg text-card-foreground mb-6">
        💰 ROI Calculator
      </h3>

      <div className="space-y-6">
        {/* Down Payment */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-foreground">
              Down Payment
            </label>
            <span className="text-sm font-semibold text-accent">
              {downPayment}%
            </span>
          </div>
          <Slider
            value={[downPayment]}
            onValueChange={(value) => setDownPayment(value[0])}
            min={10}
            max={50}
            step={5}
          />
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>10%</span>
            <span>₹{(downPaymentAmount / 100000).toFixed(1)}L</span>
            <span>50%</span>
          </div>
        </div>

        {/* Loan Tenure */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-foreground">
              Loan Tenure
            </label>
            <span className="text-sm font-semibold text-accent">
              {loanTenure} years
            </span>
          </div>
          <Slider
            value={[loanTenure]}
            onValueChange={(value) => setLoanTenure(value[0])}
            min={5}
            max={30}
            step={5}
          />
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>5 yrs</span>
            <span>30 yrs</span>
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-foreground">
              Interest Rate
            </label>
            <span className="text-sm font-semibold text-accent">
              {interestRate}%
            </span>
          </div>
          <Slider
            value={[interestRate]}
            onValueChange={(value) => setInterestRate(value[0])}
            min={7}
            max={12}
            step={0.5}
          />
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>7%</span>
            <span>12%</span>
          </div>
        </div>

        {/* Monthly Rent */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-foreground">
              Expected Rent
            </label>
            <span className="text-sm font-semibold text-accent">
              ₹{(monthlyRent / 1000).toFixed(0)}k/mo
            </span>
          </div>
          <Slider
            value={[monthlyRent]}
            onValueChange={(value) => setMonthlyRent(value[0])}
            min={propertyPrice * 0.002}
            max={propertyPrice * 0.005}
            step={1000}
          />
        </div>

        {/* Results */}
        <div className="pt-4 border-t border-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Monthly EMI</span>
            <span className="font-semibold text-foreground">
              ₹{(emi / 1000).toFixed(1)}k
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Rental Yield</span>
            <span
              className={`font-semibold ${
                rentalYield >= 3
                  ? "text-green-600 dark:text-green-400"
                  : "text-orange-600 dark:text-orange-400"
              }`}
            >
              {rentalYield.toFixed(2)}% p.a.
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Monthly Cash Flow
            </span>
            <span
              className={`font-semibold ${
                monthlyProfit >= 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {monthlyProfit >= 0 ? "+" : ""}₹
              {(monthlyProfit / 1000).toFixed(1)}k
            </span>
          </div>

          <div className="rounded-lg bg-accent/10 p-4 mt-4">
            <div className="text-center">
              <div className="text-xs text-muted-foreground">
                Annual ROI on Investment
              </div>
              <div
                className={`text-2xl font-bold mt-1 ${
                  annualROI >= 5
                    ? "text-green-600 dark:text-green-400"
                    : annualROI >= 0
                      ? "text-orange-600 dark:text-orange-400"
                      : "text-red-600 dark:text-red-400"
                }`}
              >
                {annualROI >= 0 ? "+" : ""}
                {annualROI.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;
