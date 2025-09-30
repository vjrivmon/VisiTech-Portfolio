export default function TechStack() {
  const technologies = {
    Languages: ['Python', 'JavaScript', 'TypeScript', 'C++', 'C#', 'Java', 'PHP', 'SQL', 'Bash'],
    'Frameworks & Tools': ['React', 'Next.js', 'Node.js', 'ROS2', 'Unity', 'Docker', 'Git'],
    Databases: ['PostgreSQL', 'MongoDB', 'Firebase', 'MariaDB'],
    Cloud: ['AWS', 'Vercel', 'GitHub Actions'],
    Hardware: ['Arduino', 'Raspberry Pi', 'ESP32'],
  };

  return (
    <section className="section">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Tech Stack
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I work with to build innovative solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(technologies).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-4">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm rounded-full bg-muted hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}