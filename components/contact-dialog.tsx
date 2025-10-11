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
import { Calendar, MessageSquare, Sparkles } from "lucide-react";
import { useState } from "react";
import { ContactForm } from "./contact-form";
import CalCom from "./cal-com";

interface ContactDialogProps {
  trigger?: React.ReactNode;
  buttonText?: string;
}

export function ContactDialog({
  trigger,
  buttonText = "Book Free Consultation",
}: ContactDialogProps) {
  const [activeView, setActiveView] = useState<"contact" | "calendar">("contact");

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
      <DialogContent className="max-w-3xl w-full max-h-[90vh] overflow-y-auto border-slate-300 dark:border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Let's Build Something Amazing
          </DialogTitle>
          <DialogDescription className="text-slate-500 dark:text-slate-300 text-base">
            Choose your preferred way to connect. I typically respond within 24 hours.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2 border-b border-slate-700 pb-4">
          <Button
            onClick={() => setActiveView("contact")}
            variant={activeView === "contact" ? "default" : "outline"}
            className={`flex-1 ${
              activeView === "contact"
                ? "bg-gradient-to-r from-blue-600 to-cyan-600 dark:text-white"
                : "border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Contact Form
          </Button>
          <Button
            onClick={() => setActiveView("calendar")}
            variant={activeView === "calendar" ? "default" : "outline"}
            className={`flex-1 ${
              activeView === "calendar"
                ? "bg-gradient-to-r from-blue-600 to-cyan-600 dark:text-white"
                : "border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Meeting
          </Button>
        </div>

        <div>
          {activeView === "contact" ? (
            <ContactForm />
          ) : (
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <p className="text-slate-400 text-sm">
                  Pick a time that works best for you. I'll send you a calendar invite with meeting
                  details.
                </p>
              </div>

              <div className="rounded-lg overflow-hidden">
                <CalCom />
              </div>

              <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                <p>
                  💡 Don't have time right now? You can also reach out via the Contact Form tab.
                </p>
              </div>
            </div>
          )}

          {/* Trust Badge */}
          <div className="text-center pt-3">
            <p className="text-sm text-slate-400">
              🔒 Your information is secure and will never be shared
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
