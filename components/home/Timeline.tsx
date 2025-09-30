export default function Timeline() {
  const events = [
    {
      year: 2025,
      title: 'AidGuide - Robotic Guide',
      description: 'Leading AI robotics project for visually impaired assistance',
      type: 'project',
    },
    {
      year: 2025,
      title: 'Telefónica Digital Leaders Champion',
      description: 'Won first place in university digital leaders competition',
      type: 'achievement',
    },
    {
      year: 2024,
      title: 'DevOps Bootcamp',
      description: 'Started comprehensive DevOps training at Código Facilito',
      type: 'education',
    },
    {
      year: 2024,
      title: 'PoliGames',
      description: 'Team leader for Unity game development project',
      type: 'project',
    },
    {
      year: 2023,
      title: 'Hackathon eMobility Valencia',
      description: 'Participated in city mobility solutions hackathon',
      type: 'achievement',
    },
    {
      year: 2022,
      title: 'Interactive Technologies Degree',
      description: 'Started degree at UPV Campus de Gandía',
      type: 'education',
    },
  ];

  const typeColors: Record<string, string> = {
    project: 'bg-blue-500',
    achievement: 'bg-green-500',
    education: 'bg-purple-500',
  };

  return (
    <section className="section bg-muted/30">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Journey Timeline
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My academic and professional milestones
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border" />

            {/* Events */}
            {events.map((event, index) => (
              <div
                key={index}
                className={cn(
                  "relative flex items-center mb-8",
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                {/* Content */}
                <div className="flex-1 md:w-1/2 ml-12 md:ml-0">
                  <div
                    className={cn(
                      "p-6 rounded-lg border bg-card",
                      index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                    )}
                  >
                    <span className="text-sm text-muted-foreground">
                      {event.year}
                    </span>
                    <h3 className="text-lg font-semibold mt-1 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Timeline dot */}
                <div
                  className={cn(
                    "absolute left-4 md:left-1/2 w-8 h-8 rounded-full flex items-center justify-center transform -translate-x-1/2",
                    typeColors[event.type],
                    "ring-4 ring-background"
                  )}
                >
                  <span className="text-white text-xs font-bold">
                    {event.year.toString().slice(-2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}