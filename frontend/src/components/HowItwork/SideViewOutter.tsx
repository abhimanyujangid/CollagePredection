import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const SideViewOutter = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full md:w-1/2">
    <Card className="bg-primary/50 dark:bg-blue-400 rounded-2xl shadow-xl relative overflow-hidden p-4">
      <div className="absolute inset-0 opacity-20 dark:opacity-40"></div>
      <CardContent className="relative bg-muted rounded-xl overflow-hidden shadow-inner p-4">
          {children}
      </CardContent>
    </Card>
  </div>
);

export default SideViewOutter;

