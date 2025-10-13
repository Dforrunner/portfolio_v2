import { cn } from '@/lib/utils';
import { LucideIcon, TrendingUp } from 'lucide-react';
import { ContactDialog } from './contact-dialog';

export function CtaCard({
  icon: Icon = TrendingUp,
  title = 'Ready to Transform Your Business?',
  message = "Let's discuss how custom web development, AI integration, and modern tech solutions can drive your business forward.",
  className,
}: {
  icon?: LucideIcon;
  title?: string;
  message?: string;
  className?: string;
}) {
  return (
    <div className="px-3 py-10">
      <div
        className={cn(
          'container mx-auto rounded-2xl border border-slate-300 p-12 text-center backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50',
          className
        )}
      >
        <Icon className="mx-auto mb-4 h-12 w-12 text-blue-400" />
        <h2 className="mb-4 text-3xl font-bold text-balance">{title}</h2>
        <p className="mx-auto mb-8 max-w-2xl leading-relaxed text-pretty text-slate-400">
          {message}
        </p>
        <ContactDialog
          trigger={
            <button className="group relative cursor-pointer overflow-hidden rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50">
              <span className="relative z-10">Schedule a Free Consultation</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>
          }
        />
      </div>
    </div>
  );
}
