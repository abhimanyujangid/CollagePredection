import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const SideViewOutter = ({ children }: { children: React.ReactNode }) => (
  <motion.div
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.45 }}
  className="w-full md:w-1/2 cursor-pointer">
    <Card className="bg-primary/50 dark:bg-blue-400 rounded-2xl shadow-xl relative overflow-hidden p-4">
      <div className="absolute inset-0 opacity-20 dark:opacity-40"></div>
      <CardContent className="relative bg-muted rounded-xl overflow-hidden shadow-inner p-4">
          {children}
      </CardContent>
    </Card>
  </motion.div>
);

export default SideViewOutter;

