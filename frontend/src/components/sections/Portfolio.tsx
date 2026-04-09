import { FadeIn } from '../../animations/FadeIn';
import { ProjectCard } from '../ui/ProjectCard';
import sonicLensImg from '../../assets/images/sonic_lens_showcase.png';


const SONIC_LENS_URL = 'https://github.com/amentsehaie2/sonic_lens';
const OFFICE_URL = 'https://github.com/amentsehaie2/Calander_WebApp';
const SCOOTER_CLI_URL = 'https://github.com/amentsehaie2/SQ-UM_24-25';

const projects = [
  {
    id: 'sonic-lens',
    title: 'Sonic Lens',
    description:
      'An AI-powered Chrome extension that automatically gets the lyrics from songs, saving you time by extracting the key, chord tones and other musical insights from any video in seconds.',
    tags: ['Chrome Extension', 'Cloudflare', 'React', 'TypeScript'],
    imageUrl: sonicLensImg,
    githubUrl: SONIC_LENS_URL,
    outcomes:
      'Makes learning new songs a piece of cake.',
  },
  {
    id: 'office',
    title: 'Office',
    description:
      'A full-stack office management system for tracking employees, tasks, and schedules. Built with a clean REST API and a responsive React frontend for day-to-day team management.',
    tags: ['React', 'C#', 'ASP.NET Core', 'SQLite', 'REST API', 'TypeScript'],
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    githubUrl: OFFICE_URL,
    outcomes:
      'Streamlines team operations with a centralised, real-time management dashboard.',
  },
  {
    id: 'scooter-cli',
    title: 'Scooter CLI',
    description:
      'A security-heavy command-line application for managing a scooter fleet. Features role-based access control, encrypted data storage, and comprehensive audit logging.',
    tags: ['Python', 'CLI', 'Cryptography', 'Security', 'SQLite'],
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    githubUrl: SCOOTER_CLI_URL,
    outcomes:
      'Demonstrates a security-first architecture with robust authentication and encryption.',
  },
];

export const Portfolio = () => {
  return (
    <section id="work" className="relative z-10 py-24 px-4 bg-dark/90">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="mb-16 text-center md:text-left">
          <FadeIn direction="up">
            <h2 className="text-3xl md:text-5xl font-light mb-4">
              My <span className="font-semibold text-primary">Work</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto md:mx-0 rounded-full" />
          </FadeIn>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <FadeIn key={project.id} delay={index * 0.15} direction="up" fullWidth>
              <ProjectCard
                title={project.title}
                description={project.description}
                tags={project.tags}
                imageUrl={project.imageUrl}
                githubUrl={project.githubUrl}
                outcomes={project.outcomes}
              />
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
};
