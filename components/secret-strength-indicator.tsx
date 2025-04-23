"use client";

import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface SecretStrengthIndicatorProps {
  strength: number; // 0-100
  length: number;
}

export function SecretStrengthIndicator({
  strength,
  length,
}: SecretStrengthIndicatorProps) {
  const getStrengthLabel = (strength: number): string => {
    if (strength < 20) return "Very Weak";
    if (strength < 40) return "Weak";
    if (strength < 60) return "Moderate";
    if (strength < 80) return "Strong";
    return "Very Strong";
  };

  const getStrengthColor = (strength: number): string => {
    if (strength < 20) return "destructive";
    if (strength < 40) return "orange-500";
    if (strength < 60) return "yellow-500";
    if (strength < 80) return "emerald-500";
    return "green-500";
  };

  // Estimate bits of entropy (simplified calculation)
  const estimatedEntropy = Math.round(length * Math.log2(94)); // Assuming all printable ASCII chars

  return (
    <motion.div
      className="space-y-2 w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center">
        <motion.span
          className="text-sm font-medium"
          key={strength}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          Strength: {getStrengthLabel(strength)}
        </motion.span>
        <motion.span
          className="text-sm text-muted-foreground"
          key={estimatedEntropy}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          ~{estimatedEntropy} bits entropy
        </motion.span>
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Progress
          value={strength}
          className="h-2"
          style={
            {
              "--progress-foreground": `hsl(var(--${getStrengthColor(
                strength,
              )}))`,
            } as React.CSSProperties
          }
        />
      </motion.div>
      <motion.p
        className="text-xs text-muted-foreground mt-1"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {length < 16
          ? "Consider using a longer secret for better security"
          : length >= 32
            ? "Great length for a secure JWT secret"
            : "Good length, but longer is better for production use"}
      </motion.p>
    </motion.div>
  );
}
