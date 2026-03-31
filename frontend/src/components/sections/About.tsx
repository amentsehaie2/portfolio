import { Users, Target, Activity } from 'lucide-react';
import { FadeIn } from '../animations/FadeIn';

export const About = () => {
  const values = [
    {
      id: 'social',
      title: 'Strong Communicator',
      description: 'I communicate clearly, am open to feedback, and enjoy collaborating to achieve the best results.',
      icon: <Users className="w-8 h-8 text-primary group-hover:text-white transition-colors" />,
    },
    {
      id: 'goal-oriented',
      title: 'Goal-Oriented',
      description: 'Focused on the end result. I analyze problems thoroughly and work methodically towards the solution.',
      icon: <Target className="w-8 h-8 text-secondary group-hover:text-white transition-colors" />,
    },
    {
      id: 'cooperative',
      title: 'Cooperative',
      description: 'A team player who values synergy. Together we achieve more than alone.',
      icon: <Activity className="w-8 h-8 text-accent group-hover:text-white transition-colors" />,
    },
  ];

  return (
    <section id="about" className="relative z-10 py-24 px-4 bg-dark/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        
        <FadeIn direction="up" className="mb-16 md:mb-24 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-light mb-4">
            About <span className="font-semibold text-primary">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto md:mx-0 rounded-full" />
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Text Content - 7 columns */}
          <div className="lg:col-span-7 space-y-8">
            <FadeIn delay={0.1}>
              <h3 className="text-2xl font-light text-white/90 leading-tight">
                My mission is to build digital experiences for companies or individuals that are not only functional, but also intuitive, visually striking, and performant.
              </h3>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg text-white/70 leading-relaxed font-light">
                I am a passionate software developer with a strong foundation in modern web technologies. My journey in development has taught me that great software is about solving real problems for people. I focus on writing clean, scalable code and turning complex requirements into seamless, user-centric applications.
                <br /><br />
                Whether it's crafting a smooth frontend interface or designing robust backend logic, I bring dedication and a detail-oriented mindset to every project I undertake.
              </p>
            </FadeIn>
          </div>

          {/* Values Cards - 5 columns */}
          <div className="lg:col-span-5 space-y-6">
            {values.map((value, index) => (
              <FadeIn key={value.id} delay={0.3 + index * 0.1} direction="left">
                <div className="group flex items-start gap-4 p-6 rounded-2xl bg-dark-lighter border border-white/5 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,153,255,0.15)] hover:-translate-y-1">
                  <div className="p-3 rounded-xl bg-dark border border-white/5 group-hover:bg-primary transition-colors duration-300 flex-shrink-0">
                    {value.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-medium text-white/90 mb-2">{value.title}</h4>
                    <p className="text-white/60 text-sm leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
