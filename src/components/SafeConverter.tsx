"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SafeValuationCap from './SafeValuationCap';
import SafeDiscount from './SafeDiscount';
import SafeMFN from './SafeMFN';
import { cn } from '@/lib/utils';

const SafeConverter = () => {
  const [valuationCapProjection, setValuationCapProjection] = useState<number | null>(null);
  const [discountProjection, setDiscountProjection] = useState<number | null>(null);
  const [mfnProjection, setMfnProjection] = useState<number | null>(null);

  return (
    <div className="container py-10">
      <Tabs defaultValue="valuationCap" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="valuationCap">Valuation Cap</TabsTrigger>
          <TabsTrigger value="discount">Discount</TabsTrigger>
          <TabsTrigger value="mfn">MFN</TabsTrigger>
        </TabsList>
        <TabsContent value="valuationCap" className="space-y-2">
          <SafeValuationCap setProjection={setValuationCapProjection} />
          {valuationCapProjection !== null && (
            <div>
              <p>Projected Equity: {valuationCapProjection.toFixed(2)}%</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="discount" className="space-y-2">
          <SafeDiscount setProjection={setDiscountProjection} />
          {discountProjection !== null && (
            <div>
              <p>Projected Equity: {discountProjection.toFixed(2)}%</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="mfn" className="space-y-2">
          <SafeMFN setProjection={setMfnProjection} />
          {mfnProjection !== null && (
            <div>
              <p>Projected Equity: {mfnProjection.toFixed(2)}%</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {(valuationCapProjection !== null || discountProjection !== null || mfnProjection !== null) && (
        <Card className="w-[400px] mt-4">
          <CardHeader>
            <CardTitle>Comparative Summary</CardTitle>
          </CardHeader>
          <CardContent>
            {valuationCapProjection !== null && (
              <p>Valuation Cap: {valuationCapProjection.toFixed(2)}%</p>
            )}
            {discountProjection !== null && (
              <p>Discount: {discountProjection.toFixed(2)}%</p>
            )}
            {mfnProjection !== null && (
              <p>MFN: {mfnProjection.toFixed(2)}%</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SafeConverter;
