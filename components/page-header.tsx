'use client';

import { motion } from 'framer-motion';
import { Key, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function PageHeader() {
  return (
    <motion.header 
      className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container max-w-5xl mx-auto py-4 px-4 sm:px-6 flex justify-between items-center">
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative">
            <Key className="h-6 w-6 text-primary animate-pulse" />
            <div className="absolute inset-0 h-6 w-6 animate-ping opacity-20">
              <Key className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight font-space-grotesk">JWT Vault</h1>
            <p className="text-xs text-muted-foreground">
              Professional JWT Secret Generator
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-accent"
                  asChild
                >
                  <a
                    href="https://github.com/stackblitz/jwt-vault"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2"
                  >
                    <Github className="h-5 w-5" />
                    <span className="sr-only">View on GitHub</span>
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View on GitHub</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </motion.div>
      </div>
    </motion.header>
  );
}