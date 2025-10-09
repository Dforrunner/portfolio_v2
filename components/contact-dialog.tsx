"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Sparkles } from "lucide-react";
import { ContactForm } from "./contact-form";

interface ContactDialogProps {
  trigger?: React.ReactNode;
  buttonText?: string;
}

export function ContactDialog({
  trigger,
  buttonText = "Book Free Consultation",
}: ContactDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            {buttonText}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border-slate-300 dark:border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Let's Build Something Amazing
          </DialogTitle>
          <DialogDescription className="text-slate-500 dark:text-slate-300 text-base">
            Choose your preferred way to connect. I typically respond within 24 hours.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Contact Form */}
          <ContactForm />

          {/* Trust Badge */}
          <div className="text-center pt-2">
            <p className="text-sm text-slate-400">
              🔒 Your information is secure and will never be shared
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
