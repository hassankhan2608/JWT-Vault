'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Shield, ShieldAlert, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/copy-button';
import { SecretFormat } from '@/lib/secret-generator';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface GeneratedSecretProps {
  secret: string;
  format: SecretFormat;
  strength: number;
}

export function GeneratedSecret({ secret, format, strength }: GeneratedSecretProps) {
  const [visible, setVisible] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const formatLabel = 
    format === 'base64' ? 'Base64 (URL Safe)' :
    format === 'hex' ? 'Hexadecimal' : 
    'UUID v4';

  // Mask the secret with asterisks
  const maskedSecret = secret.replace(/./g, '•');

  // Format the secret for better readability
  const formatDisplaySecret = (rawSecret: string): string => {
    if (format === 'uuid') return rawSecret; // UUID is already formatted
    
    // For other formats, add spaces every 4 chars for readability
    return rawSecret.match(/.{1,4}/g)?.join(' ') || rawSecret;
  };

  const getStrengthColor = (): string => {
    if (strength < 40) return 'bg-destructive';
    if (strength < 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const toggleVisibility = () => {
    setIsRotating(true);
    setTimeout(() => {
      setVisible(!visible);
      setIsRotating(false);
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <Card className="border-2 overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <motion.div 
              className="flex items-center gap-2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <CardTitle className="text-xl">Generated JWT Secret</CardTitle>
              <Badge variant="outline" className="font-mono">
                {formatLabel}
              </Badge>
            </motion.div>
          </div>
          <CardDescription className="flex items-center gap-1.5">
            <motion.div
              animate={{ 
                rotate: strength >= 60 ? [0, 360] : [0, 45, -45, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {strength >= 60 ? (
                <Shield className="h-4 w-4 text-green-500" />
              ) : (
                <ShieldAlert className="h-4 w-4 text-yellow-500" />
              )}
            </motion.div>
            {strength >= 80
              ? 'Very strong secret, suitable for production use'
              : strength >= 60
              ? 'Strong secret, good for most applications'
              : 'Consider increasing length or complexity for better security'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div 
            className="relative"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="p-4 bg-muted/50 rounded-md font-mono text-sm overflow-x-auto whitespace-pre-wrap break-all">
              <motion.span
                key={visible.toString()}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {visible ? formatDisplaySecret(secret) : formatDisplaySecret(maskedSecret)}
              </motion.span>
            </div>
            <div className="absolute top-2 right-2 flex space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleVisibility}
                      className="h-8 w-8 p-0 rounded-full"
                    >
                      <motion.div
                        animate={{ rotate: isRotating ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {visible ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </motion.div>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{visible ? 'Hide secret' : 'Show secret'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <CopyButton value={secret} />
            </div>
          </motion.div>
        </CardContent>
        <CardFooter className="pt-2 flex justify-between items-center text-xs text-muted-foreground">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            Length: {secret.length} characters
          </motion.div>
          <motion.div 
            className="flex items-center gap-1.5"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className={`h-2 w-2 rounded-full ${getStrengthColor()}`} />
            {strength >= 80 ? 'Very Strong' : strength >= 60 ? 'Strong' : 'Moderate'}
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}