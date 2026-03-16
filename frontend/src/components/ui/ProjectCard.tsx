import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from './Button';

export interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  outcomes?: string;
}

export const ProjectCard = ({
  title,
  description,
  tags,
  imageUrl,
  liveUrl,
  githubUrl,
  outcomes,
}: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-xl bg-dark-lighter border border-white/5 transition-all hover:border-primary/50 hover:shadow-[0_0_30px_rgba(0,153,255,0.15)] flex flex-col h-full"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale-[50%] group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-lighter to-transparent" />
      </div>

      <div className="flex flex-col flex-grow p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-white/70 mb-4 flex-grow">{description}</p>
        
        {outcomes && (
          <p className="text-sm text-secondary mb-4 italic">"{outcomes}"</p>
        )}

        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-medium rounded-md bg-white/5 text-white/80 border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-4 mt-auto">
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button variant="primary" className="w-full gap-2">
                <ExternalLink size={18} />
                <span>Live Demo</span>
              </Button>
            </a>
          )}
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button variant="secondary" className="w-full gap-2 overflow-hidden px-2">
                <Github size={18} className="flex-shrink-0" />
                <span className="truncate">View Project</span>
              </Button>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};
