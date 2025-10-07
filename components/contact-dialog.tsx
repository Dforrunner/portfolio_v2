"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/lib/site-config";
import { Mail, MessageSquareMoreIcon, Sparkles } from "lucide-react";
import { ContactForm } from "./contact-form";

interface ContactDialogProps {
  trigger?: React.ReactNode;
  buttonText?: string;
}

export function ContactDialog({ trigger, buttonText = "Book Free Consultation" }: ContactDialogProps) {
  const handleContactMethod = (method: string) => {
    const subject = encodeURIComponent("Free Consultation Request");
    const body = encodeURIComponent("Hi Mo,\n\nI'm interested in booking a free consultation to discuss.\n\nTo tell you a bit about my project ...\n");
    switch (method) {
      case "sms":
        window.open(`sms:${siteConfig.phoneDigitsOnly}?body=${body}`);
        break;
      case "email":
        window.open(`mailto:${siteConfig.email}?subject=${subject}&body=${body}`);
        break;
      case "whatsapp":
        window.open(`https://wa.me/${siteConfig.communication.whatsapp.replace(/\D/g, "")}?text=${body}`);
        break;
      case "line":
        window.open(`https://line.me/ti/p/~${siteConfig.communication.line}?text=${body}`);
        break;
    }
  };

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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Let's Build Something Amazing</DialogTitle>
          <DialogDescription className="text-slate-300 text-base">Choose your preferred way to connect. I typically respond within 24 hours.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Contact Form */}
          <ContactForm />

          {/* Quick Contact Methods */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold text-slate-200">Quick Contact Options</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => handleContactMethod("sms")}
                className="h-auto py-4 bg-gradient-to-br from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <MessageSquareMoreIcon />
                Text Me
              </Button>

              <Button
                onClick={() => handleContactMethod("email")}
                className="h-auto py-4 bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Mail className="h-6 w-6" />
                Email Me
              </Button>

              <Button
                onClick={() => handleContactMethod("whatsapp")}
                className="h-auto py-4 bg-gradient-to-br from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <MessageSquareMoreIcon className="h-6 w-6" />
                WhatsApp
              </Button>

              <Button
                onClick={() => handleContactMethod("line")}
                className="h-auto py-4 bg-gradient-to-br from-green-500 to-lime-600 hover:from-green-600 hover:to-lime-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <MessageSquareMoreIcon className="h-6 w-6" />
                Line
              </Button>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="text-center pt-2">
            <p className="text-sm text-slate-400">🔒 Your information is secure and will never be shared</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
