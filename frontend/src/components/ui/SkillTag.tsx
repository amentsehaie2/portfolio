import { motion } from 'framer-motion';

export interface SkillTagProps {
  label: string;
  icon?: React.ReactNode;
}

export const SkillTag = ({ label, icon }: SkillTagProps) => {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 rounded-full bg-dark-lighter px-4 py-2 border border-white/10 text-white/90 transition-all hover:bg-primary/20 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(0,153,255,0.4)] hover:text-white"
    >
      {icon && <span className="text-primary">{icon}</span>}
      <span className="text-sm font-medium">{label}</span>
    </motion.div>
  );
};
