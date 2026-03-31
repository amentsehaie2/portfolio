import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Mail, Linkedin, Github, Instagram, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { FadeIn } from '../../animations/FadeIn';
import portretImg from '../../assets/images/portret.png';


// ─── EmailJS Configuration ────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
// ─────────────────────────────────────────────────────────────────────────────

interface FormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

const SOCIAL_LINKS = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/amen-tsehaie-158a80274/',
    icon: <Linkedin size={20} />,
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/amentsehaie2',
    icon: <Github size={20} />,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/amenino.2/', // Add your Instagram URL here
    icon: <Instagram size={20} />,
  },
];

export const Contact = () => {
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setStatus('loading');

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setStatus('error');
      return;
    }

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          phone: data.phone || 'Not provided',
          message: data.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  const inputBase =
    'w-full bg-[#1a1a1a] border rounded-lg px-4 py-3 text-white placeholder-white/30 outline-none transition-all duration-300 focus:ring-1';
  const inputNormal = `${inputBase} border-white/10 focus:border-primary focus:ring-primary/30`;
  const inputError  = `${inputBase} border-red-500/70 focus:border-red-500 focus:ring-red-500/20`;

  return (
    <section id="contact" className="relative z-10 py-24 px-4 bg-dark">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="mb-16 text-center md:text-left">
          <FadeIn direction="up">
            <h2 className="text-3xl md:text-5xl font-light mb-4">
              Get In <span className="font-semibold text-primary">Touch with me</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto md:mx-0 rounded-full" />
          </FadeIn>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Left — Contact Form */}
          <FadeIn direction="up" delay={0.1}>
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center justify-center text-center h-full min-h-[340px] gap-5 border border-white/10 rounded-2xl p-8 bg-[#1a1a1a]/60"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 14 }}
                  >
                    <CheckCircle size={56} className="text-green-400" />
                  </motion.div>
                  <h3 className="text-2xl font-light text-white">Message sent!</h3>
                  <p className="text-white/60">Thanks for reaching out — I'll get back to you shortly.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-2 text-sm text-primary hover:text-secondary underline underline-offset-4 transition-colors duration-300"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="space-y-5"
                >
                  {/* Name */}
                  <div>
                    <label className="block text-sm text-white/60 mb-1.5" htmlFor="contact-name">
                      Name <span className="text-primary">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Amen Tsehaie"
                      disabled={status === 'loading'}
                      className={errors.name ? inputError : inputNormal}
                      {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm text-white/60 mb-1.5" htmlFor="contact-email">
                      Email <span className="text-primary">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="you@example.com"
                      disabled={status === 'loading'}
                      className={errors.email ? inputError : inputNormal}
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Please enter a valid email address',
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Phone (optional) */}
                  <div>
                    <label className="block text-sm text-white/60 mb-1.5" htmlFor="contact-phone">
                      Phone <span className="text-white/30 text-xs">(optional)</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="+31 6 12345678"
                      disabled={status === 'loading'}
                      className={inputNormal}
                      {...register('phone')}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm text-white/60 mb-1.5" htmlFor="contact-message">
                      Message <span className="text-primary">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      placeholder="Tell me about your project or opportunity…"
                      disabled={status === 'loading'}
                      className={`${errors.message ? inputError : inputNormal} resize-none`}
                      {...register('message', { required: 'Message is required' })}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Error banner */}
                  {status === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-400 flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3"
                    >
                      <AlertCircle size={16} />
                      Something went wrong. Please try again or email me directly.
                    </motion.p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium rounded-lg px-6 py-3.5 transition-all duration-300 hover:shadow-[0_0_24px_rgba(0,153,255,0.4)] hover:scale-[1.02] active:scale-100"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </FadeIn>

          {/* Right — Contact Info & Socials */}
          <FadeIn direction="up" delay={0.2}>
            <div className="flex flex-col gap-10">

              {/* Portrait Image */}
              <motion.div 
                className="w-full max-w-md lg:max-w-lg rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(0,153,255,0.1)] mx-auto lg:mx-0"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img src={portretImg} alt="Amen Tsehaie" className="w-full h-auto object-cover" />
              </motion.div>

              {/* Intro text */}
              <div>
                <h3 className="text-xl font-light text-white mb-3">Let's work together!</h3>
                <p className="text-white/60 leading-relaxed">
                  Whether you have a project in mind, or you just
                  want to say hi — my inbox is always open.
                </p>
              </div>

              {/* Availability badge */}
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                </span>
                <span className="text-sm text-white/70">Open to work together</span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 border border-primary/20 text-primary flex-shrink-0">
                  <Mail size={18} />
                </div>
                <a
                  href="mailto:amentsehaie2@gmail.com"
                  className="text-white/80 hover:text-primary transition-colors duration-300 break-all"
                >
                  amentsehaie2@gmail.com
                </a>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-5">
                  Find me on
                </p>
                <div className="flex flex-col gap-3">
                  {SOCIAL_LINKS.map((link) => (
                    <a
                      key={link.id}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 w-fit"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white/60 group-hover:bg-primary/10 group-hover:border-primary/30 group-hover:text-primary transition-all duration-300">
                        {link.icon}
                      </div>
                      <span className="text-white/60 group-hover:text-white transition-colors duration-300 text-sm">
                        {link.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};
