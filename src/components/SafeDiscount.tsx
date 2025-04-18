"use client";

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type SafeDiscountProps = {
  discountRate?: number;
  investmentAmount: number;
  companyValuation: number;
  setProjection: (projection: number | null) => void;
  onDiscountRateChange: (value: number) => void;
  onInvestmentAmountChange: (value: number) => void;
  onCompanyValuationChange: (value: number) => void;
};

const SafeDiscount = ({
  discountRate = 0.2,
  investmentAmount,
  companyValuation,
  setProjection,
  onDiscountRateChange,
  onInvestmentAmountChange,
  onCompanyValuationChange,
}: SafeDiscountProps) => {

  const calculateProjection = () => {
    const discountedValuation = companyValuation * (1 - discountRate);
    const projection = (investmentAmount / discountedValuation) * 100;
    setProjection(projection);
  };

  return (
    <div className="grid gap-4">
      <div>
        <Label htmlFor="discountRate">Discount Rate</Label>
        <Input
          type="number"
          id="discountRate"
          value={discountRate}
          onChange={(e) => onDiscountRateChange(Number(e.target.value))}
        />
      </div>
      <div>
        <Label htmlFor="investmentAmount">Investment Amount</Label>
        <Input
          type="number"
          id="investmentAmount"
          value={investmentAmount}
          onChange={(e) => onInvestmentAmountChange(Number(e.target.value))}
        />
      </div>
      <div>
        <Label htmlFor="companyValuation">Company Valuation at Conversion</Label>
        <Input
          type="number"
          id="companyValuation"
          value={companyValuation}
          onChange={(e) => onCompanyValuationChange(Number(e.target.value))}
        />
      </div>
      <Button onClick={calculateProjection}  className="bg-accent text-accent-foreground">
        Calculate Projection
      </Button>
    </div>
  );
};

export default SafeDiscount;
