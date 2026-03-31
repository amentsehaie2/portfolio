import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '../ui/Button';
import profileImg from '../../assets/images/profile.jpg';

export const Hero = () => {
  const scrollToWork = () => {
    const aboutSection = document.getElementById('work');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-10 overflow-hidden z-10"
    >
      <div className="flex flex-col items-center text-center max-w-4xl w-full">
        {/* Profile Photo */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative mb-8"
        >
          <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-primary shadow-[0_0_30px_rgba(0,153,255,0.4)] bg-dark-lighter flex items-center justify-center">
            <img src={profileImg} alt="Amen Tsehaie" className="w-full h-full object-cover" />
          </div>
          
          {/* Subtle pulse behind the photo */}
          <motion.div
            className="absolute inset-0 rounded-full border border-primary/50 z-[-1]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-light whitespace-nowrap"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } },
          }}
        >
          Amen Tsehaie
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl  mb-10 max-w-2xl font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Software Engineer | Building Digital Experiences
        </motion.p>

        {/* Social Links & CTA */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <Button onClick={scrollToWork} className="px-8 font-semibold tracking-wide">
            Explore My Work
          </Button>
          
          <div className="flex items-center gap-4">
            <a href="https://github.com/amentsehaie2" target="_blank" rel="noreferrer" className="text-white/70 hover:text-primary transition-colors hover:scale-110 transform duration-300 p-2">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/amen-tsehaie-158a80274/" target="_blank" rel="noreferrer" className="text-white/70 hover:text-primary transition-colors hover:scale-110 transform duration-300 p-2">
              <Linkedin size={24} />
            </a>
            <button onClick={scrollToContact} className="text-white/70 hover:text-primary transition-colors hover:scale-110 transform duration-300 p-2">
              <Mail size={24} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Downward Scroll Indicator */}
      {/* <motion.div
        className="absolute bottom-10 cursor-pointer text-white/50 hover:text-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={scrollToWork}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={32} />
        </motion.div>
      </motion.div> */}
    </section>
  );
};
