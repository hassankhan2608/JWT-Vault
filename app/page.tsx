"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/page-header";
import { SecretGeneratorForm } from "@/components/secret-generator-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import { Github, Lock, ShieldCheck } from "lucide-react";

const BackgroundElement = ({ className }: { className: string }) => (
  <motion.div
    className={`absolute pointer-events-none opacity-20 dark:opacity-[0.15] ${className}`}
    animate={{
      scale: [1, 1.1, 1],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      repeatType: "reverse",
    }}
  >
    <div className="w-[300px] h-[300px] rounded-full bg-gradient-to-br from-primary/50 to-secondary/50 blur-3xl" />
  </motion.div>
);

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <BackgroundElement className="top-[-20%] left-[-10%]" />
      <BackgroundElement className="bottom-[-20%] right-[-10%]" />
      <BackgroundElement className="top-[40%] right-[-20%]" />

      <PageHeader />

      <main className="flex-1 py-6 px-4 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center space-y-3 px-4 py-6">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-primary/80 mb-4">
                  Secure JWT Secret Generator
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
                  Generate cryptographically secure JWT secrets with a modern,
                  user-friendly interface
                </p>
              </motion.div>
            </div>

            <SecretGeneratorForm />

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border-2">
                  <CardHeader className="pb-2">
                    <Lock className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>100% Client-Side</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      All secret generation happens entirely in your browser. No
                      server-side requests, no tracking, no data storage.
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border-2">
                  <CardHeader className="pb-2">
                    <ShieldCheck className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>Cryptographically Secure</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Uses the Web Crypto API to generate cryptographically
                      secure random values for maximum security.
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border-2">
                  <CardHeader className="pb-2">
                    <Github className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>Open Source</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Fully transparent implementation. Review the code to
                      ensure it meets your security standards.
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div
              className="text-center text-sm text-muted-foreground py-6 border-t mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p>
                Built with security and privacy in mind. No secrets are sent
                over the network.
              </p>
              <p className="mt-1">
                Need inspiration? The best JWT secrets are random, unique, and
                at least 32 characters long.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Toaster />
    </div>
  );
}
