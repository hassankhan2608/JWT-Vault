"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

interface CopyButtonProps {
  value: string;
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

export function CopyButton({
  value,
  variant = "outline",
  size = "sm",
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setHasCopied(true);
      toast({
        title: "Copied!",
        description: "The secret has been copied to your clipboard.",
      });

      setTimeout(() => {
        setHasCopied(false);
      }, 2000);
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={variant}
            size={size}
            className="transition-all duration-200"
            onClick={copyToClipboard}
          >
            {hasCopied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="sr-only">Copy to clipboard</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{hasCopied ? "Copied!" : "Copy to clipboard"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
