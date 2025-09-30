export const metadata = {
  title: 'About',
  description: 'Learn more about Vicente Rivas Monferrer - Backend Developer, Software Developer & Scrum Master',
};

export default function AboutPage() {
  const skills = {
    'Programming Languages': [
      { name: 'Python', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'TypeScript', level: 80 },
      { name: 'C++', level: 75 },
      { name: 'Java', level: 70 },
      { name: 'PHP', level: 65 },
    ],
    'Frameworks & Libraries': [
      { name: 'React', level: 80 },
      { name: 'Next.js', level: 75 },
      { name: 'Node.js', level: 85 },
      { name: 'ROS2', level: 70 },
      { name: 'Unity', level: 65 },
    ],
    'DevOps & Tools': [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 75 },
      { name: 'AWS', level: 65 },
      { name: 'CI/CD', level: 70 },
      { name: 'Linux', level: 80 },
    ],
  };

  const education = [
    {
      degree: 'Grado en Tecnologías Interactivas',
      institution: 'UPV Campus de Gandía',
      period: '2022 - Present',
      status: 'In Progress',
    },
    {
      degree: 'Bootcamp de DevOps',
      institution: 'Código Facilito',
      period: '2024 - 2025',
      status: 'In Progress',
    },
    {
      degree: 'Grado en Videojuegos y Experiencias Interactivas',
      institution: 'Florida Universitaria',
      period: '2020 - 2022',
      status: 'Completed',
    },
  ];

  const achievements = [
    {
      title: 'Campeón Telefónica: Líderes Digitales Universitarios',
      date: 'April 2025',
      description: 'First place in the university digital leaders competition',
    },
    {
      title: 'Hackathon eMobility Valencia',
      date: 'September 2023',
      description: 'Developed innovative solutions for city mobility challenges',
    },
    {
      title: 'Campus Salud Gandía',
      date: 'April 2023',
      description: 'Created healthcare solutions in a competitive environment',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="section">
        <div className="section-container">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              About Me
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Passionate about technology and innovation, specialized in AI, Robotics, IoT, and DevOps.
              Always learning, always building.
            </p>
          </div>

          {/* Bio Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="prose prose-lg dark:prose-invert mx-auto">
              <p>
                Soy un joven estudiante de último año que me apasiona el mundo de las tecnologías software.
                Me adapto a cualquier entorno de desarrollo y soy capaz de sacar la mejor versión de mi
                colaborando y liderando un equipo de trabajo.
              </p>
              <p>
                Currently pursuing my degree in Interactive Technologies at UPV while working on exciting
                projects like AidGuide, a robotic guide system for visually impaired individuals. My journey
                spans from game development with Unity to building IoT solutions with Arduino and Raspberry Pi,
                and now focusing on AI, robotics with ROS2, and modern web development.
              </p>
              <p>
                As a Scrum Master and team leader in multiple projects, I&apos;ve learned the importance of
                effective communication, agile methodologies, and the power of collaboration in achieving
                exceptional results.
              </p>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Technical Skills</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className="space-y-4">
                  <h3 className="text-lg font-semibold mb-4">{category}</h3>
                  {items.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Education</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {education.map((edu, index) => (
                <div key={index} className="p-6 rounded-lg border bg-card">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      edu.status === 'Completed'
                        ? 'bg-green-500/10 text-green-500'
                        : 'bg-blue-500/10 text-blue-500'
                    }`}>
                      {edu.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground">{edu.period}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="p-6 rounded-lg border bg-card">
                  <div className="flex items-center mb-3">
                    <svg className="h-6 w-6 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm text-muted-foreground">{achievement.date}</span>
                  </div>
                  <h3 className="font-semibold mb-2">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Languages Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Languages</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="text-center p-4 rounded-lg border bg-card">
                <h3 className="font-semibold">Español</h3>
                <p className="text-sm text-muted-foreground">Native</p>
              </div>
              <div className="text-center p-4 rounded-lg border bg-card">
                <h3 className="font-semibold">Valenciano</h3>
                <p className="text-sm text-muted-foreground">Native</p>
              </div>
              <div className="text-center p-4 rounded-lg border bg-card">
                <h3 className="font-semibold">English</h3>
                <p className="text-sm text-muted-foreground">B2</p>
              </div>
              <div className="text-center p-4 rounded-lg border bg-card">
                <h3 className="font-semibold">Français</h3>
                <p className="text-sm text-muted-foreground">B1</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}