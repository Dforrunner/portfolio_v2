import { siteConfig } from '@/lib/site-config';
import { EmailIcon, LineIcon, TelegramIcon, WhatsappIcon } from 'react-share';

export function QuickConnectButtons() {
  const subject = encodeURIComponent('Free Consultation Request');
  const body = encodeURIComponent(
    "Hi Mo,\n\nI'm interested in booking a free consultation to discuss.\n\nTo tell you a bit about my project ...\n"
  );

  const communicationApps = [
    {
      name: 'WhatsApp',
      icon: WhatsappIcon,
      href: `https://wa.me/${siteConfig.communication.whatsapp.replace(/^0-9/g, '')}?text=${body}`,
      color: 'hover:text-green-600',
    },
    {
      name: 'Telegram',
      icon: TelegramIcon,
      href: `https://t.me/${siteConfig.communication.telegram.replace('@', '')}`,
      color: 'hover:text-blue-500',
    },
    {
      name: 'Line',
      icon: LineIcon,
      href: `https://line.me/ti/p/~${siteConfig.communication.line}?text=${body}`,
      color: 'hover:text-green-500',
    },
    {
      name: 'Email',
      icon: EmailIcon,
      href: `mailto:${siteConfig.email}?subject=${subject}&body=${body}`,
      color: 'hover:text-white',
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {communicationApps.map((app, index) => (
        <a
          key={index}
          href={app.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-card/30 hover:border-primary/50 flex cursor-pointer flex-col items-center rounded-lg border p-4 backdrop-blur-sm transition-all duration-300 hover:shadow-md ${app.color}`}
        >
          {<app.icon className="h-10 w-10" round />}
          <span className="pt-2 text-center text-sm font-medium">{app.name}</span>
        </a>
      ))}
    </div>
  );
}
