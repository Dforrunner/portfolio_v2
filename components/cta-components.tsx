import { cn } from "@/lib/utils";
import { TrendingUp } from "lucide-react";
import { ContactDialog } from "./contact-dialog";

export function CtaCard({ className }: { className?: string }) {
  return (
    <div className="px-3 py-10">
      <div
        className={cn(
          "container mx-auto rounded-2xl border border-slate-300 dark:border-slate-800  dark:bg-slate-900/50 p-12 text-center backdrop-blur-sm",
          className
        )}
      >
        <TrendingUp className="mx-auto mb-4 h-12 w-12 text-blue-400" />
        <h2 className="mb-4 text-3xl font-bold text-balance">Ready to Transform Your Business?</h2>
        <p className="mx-auto mb-8 max-w-2xl text-slate-400 leading-relaxed text-pretty">
          Let's discuss how custom web development, AI integration, and modern tech solutions can
          drive your business forward.
        </p>
        <ContactDialog
          trigger={
            <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50 cursor-pointer">
              <span className="relative z-10">Schedule a Free Consultation</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>
          }
        />
      </div>
    </div>
  );
}
