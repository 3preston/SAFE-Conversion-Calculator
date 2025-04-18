"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SafeValuationCap from './SafeValuationCap';
import SafeDiscount from './SafeDiscount';
import SafeMFN from './SafeMFN';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

type SafeInput = {
  type: 'valuationCap' | 'discount' | 'mfn';
  valuationCap?: number;
  discountRate?: number;
  investmentAmount: number;
  companyValuation: number;
};

const SafeConverter = () => {
  const [safeInputs, setSafeInputs] = useState<SafeInput[]>([
    { type: 'valuationCap', investmentAmount: 100000, companyValuation: 5000000, valuationCap: 1000000 },
    { type: 'discount', investmentAmount: 100000, companyValuation: 5000000, discountRate: 0.2 },
    { type: 'mfn', investmentAmount: 100000, companyValuation: 5000000 },
  ]);

  const [valuationCapProjection, setValuationCapProjection] = useState<number | null>(null);
  const [discountProjection, setDiscountProjection] = useState<number | null>(null);
  const [mfnProjection, setMfnProjection] = useState<number | null>(null);

  const addSafeInput = (type: SafeInput['type']) => {
    const newSafeInput: SafeInput = { type, investmentAmount: 100000, companyValuation: 5000000 };
    if (type === 'valuationCap') {
      newSafeInput.valuationCap = 1000000;
    } else if (type === 'discount') {
      newSafeInput.discountRate = 0.2;
    }
    setSafeInputs([...safeInputs, newSafeInput]);
  };

  const updateSafeInput = (index: number, updatedInput: Partial<SafeInput>) => {
    const newSafeInputs = [...safeInputs];
    newSafeInputs[index] = { ...newSafeInputs[index], ...updatedInput };
    setSafeInputs(newSafeInputs);
  };

  const calculateProjection = (safeInput: SafeInput) => {
    switch (safeInput.type) {
      case 'valuationCap':
        return (safeInput.investmentAmount / (safeInput.valuationCap || 1)) * 100;
      case 'discount':
        return (safeInput.investmentAmount / (safeInput.companyValuation * (1 - (safeInput.discountRate || 0)))) * 100;
      case 'mfn':
        return (safeInput.investmentAmount / safeInput.companyValuation) * 100;
      default:
        return 0;
    }
  };

  return (
    <div className="container py-10">
      {safeInputs.map((safeInput, index) => (
        <Card key={index} className="w-[400px] mb-4">
          <CardHeader>
            <CardTitle>SAFE Type: {safeInput.type}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {safeInput.type === 'valuationCap' && (
              <SafeValuationCap
                valuationCap={safeInput.valuationCap}
                investmentAmount={safeInput.investmentAmount}
                companyValuation={safeInput.companyValuation}
                onValuationCapChange={(value) => updateSafeInput(index, { valuationCap: value })}
                onInvestmentAmountChange={(value) => updateSafeInput(index, { investmentAmount: value })}
                onCompanyValuationChange={(value) => updateSafeInput(index, { companyValuation: value })}
                setProjection={(projection) => {
                  setValuationCapProjection(projection);
                }}
              />
            )}
            {safeInput.type === 'discount' && (
              <SafeDiscount
                discountRate={safeInput.discountRate}
                investmentAmount={safeInput.investmentAmount}
                companyValuation={safeInput.companyValuation}
                onDiscountRateChange={(value) => updateSafeInput(index, { discountRate: value })}
                onInvestmentAmountChange={(value) => updateSafeInput(index, { investmentAmount: value })}
                onCompanyValuationChange={(value) => updateSafeInput(index, { companyValuation: value })}
                setProjection={(projection) => {
                  setDiscountProjection(projection);
                }}
              />
            )}
            {safeInput.type === 'mfn' && (
              <SafeMFN
                investmentAmount={safeInput.investmentAmount}
                companyValuation={safeInput.companyValuation}
                onInvestmentAmountChange={(value) => updateSafeInput(index, { investmentAmount: value })}
                onCompanyValuationChange={(value) => updateSafeInput(index, { companyValuation: value })}
                setProjection={(projection) => {
                  setMfnProjection(projection);
                }}
              />
            )}
            <div>
              <p>Projected Equity: {calculateProjection(safeInput).toFixed(2)}%</p>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={() => addSafeInput('valuationCap')} className="bg-accent text-accent-foreground">
        Add Valuation Cap SAFE
      </Button>
      <Button onClick={() => addSafeInput('discount')} className="bg-accent text-accent-foreground">
        Add Discount SAFE
      </Button>
      <Button onClick={() => addSafeInput('mfn')} className="bg-accent text-accent-foreground">
        Add MFN SAFE
      </Button>

      {safeInputs.length > 0 && (
        <Card className="w-[400px] mt-4">
          <CardHeader>
            <CardTitle>Comparative Summary</CardTitle>
          </CardHeader>
          <CardContent>
            {safeInputs.map((safeInput, index) => (
              <p key={index}>
                {safeInput.type}: {calculateProjection(safeInput).toFixed(2)}%
              </p>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SafeConverter;
