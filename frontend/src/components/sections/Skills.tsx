import {
  Code2,
  Braces,
  FileCode2,
  Layers,
  Server,
  Database,
  GitBranch,
  Github,
  Box,
  Terminal,
  Rocket,
  MessageCircle,
  Users,
  Target,
  Activity,
} from 'lucide-react';
import { FadeIn } from '../../animations/FadeIn';
import { SkillTag } from '../ui/SkillTag';

interface Skill {
  label: string;
  icon: React.ReactNode;
}

interface SkillCategory {
  id: string;
  title: string;
  skills: Skill[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'technical',
    title: 'Technical Skills',
    skills: [
      { label: 'HTML', icon: <Braces size={16} /> },
      { label: 'CSS', icon: <Braces size={16} /> },
      { label: 'JavaScript', icon: <Braces size={16} /> },
      { label: 'TypeScript', icon: <FileCode2 size={16} /> },
      { label: 'Python', icon: <Code2 size={16} /> },
      { label: 'C#', icon: <Code2 size={16} /> },
      { label: 'React', icon: <Layers size={16} /> },
      { label: 'Node.js', icon: <Server size={16} /> },
      { label: 'ASP.NET Core', icon: <Rocket size={16} /> },
      { label: 'Flask', icon: <Rocket size={16} /> },
      { label: 'Django', icon: <Rocket size={16} /> },
      { label: 'PostgreSQL', icon: <Database size={16} /> },
      { label: 'MongoDB', icon: <Database size={16} /> },
      { label: 'SQLite', icon: <Database size={16} /> },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Technologies',
    skills: [
      { label: 'Git', icon: <GitBranch size={16} /> },
      { label: 'GitHub', icon: <Github size={16} /> },
      { label: 'Docker', icon: <Box size={16} /> },
      { label: 'VS Code', icon: <Terminal size={16} /> },
      { label: 'Antigravity', icon: <Terminal size={16} /> },
      { label: 'Postman', icon: <Server size={16} /> },
      { label: 'Vercel', icon: <Rocket size={16} /> },
      { label: 'Jupyter Notebook', icon: <Terminal size={16} /> },
    ],
  },
  {
    id: 'soft',
    title: 'Soft Skills',
    skills: [
      { label: 'Communication', icon: <MessageCircle size={16} /> },
      { label: 'Team Collaboration', icon: <Users size={16} /> },
      { label: 'Problem Solving', icon: <Target size={16} /> },
      { label: 'Socially Strong', icon: <Users size={16} /> },
      { label: 'Goal-oriented', icon: <Target size={16} /> },
      { label: 'Cooperative', icon: <Activity size={16} /> },
    ],
  },
];

export const Skills = () => {
  return (
    <section id="skills" className="relative z-10 py-24 px-4 bg-dark/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="mb-16 text-center md:text-left">
          <FadeIn direction="up">
            <h2 className="text-3xl md:text-5xl font-light mb-4">
              My <span className="font-semibold text-primary">Skills</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto md:mx-0 rounded-full" />
          </FadeIn>
        </div>

        {/* Categories */}
        <div className="space-y-14">
          {SKILL_CATEGORIES.map((category, catIndex) => (
            <FadeIn key={category.id} delay={catIndex * 0.1} direction="up">
              <div>
                {/* Category Label */}
                <p className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-5">
                  {category.title}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <FadeIn
                      key={skill.label}
                      delay={catIndex * 0.1 + skillIndex * 0.05}
                      direction="up"
                    >
                      <SkillTag label={skill.label} icon={skill.icon} />
                    </FadeIn>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
};
