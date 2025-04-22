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
  type: 'Valuation Cap SAFE' | 'Discount SAFE';
  valuationCap?: number;
  discountRate?: number;
  investmentAmount: number;
};

const SafeConverter = () => {
  const [safeInputs, setSafeInputs] = useState<SafeInput[]>([]);
  const [equityFinancingValuation, setEquityFinancingValuation] = useState<number>(10000000);
  const [equityFinancingInvestment, setEquityFinancingInvestment] = useState<number>(5000000);
  const [companyValuation, setCompanyValuation] = useState<number>(1000000);
  const [totalShares, setTotalShares] = useState<number>(10000000);
  const [foundersShares, setFoundersShares] = useState<number>(2000000);
  const [employeeEquity, setEmployeeEquity] = useState<number>(1000000);

  const addSafeInput = (type: SafeInput['type']) => {
    const newSafeInput: SafeInput = {
      id: Math.random().toString(36).substring(7),
      investorName: `Investor ${safeInputs.length + 1}`,
      type,
      investmentAmount: 100000,
    };
    if (type === 'Valuation Cap SAFE') {
      newSafeInput.valuationCap = 1000000;
    } else if (type === 'Discount SAFE') {
      newSafeInput.discountRate = 20;
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

  const calculatePostMoneyEquity = (safeInput: SafeInput) => {
    if (!equityFinancingValuation || !equityFinancingInvestment || !companyValuation) {
      return 0;
    }

    let effectiveValuation: number;
    let postMoneyOwnership: number;

    if (safeInput.type === 'Valuation Cap SAFE' && safeInput.valuationCap !== undefined) {
      effectiveValuation = Math.min(equityFinancingValuation, safeInput.valuationCap);
      postMoneyOwnership = (safeInput.investmentAmount / effectiveValuation) * 100;
    } else if (safeInput.type === 'Discount SAFE' && safeInput.discountRate !== undefined) {
        effectiveValuation = equityFinancingValuation;
        postMoneyOwnership = (safeInput.investmentAmount / (equityFinancingValuation * (1 - (safeInput.discountRate / 100)))) * 100;
    }
    else {
      postMoneyOwnership = (safeInput.investmentAmount / equityFinancingValuation) * 100;
    }

    return postMoneyOwnership;
  };

  const calculateEquityFinancingOwnership = () => {
    return (equityFinancingInvestment / equityFinancingValuation) * 100;
  };

    // Calculate fully diluted shares
    const calculateFullyDilutedShares = () => {
        let safeShares = 0;
        safeInputs.forEach(safe => {
            let effectiveValuation: number;
            if (safe.type === 'Valuation Cap SAFE' && safe.valuationCap !== undefined) {
                effectiveValuation = Math.min(equityFinancingValuation, safe.valuationCap);
                safeShares += safe.investmentAmount / effectiveValuation;
            } else if (safe.type === 'Discount SAFE' && safe.discountRate !== undefined) {
                effectiveValuation = equityFinancingValuation * (1 - (safe.discountRate / 100));
                safeShares += safe.investmentAmount / effectiveValuation;
            } else {
                safeShares += safe.investmentAmount / equityFinancingValuation;
            }
        });

        const equityFinancingShares = equityFinancingInvestment / equityFinancingValuation;
        return totalShares + safeShares + equityFinancingShares;
    };

  return (
    <div className="container py-10">
      <Card className="w-full max-w-3xl mx-auto bg-card text-card-foreground shadow-md rounded-lg overflow-hidden mb-6">
        <CardHeader className="p-4">
          <CardTitle className="text-xl font-semibold">Equity Financing</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid gap-4">
          <Label htmlFor="totalShares">Total Shares</Label>
            <Input
              type="text"
              id="totalShares"
              value={formatNumberWithCommas(totalShares)}
              onChange={(e) => {
                const parsedValue = parseNumber(e.target.value);
                setTotalShares(parsedValue !== undefined ? parsedValue : 0);
              }}
              className="bg-input border rounded-md focus:ring-accent focus:border-accent"
            />
            <Label htmlFor="foundersShares">Founders Shares</Label>
            <Input
              type="text"
              id="foundersShares"
              value={formatNumberWithCommas(foundersShares)}
              onChange={(e) => {
                const parsedValue = parseNumber(e.target.value);
                setFoundersShares(parsedValue !== undefined ? parsedValue : 0);
              }}
              className="bg-input border rounded-md focus:ring-accent focus:border-accent"
            />
            <Label htmlFor="employeeEquity">Employee Equity</Label>
            <Input
              type="text"
              id="employeeEquity"
              value={formatNumberWithCommas(employeeEquity)}
              onChange={(e) => {
                const parsedValue = parseNumber(e.target.value);
                setEmployeeEquity(parsedValue !== undefined ? parsedValue : 0);
              }}
              className="bg-input border rounded-md focus:ring-accent focus:border-accent"
            />
            <Label htmlFor="equityFinancingValuation">Equity Financing Valuation</Label>
            <Input
              type="text"
              id="equityFinancingValuation"
              value={formatAsCurrency(equityFinancingValuation)}
              onChange={(e) => {
                const parsedValue = parseNumber(e.target.value);
                setEquityFinancingValuation(parsedValue !== undefined ? parsedValue : 0);
              }}
              className="bg-input border rounded-md focus:ring-accent focus:border-accent"
            />
            <Label htmlFor="equityFinancingInvestment">Investment Amount</Label>
            <Input
              type="text"
              id="equityFinancingInvestment"
              value={formatAsCurrency(equityFinancingInvestment)}
              onChange={(e) => {
                const parsedValue = parseNumber(e.target.value);
                setEquityFinancingInvestment(parsedValue !== undefined ? parsedValue : 0);
              }}
              className="bg-input border rounded-md focus:ring-accent focus:border-accent"
            />
            <Label htmlFor="companyValuation">Company Valuation at Conversion</Label>
            <Input
              type="text"
              id="companyValuation"
              value={formatAsCurrency(companyValuation)}
              onChange={(e) => {
                const parsedValue = parseNumber(e.target.value);
                setCompanyValuation(parsedValue !== undefined ? parsedValue : 0);
              }}
              className="bg-input border rounded-md focus:ring-accent focus:border-accent"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {safeInputs.map((safeInput) => (
          <Card key={safeInput.id} className="bg-card text-card-foreground shadow-md rounded-lg overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between p-4">
              <CardTitle className="text-lg font-semibold">{safeInput.type.toUpperCase()}</CardTitle>
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
                {(safeInput.type === 'Valuation Cap SAFE' || safeInput.type === 'Discount SAFE') && (
                  <>
                    <div className="grid grid-cols-1 gap-2">
                      {safeInput.type === 'Valuation Cap SAFE' && (
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
                      )}
                      {safeInput.type === 'Discount SAFE' && (
                        <div>
                          <Label htmlFor={`discountRate-${safeInput.id}`}>Discount Rate</Label>
                          <Input
                            type="text"
                            id={`discountRate-${safeInput.id}`}
                            value={(safeInput.discountRate ?? 0).toString()}
                            onChange={(e) => {
                              const parsedValue = parseNumber(e.target.value);
                              updateSafeInput(safeInput.id, { discountRate: parsedValue });
                            }}
                            className="bg-input border rounded-md focus:ring-accent focus:border-accent"
                          />
                        </div>
                      )}
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
                  </>
                )}
                <div className="text-right">
                  Equity Post Conversion: {(calculatePostMoneyEquity(safeInput)).toFixed(2)}%
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="my-6" />

      <div className="flex justify-center space-x-4">
        <Button onClick={() => addSafeInput('Valuation Cap SAFE')} className="bg-accent text-accent-foreground hover:bg-accent-foreground hover:text-accent rounded-full">
          <Plus className="h-4 w-4 mr-2" /> Valuation Cap SAFE
        </Button>
        <Button onClick={() => addSafeInput('Discount SAFE')} className="bg-accent text-accent-foreground hover:bg-accent-foreground hover:text-accent rounded-full">
          <Plus className="h-4 w-4 mr-2" /> Discount SAFE
        </Button>
      </div>

      {safeInputs.length > 0 && (
        <>
          <Separator className="my-6" />
          <Card className="w-full max-w-3xl mx-auto bg-card text-card-foreground shadow-md rounded-lg overflow-hidden">
            <CardHeader className="p-4">
              <CardTitle className="text-xl font-semibold">Capitalization Table</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-secondary text-secondary-foreground">
                      <th className="py-2 px-4 font-semibold text-left">Investor Name</th>
                      <th className="py-2 px-4 font-semibold text-left">SAFE Type</th>
                      <th className="py-2 px-4 font-semibold text-left">Equity Post Conversion</th>
                      <th className="py-2 px-4 font-semibold text-left">Investment Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Founders Shares */}
                    <tr className="border-b">
                        <td className="py-2 px-4">Founders</td>
                        <td className="py-2 px-4">Common Stock</td>
                        <td className="py-2 px-4">N/A</td>
                        <td className="py-2 px-4">{formatNumberWithCommas(foundersShares)}</td>
                    </tr>
                    {/* Employee Equity */}
                    <tr className="border-b">
                        <td className="py-2 px-4">Employee Pool</td>
                        <td className="py-2 px-4">Equity</td>
                        <td className="py-2 px-4">N/A</td>
                        <td className="py-2 px-4">{formatNumberWithCommas(employeeEquity)}</td>
                    </tr>
                    {/* SAFE Inputs */}
                    {safeInputs.map((safeInput) => (
                      <tr key={safeInput.id} className="border-b">
                        <td className="py-2 px-4">{safeInput.investorName}</td>
                        <td className="py-2 px-4">{safeInput.type}</td>
                        <td className="py-2 px-4">{(calculatePostMoneyEquity(safeInput)).toFixed(2)}%</td>
                        <td className="py-2 px-4">{formatAsCurrency(safeInput.investmentAmount)}</td>
                      </tr>
                    ))}
                    <tr className="border-b">
                      <td className="py-2 px-4">Equity Financing</td>
                      <td className="py-2 px-4">Common Stock</td>
                      <td className="py-2 px-4">{(calculateEquityFinancingOwnership()).toFixed(2)}%</td>
                      <td className="py-2 px-4">{formatAsCurrency(equityFinancingInvestment)}</td>
                    </tr>
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
