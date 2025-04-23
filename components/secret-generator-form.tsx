'use client';

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wand2, Lock, Unlock } from 'lucide-react';
import { SecretStrengthIndicator } from '@/components/secret-strength-indicator';
import { calculateStrength, generateSecret, SecretFormat } from '@/lib/secret-generator';
import { GeneratedSecret } from '@/components/generated-secret';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const presetLengths = [32, 64, 128, 256, 512];

export function SecretGeneratorForm() {
  const [secretLength, setSecretLength] = useState(32);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [format, setFormat] = useState<SecretFormat>('base64');
  const [generatedSecret, setGeneratedSecret] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const strength = calculateStrength(
    secretLength,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols
  );

  const handleGenerateSecret = async () => {
    setIsGenerating(true);
    // Add a small delay to show the animation
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const secret = generateSecret({
      length: secretLength,
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols,
      format,
    });
    
    setGeneratedSecret(secret);
    setIsGenerating(false);
  };

  const handlePresetLength = (length: number) => {
    setSecretLength(length);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card className="border-2 bg-card">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <motion.div
              animate={{ rotate: isGenerating ? 360 : 0 }}
              transition={{ duration: 1, repeat: isGenerating ? Infinity : 0, ease: "linear" }}
            >
              {isGenerating ? <Lock className="h-5 w-5" /> : <Unlock className="h-5 w-5" />}
            </motion.div>
            Secret Generator Settings
          </CardTitle>
          <CardDescription>
            Configure the properties of your JWT secret
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label htmlFor="length">Secret Length: {secretLength}</Label>
              <span className="text-sm text-muted-foreground">
                {secretLength < 16 
                  ? "Not recommended" 
                  : secretLength < 32 
                    ? "Good" 
                    : "Excellent"}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {presetLengths.map((length) => (
                <Badge
                  key={length}
                  variant={secretLength === length ? "default" : "outline"}
                  className="cursor-pointer transition-all hover:scale-105"
                  onClick={() => handlePresetLength(length)}
                >
                  {length} bits
                </Badge>
              ))}
            </div>
            
            <Slider
              id="length"
              min={8}
              max={512}
              step={8}
              value={[secretLength]}
              onValueChange={(value) => setSecretLength(value[0])}
              className="py-4"
            />
          </div>

          <motion.div 
            className="space-y-4"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Label>Character Sets</Label>
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                className="flex items-center justify-between space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Label htmlFor="uppercase" className="flex-1 cursor-pointer">
                  Uppercase (A-Z)
                </Label>
                <Switch
                  id="uppercase"
                  checked={includeUppercase}
                  onCheckedChange={setIncludeUppercase}
                />
              </motion.div>
              <motion.div 
                className="flex items-center justify-between space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Label htmlFor="lowercase" className="flex-1 cursor-pointer">
                  Lowercase (a-z)
                </Label>
                <Switch
                  id="lowercase"
                  checked={includeLowercase}
                  onCheckedChange={setIncludeLowercase}
                />
              </motion.div>
              <motion.div 
                className="flex items-center justify-between space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Label htmlFor="numbers" className="flex-1 cursor-pointer">
                  Numbers (0-9)
                </Label>
                <Switch
                  id="numbers"
                  checked={includeNumbers}
                  onCheckedChange={setIncludeNumbers}
                />
              </motion.div>
              <motion.div 
                className="flex items-center justify-between space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Label htmlFor="symbols" className="flex-1 cursor-pointer">
                  Symbols (!@#$%)
                </Label>
                <Switch
                  id="symbols"
                  checked={includeSymbols}
                  onCheckedChange={setIncludeSymbols}
                />
              </motion.div>
            </div>
          </motion.div>

          <div className="space-y-2">
            <Label htmlFor="format">Secret Format</Label>
            <Select
              value={format}
              onValueChange={(value) => setFormat(value as SecretFormat)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="base64">Base64 (URL Safe)</SelectItem>
                <SelectItem value="hex">Hexadecimal</SelectItem>
                <SelectItem value="uuid">UUID v4 Format</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              {format === 'base64' 
                ? "URL-safe Base64 encoding, commonly used for JWT secrets" 
                : format === 'hex'
                ? "Hexadecimal format, each byte represented as two characters (0-9, a-f)"
                : "UUID v4 format, standardized identifier format"}
            </p>
          </div>

          <SecretStrengthIndicator strength={strength} length={secretLength} />
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleGenerateSecret} 
            className="w-full gap-2 transition-all"
            size="lg"
            disabled={isGenerating}
          >
            <motion.div
              animate={{ rotate: isGenerating ? 360 : 0 }}
              transition={{ duration: 1, repeat: isGenerating ? Infinity : 0, ease: "linear" }}
            >
              <Wand2 className="h-4 w-4" />
            </motion.div>
            {isGenerating ? 'Generating...' : 'Generate Secret'}
          </Button>
        </CardFooter>
      </Card>

      <AnimatePresence mode="wait">
        {generatedSecret && (
          <GeneratedSecret 
            key={generatedSecret} 
            secret={generatedSecret} 
            format={format} 
            strength={strength} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}