import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logoImage from '../../assets/images/logo2.png';

const LEFT_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Work', href: '#work' },
];

const RIGHT_LINKS = [
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    setTimeout(() => {
      if (href === '#home' || href === '#hero') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }

      const element = document.querySelector(href);
      if (element) {
        const offsetTop = element.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }, mobileMenuOpen ? 300 : 0);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full pt-6 px-4 md:px-0 pointer-events-none">
        <motion.header 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`pointer-events-auto transition-all duration-300 w-full max-w-4xl rounded-full ${
            isScrolled 
              ? 'py-3 backdrop-blur-md bg-[#0a0a0a]/60 border border-white/10 shadow-[0_8px_32px_rgba(0,153,255,0.1)]' 
              : 'py-4 backdrop-blur-sm bg-[#0a0a0a]/20 border border-white/5'
          }`}
        >
          <div className="px-6 md:px-12 flex items-center justify-between relative h-12">
            
            {/* Mobile Logo (left edge) */}
            <a 
              href="#hero" 
              onClick={(e) => scrollToSection(e, '#hero')}
              className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg bg-transparent"
              aria-label="Home"
            >
              <img src={logoImage} alt="Amen Tsehaie logo" className="w-9 h-9 object-contain scale-[1.38] drop-shadow-[0_0_12px_rgba(255,255,255,0.18)]" />
            </a>
            
            {/* Desktop Left Nav */}
            <nav className="hidden md:flex items-center justify-end gap-12 flex-1 pr-14">
              {LEFT_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-sm font-medium text-white/80 hover:text-white transition-all duration-300 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                </a>
              ))}
            </nav>

            {/* Logo Center (Desktop) */}
            <a 
              href="#hero" 
              onClick={(e) => scrollToSection(e, '#hero')}
              className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center w-14 h-14 rounded-[14px] bg-transparent hover:scale-110 transition-transform duration-300"
              aria-label="Home"
            >
              <img src={logoImage} alt="Amen Tsehaie logo" className="w-11 h-11 object-contain scale-[1.38] drop-shadow-[0_0_14px_rgba(255,255,255,0.18)]" />
            </a>

            {/* Desktop Right Nav */}
            <nav className="hidden md:flex items-center justify-start gap-12 flex-1 pl-14">
              {RIGHT_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-sm font-medium text-white/80 hover:text-white transition-all duration-300 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                </a>
              ))}
            </nav>

            {/* Mobile Toggle (right edge) */}
            <button 
              className="md:hidden text-white z-50 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </motion.header>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-dark/95 flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {[...LEFT_LINKS, ...RIGHT_LINKS].map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.4 }}
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-3xl font-light text-white hover:text-primary transition-colors duration-300"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
