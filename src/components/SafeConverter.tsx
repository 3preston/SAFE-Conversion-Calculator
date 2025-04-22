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
  const [equityFinancingInvestment, setEquityFinancingInvestment] = useState<number>(3000000);

  const [totalShares, setTotalShares] = useState<number>(10000000);
  const [foundersShares, setFoundersShares] = useState<number>(2000000);
  const [employeeShares, setEmployeeShares] = useState<number>(1000000);

  const addSafeInput = () => {
    const newSafeInput: SafeInput = {
      id: Math.random().toString(36).substring(7),
      investorName: `Investor ${safeInputs.length + 1}`,
      type: 'Valuation Cap SAFE',
      investmentAmount: 100000,
      valuationCap: 1000000,
    };
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

    const calculateEquitySharesValuationCap = (safeInput: SafeInput): number => {
        if (safeInput.type === 'Valuation Cap SAFE' && safeInput.valuationCap !== undefined) {
            return Math.min(safeInput.investmentAmount / safeInput.valuationCap, safeInput.investmentAmount / equityFinancingValuation) * totalShares;
        }
        return 0;
    };

    const calculateEquitySharesDiscount = (safeInput: SafeInput): number => {
        if (safeInput.type === 'Discount SAFE' && safeInput.discountRate !== undefined) {
            return safeInput.investmentAmount / (equityFinancingValuation * (1 - (safeInput.discountRate / 100))) * totalShares;
        }
        return 0;
    };

    const equityFinancingShares = equityFinancingInvestment / equityFinancingValuation * totalShares;

    const calculateEquityShares = (safeInput: SafeInput): number => {
        if (safeInput.type === 'Valuation Cap SAFE') {
            return calculateEquitySharesValuationCap(safeInput);
        } else if (safeInput.type === 'Discount SAFE') {
            return calculateEquitySharesDiscount(safeInput);
        }
        return 0;
    };

    const calculateTotalShares = () => {
        let safeSharesTotal = 0;
        safeInputs.forEach((safeInput) => {
            safeSharesTotal += calculateEquityShares(safeInput);
        });
        return totalShares + equityFinancingShares + safeSharesTotal;
    }

    const totalCapTableShares = calculateTotalShares();


  return (
    <div className="container py-10">
        <h1 className="text-4xl font-bold text-center mb-8">
            SAFE Conversion Calculator
        </h1>

      <Card className="w-full max-w-3xl mx-auto bg-card text-card-foreground shadow-md rounded-lg overflow-hidden mb-6">
        <CardHeader className="p-4">
          <CardTitle className="text-xl font-semibold">Company Structure</CardTitle>
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
            <Label htmlFor="employeeShares">Employee Shares</Label>
            <Input
              type="text"
              id="employeeShares"
              value={formatNumberWithCommas(employeeShares)}
              onChange={(e) => {
                const parsedValue = parseNumber(e.target.value);
                setEmployeeShares(parsedValue !== undefined ? parsedValue : 0);
              }}
              className="bg-input border rounded-md focus:ring-accent focus:border-accent"
            />
          </div>
        </CardContent>
      </Card>
        
        <div className="flex justify-center space-x-4 mb-6">
            <Button onClick={() => setSafeInputs(prev => [...prev, {
                id: Math.random().toString(36).substring(7),
                investorName: `Investor ${safeInputs.length + 1}`,
                type: 'Valuation Cap SAFE',
                investmentAmount: 100000,
                valuationCap: 1000000,
            }])} className="bg-accent text-accent-foreground hover:bg-accent-foreground hover:text-accent rounded-full">
                <Plus className="h-4 w-4 mr-2" /> Valuation Cap SAFE
            </Button>
            <Button onClick={() => setSafeInputs(prev => [...prev, {
                id: Math.random().toString(36).substring(7),
                investorName: `Investor ${safeInputs.length + 1}`,
                type: 'Discount SAFE',
                investmentAmount: 100000,
                discountRate: 20,
            }])} className="bg-accent text-accent-foreground hover:bg-accent-foreground hover:text-accent rounded-full">
                <Plus className="h-4 w-4 mr-2" /> Discount SAFE
            </Button>
        </div>
        
        <div className="flex w-full max-w-3xl mx-auto mb-6 space-x-4">
        <Card className="w-1/2 bg-card text-card-foreground shadow-md rounded-lg overflow-hidden">
            <CardHeader className="p-4">
                <CardTitle className="text-xl font-semibold">Equity Financing</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                <div className="grid gap-4">
                    <Label htmlFor="equityFinancingValuation">Post-Money Valuation</Label>
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
                </div>
            </CardContent>
        </Card>

      {safeInputs.map((safeInput, index) => (
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
            </div>
          </CardContent>
        </Card>
      ))}
        </div>

      <Separator className="my-6" />

      <Card className="w-full max-w-3xl mx-auto bg-card text-card-foreground shadow-md rounded-lg overflow-hidden">
        <CardHeader className="p-4">
          <CardTitle className="text-xl font-semibold">Capitalization Table</CardTitle>
        </CardHeader>
        <div style={{ fontSize: '0.8em', fontStyle: 'italic', textAlign: 'center' }}>(Post Conversion)</div>
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-secondary text-secondary-foreground">
                  <th className="py-2 px-4 font-semibold text-left">Investor Name</th>
                  <th className="py-2 px-4 font-semibold text-left">SAFE Type</th>
                  <th className="py-2 px-4 font-semibold text-left">Shares</th>
                  <th className="py-2 px-4 font-semibold text-left">Equity %</th>
                  <th className="py-2 px-4 font-semibold text-left">Investment Amount</th>
                </tr>
              </thead>
              <tbody>
              {/* Founders Shares */}
              <tr className="border-b">
                <td className="py-2 px-4">Founders</td>
                <td className="py-2 px-4">Common Stock</td>
                <td className="py-2 px-4">{formatNumberWithCommas(foundersShares)}</td>
                <td className="py-2 px-4">{(foundersShares / totalCapTableShares * 100).toFixed(2)}%</td>
                <td className="py-2 px-4">-</td>
              </tr>
              {/* Employee Shares */}
              <tr className="border-b">
                <td className="py-2 px-4">Employee Pool</td>
                <td className="py-2 px-4">Equity</td>
                <td className="py-2 px-4">{formatNumberWithCommas(employeeShares)}</td>
                <td className="py-2 px-4">{(employeeShares / totalCapTableShares * 100).toFixed(2)}%</td>
                <td className="py-2 px-4">-</td>
              </tr>

              {/* Equity Financing */}
              <tr className="border-b">
                <td className="py-2 px-4">Equity Financing</td>
                <td className="py-2 px-4">Common Stock</td>
                <td className="py-2 px-4">{formatNumberWithCommas(equityFinancingShares)}</td>
                <td className="py-2 px-4">{(equityFinancingShares / totalCapTableShares * 100).toFixed(2)}%</td>
                <td className="py-2 px-4">{formatAsCurrency(equityFinancingInvestment)}</td>
              </tr>

                {safeInputs.map((safeInput) => {
                  const safeShares = calculateEquityShares(safeInput);
                  return (
                    <tr key={safeInput.id} className="border-b">
                      <td className="py-2 px-4">{safeInput.investorName}</td>
                      <td className="py-2 px-4">{safeInput.type}</td>
                      <td className="py-2 px-4">{formatNumberWithCommas(safeShares)}</td>
                        <td className="py-2 px-4">
                            {((safeShares / totalCapTableShares) * 100).toFixed(2)}%
                        </td>
                      <td className="py-2 px-4">{formatAsCurrency(safeInput.investmentAmount)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafeConverter;
