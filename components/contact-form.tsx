"use client";

import type React from "react";

import { sendContactMessage } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle, Send } from "lucide-react";
import { useRef, useState } from "react";
import { QuickConnectButtons } from "./quick-connect-buttons";
import { Label } from "./ui/label";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: "" });

    const formData = new FormData(formRef.current!);

    const result = await sendContactMessage(formData);

    setIsSubmitting(false);

    if (result.success) {
      setFormStatus({ type: "success", message: result.message || "Message sent successfully!" });
      formRef.current?.reset();
    } else {
      setFormStatus({ type: "error", message: result.error || "Failed to send message. Please try again." });
    }
  };

  return (
    <>
      {formStatus.type && (
        <div
          className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${
            formStatus.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {formStatus.type === "success" ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
          <span>{formStatus.message}</span>
        </div>
      )}
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Your name" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="your@email.com" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" name="message" placeholder="Tell me about your project..." rows={5} required />
        </div>
        <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
          {isSubmitting ? (
            "Sending..."
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </>
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-300 dark:border-slate-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-slate-50 text-slate-600 dark:bg-slate-900 dark:text-slate-400 rounded-2xl">Or click one of the options below</span>
        </div>
      </div>

      <QuickConnectButtons />
    </>
  );
}
