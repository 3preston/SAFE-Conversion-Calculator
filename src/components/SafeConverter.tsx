"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus, X } from "lucide-react";

type SafeInput = {
  id: string;
  investorName: string;
  type: 'valuationCap' | 'mfn';
  valuationCap?: number;
  investmentAmount: number;
  companyValuation: number;
};

const SafeConverter = () => {
  const [safeInputs, setSafeInputs] = useState<SafeInput[]>([]);

  const addSafeInput = (type: SafeInput['type']) => {
    const newSafeInput: SafeInput = {
      id: Math.random().toString(36).substring(7),
      investorName: 'Investor Name',
      type,
      investmentAmount: 100000,
      companyValuation: 5000000,
    };
    if (type === 'valuationCap') {
      newSafeInput.valuationCap = 1000000;
    }
    setSafeInputs([...safeInputs, newSafeInput]);
  };

  const updateSafeInput = (id: string, updatedInput: Partial<SafeInput>) => {
    const newSafeInputs = safeInputs.map(safeInput =>
      safeInput.id === id ? { ...safeInput, ...updatedInput } : safeInput
    );
    setSafeInputs(newSafeInputs);
  };

  const removeSafeInput = (id: string) => {
    setSafeInputs(safeInputs.filter(safeInput => safeInput.id !== id));
  };

  const formatAsCurrency = (value: number | undefined) => {
    if (value === undefined) {
      return '';
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumberWithCommas = (value: number | undefined) => {
    if (value === undefined) {
      return '';
    }
    return value.toLocaleString('en-US');
  };

  const parseNumber = (value: string): number | undefined => {
    const parsed = Number(value.replace(/[^0-9.-]+/g, ''));
    return isNaN(parsed) ? undefined : parsed;
  };

  const calculateProjection = (safeInput: SafeInput) => {
    switch (safeInput.type) {
      case 'valuationCap':
        // Post-money SAFE: investmentAmount / valuationCap * (companyValuation + investmentAmount) / companyValuation * 100
        if (!safeInput.valuationCap || !safeInput.companyValuation) return 0;
        return (safeInput.investmentAmount / safeInput.valuationCap) * ((safeInput.companyValuation + safeInput.investmentAmount) / safeInput.companyValuation) * 100;
      case 'mfn':
        if (!safeInput.companyValuation) return 0;
        return (safeInput.investmentAmount / safeInput.companyValuation) * 100;
      default:
        return 0;
    }
  };

  return (
    <div className="container py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {safeInputs.map((safeInput) => (
          <Card key={safeInput.id} className="bg-card text-card-foreground shadow-md rounded-lg overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between p-4">
              <CardTitle className="text-lg font-semibold">{safeInput.type.toUpperCase()} SAFE</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => removeSafeInput(safeInput.id)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid gap-4">
                <Label htmlFor={`investorName-${safeInput.id}`}>Investor Name</Label>
                <Input
                  type="text"
                  id={`investorName-${safeInput.id}`}
                  value={safeInput.investorName}
                  onChange={(e) => updateSafeInput(safeInput.id, { investorName: e.target.value })}
                  className="bg-input border rounded-md focus:ring-accent focus:border-accent"
                />
                {safeInput.type === 'valuationCap' && (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor={`valuationCap-${safeInput.id}`}>Valuation Cap</Label>
                        <Input
                          type="text"
                          id={`valuationCap-${safeInput.id}`}
                          value={formatAsCurrency(safeInput.valuationCap)}
                          onChange={(e) => {
                            const parsedValue = parseNumber(e.target.value);
                            updateSafeInput(safeInput.id, { valuationCap: parsedValue });
                          }}
                          className="bg-input border rounded-md focus:ring-accent focus:border-accent"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`investmentAmount-${safeInput.id}`}>Investment Amount</Label>
                        <Input
                          type="text"
                          id={`investmentAmount-${safeInput.id}`}
                          value={formatAsCurrency(safeInput.investmentAmount)}
                          onChange={(e) => {
                            const parsedValue = parseNumber(e.target.value);
                            updateSafeInput(safeInput.id, { investmentAmount: parsedValue });
                          }}
                          className="bg-input border rounded-md focus:ring-accent focus:border-accent"
                        />
                      </div>
                    </div>
                    <Label htmlFor={`companyValuation-${safeInput.id}`}>Company Valuation at Conversion</Label>
                    <Input
                      type="text"
                      id={`companyValuation-${safeInput.id}`}
                      value={formatAsCurrency(safeInput.companyValuation)}
                      onChange={(e) => {
                            const parsedValue = parseNumber(e.target.value);
                            updateSafeInput(safeInput.id, { companyValuation: parsedValue });
                          }}
                      className="bg-input border rounded-md focus:ring-accent focus:border-accent"
                    />
                  </>
                )}
                {safeInput.type === 'mfn' && (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor={`investmentAmount-${safeInput.id}`}>Investment Amount</Label>
                        <Input
                          type="text"
                          id={`investmentAmount-${safeInput.id}`}
                          value={formatAsCurrency(safeInput.investmentAmount)}
                           onChange={(e) => {
                            const parsedValue = parseNumber(e.target.value);
                            updateSafeInput(safeInput.id, { investmentAmount: parsedValue });
                          }}
                          className="bg-input border rounded-md focus:ring-accent focus:border-accent"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`companyValuation-${safeInput.id}`}>Company Valuation at Conversion</Label>
                        <Input
                          type="text"
                          id={`companyValuation-${safeInput.id}`}
                          value={formatAsCurrency(safeInput.companyValuation)}
                           onChange={(e) => {
                            const parsedValue = parseNumber(e.target.value);
                            updateSafeInput(safeInput.id, { companyValuation: parsedValue });
                          }}
                          className="bg-input border rounded-md focus:ring-accent focus:border-accent"
                        />
                      </div>
                    </div>
                  </>
                )}
                <div className="text-right">
                  Projected Equity: {(calculateProjection(safeInput)).toFixed(2)}%
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="my-6" />

      <div className="flex justify-center space-x-4">
        <Button onClick={() => addSafeInput('valuationCap')} className="bg-accent text-accent-foreground hover:bg-accent-foreground hover:text-accent rounded-full">
          <Plus className="h-4 w-4 mr-2" /> Valuation Cap SAFE
        </Button>
        <Button onClick={() => addSafeInput('mfn')} className="bg-accent text-accent-foreground hover:bg-accent-foreground hover:text-accent rounded-full">
          <Plus className="h-4 w-4 mr-2" /> MFN SAFE
        </Button>
      </div>

      {safeInputs.length > 0 && (
        <>
          <Separator className="my-6" />
          <Card className="w-full max-w-3xl mx-auto bg-card text-card-foreground shadow-md rounded-lg overflow-hidden">
            <CardHeader className="p-4">
              <CardTitle className="text-xl font-semibold">Comparative Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-secondary text-secondary-foreground">
                      <th className="py-2 px-4 font-semibold text-left">Investor Name</th>
                      <th className="py-2 px-4 font-semibold text-left">SAFE Type</th>
                      <th className="py-2 px-4 font-semibold text-left">Projected Equity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {safeInputs.map((safeInput) => (
                      <tr key={safeInput.id} className="border-b">
                        <td className="py-2 px-4">{safeInput.investorName}</td>
                        <td className="py-2 px-4">{safeInput.type}</td>
                        <td className="py-2 px-4">{(calculateProjection(safeInput)).toFixed(2)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default SafeConverter;
