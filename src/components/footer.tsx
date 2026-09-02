import Link from "next/link";
import { SOCIALS, PERSONAL_INFO } from "@/lib/constants";
import { SOCIAL_ICON_MAP } from "@/components/icons";

export function Footer() {
  return (
    <footer className="border-t border-border py-8 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights
          reserved.
        </p>
        <div className="flex items-center gap-3">
          {SOCIALS.map((social) => {
            const Icon = SOCIAL_ICON_MAP[social.id];
            return (
              <Link
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="h-8 w-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <Icon className="h-4 w-4" />
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
