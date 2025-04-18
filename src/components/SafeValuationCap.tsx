"use client";

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type SafeValuationCapProps = {
  valuationCap?: number;
  investmentAmount: number;
  companyValuation: number;
  setProjection: (projection: number | null) => void;
  onValuationCapChange: (value: number) => void;
  onInvestmentAmountChange: (value: number) => void;
  onCompanyValuationChange: (value: number) => void;
};

const SafeValuationCap = ({
  valuationCap = 1000000,
  investmentAmount,
  companyValuation,
  setProjection,
  onValuationCapChange,
  onInvestmentAmountChange,
  onCompanyValuationChange,
}: SafeValuationCapProps) => {

  const calculateProjection = () => {
    const projection = (investmentAmount / valuationCap) * 100;
    setProjection(projection);
  };

  return (
    <div className="grid gap-4">
      <div>
        <Label htmlFor="valuationCap">Valuation Cap</Label>
        <Input
          type="number"
          id="valuationCap"
          value={valuationCap}
          onChange={(e) => onValuationCapChange(Number(e.target.value))}
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
      <Button onClick={calculateProjection} className="bg-accent text-accent-foreground">
        Calculate Projection
      </Button>
    </div>
  );
};

export default SafeValuationCap;
