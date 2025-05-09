"use client";

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type SafeMFNProps = {
  investmentAmount: number;
  companyValuation: number;
  setProjection: (projection: number | null) => void;
  onInvestmentAmountChange: (value: number) => void;
  onCompanyValuationChange: (value: number) => void;
};

const SafeMFN = ({
  investmentAmount,
  companyValuation,
  setProjection,
  onInvestmentAmountChange,
  onCompanyValuationChange,
}: SafeMFNProps) => {

  const calculateProjection = () => {
    // Placeholder for MFN logic - requires more details on implementation
    const projection = (investmentAmount / companyValuation) * 100;
    setProjection(projection);
  };

  return (
    <div className="grid gap-4">
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
      <Button onClick={calculateProjection} className="bg-accent text-accent-foreground">
        Calculate Projection
      </Button>
    </div>
  );
};

export default SafeMFN;
