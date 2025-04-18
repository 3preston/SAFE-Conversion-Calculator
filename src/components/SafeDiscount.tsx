"use client";

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type SafeDiscountProps = {
  setProjection: (projection: number | null) => void;
};

const SafeDiscount = ({ setProjection }: SafeDiscountProps) => {
  const [discountRate, setDiscountRate] = useState<number>(0.2);
  const [investmentAmount, setInvestmentAmount] = useState<number>(100000);
  const [companyValuation, setCompanyValuation] = useState<number>(5000000);

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
          onChange={(e) => setDiscountRate(Number(e.target.value))}
        />
      </div>
      <div>
        <Label htmlFor="investmentAmount">Investment Amount</Label>
        <Input
          type="number"
          id="investmentAmount"
          value={investmentAmount}
          onChange={(e) => setInvestmentAmount(Number(e.target.value))}
        />
      </div>
      <div>
        <Label htmlFor="companyValuation">Company Valuation at Conversion</Label>
        <Input
          type="number"
          id="companyValuation"
          value={companyValuation}
          onChange={(e) => setCompanyValuation(Number(e.target.value))}
        />
      </div>
      <Button onClick={calculateProjection}  className="bg-accent text-accent-foreground">
        Calculate Projection
      </Button>
    </div>
  );
};

export default SafeDiscount;
