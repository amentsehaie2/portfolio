import { Github, Linkedin, Instagram, ArrowUp } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About',   href: '#about'   },
  { label: 'Work',    href: '#work'    },
  { label: 'Skills',  href: '#skills'  },
  { label: 'Contact', href: '#contact' },
];

const SOCIAL_LINKS = [
  { id: 'linkedin',  href: 'https://www.linkedin.com/in/amen-tsehaie-158a80274/', icon: <Linkedin size={18} />,  label: 'LinkedIn'  },
  { id: 'github',    href: 'https://github.com/amentsehaie2',                     icon: <Github size={18} />,    label: 'GitHub'    },
  { id: 'instagram', href: 'https://www.instagram.com/amenino.2/',                                                   icon: <Instagram size={18} />, label: 'Instagram' },
];

const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  const el = document.querySelector(href);
  if (el) {
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
  }
};

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

export const Footer = () => {
  return (
    <footer className="relative z-10 bg-dark border-t border-transparent"
      style={{ borderImage: 'linear-gradient(to right, #0099ff, #00d4ff) 1' }}
    >
      {/* Top gradient line */}
      <div className="h-px w-full bg-gradient-to-r from-primary via-secondary to-accent opacity-40" />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Logo */}
          <div className="flex items-center justify-center w-10 h-10 rounded-[10px] border border-white/20 bg-white text-dark font-black text-base select-none flex-shrink-0">
            A.T
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="text-sm text-white/50 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white/50 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all duration-300"
              >
                {link.icon}
              </a>
            ))}
          </div>

        </div>

        {/* Bottom row */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30 text-center">
            © 2026 Amen Tsehaie
          </p>
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex items-center gap-2 text-xs text-white/30 hover:text-primary transition-colors duration-300 group"
          >
            <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};
