import { siteConfig } from '@/lib/site-config';
import { Github, Linkedin, Mail } from 'lucide-react';
import { ContactDialog } from './contact-dialog';

export function Footer() {
  return (
    <footer className="bg-gradient-primary border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="mb-4 text-xl font-bold">
              <span className="from-primary to-accent bg-gradient-to-r bg-clip-text dark:text-transparent">
                {siteConfig.name}
              </span>
            </h3>
            <p className="text-muted-foreground mb-4">{siteConfig.description}</p>
            <div className="flex space-x-4">
              <a
                href={siteConfig.account.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.account.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {siteConfig.navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={item.name}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 font-semibold">Get In Touch</h4>
            <div className="text-muted-foreground space-y-2">
              <p>{siteConfig.email}</p>
              <p>{siteConfig.location}</p>

              <ContactDialog />
            </div>
          </div>
        </div>

        <div className="border-border text-muted-foreground mt-8 border-t pt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
