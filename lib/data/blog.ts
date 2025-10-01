import { BlogPost } from '../types/blog';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'mas-alla-de-docker',
    title: {
      es: 'Más allá de Docker: cómo un contenedor puede cambiar tu forma de pensar el software',
      en: 'Beyond Docker: how a container can change the way you think about software'
    },
    subtitle: {
      es: 'De "funciona en mi máquina" a la portabilidad universal',
      en: 'From "works on my machine" to universal portability'
    },
    excerpt: {
      es: 'La primera vez que usé Docker, convertí un proyecto PHP caótico en una imagen reproducible. Descubre cómo los contenedores no son solo una herramienta, sino un cambio mental hacia la portabilidad.',
      en: 'The first time I used Docker, I turned a chaotic PHP project into a reproducible image. Discover how containers are not just a tool, but a mental shift towards portability.'
    },
    content: {
      es: `# Más allá de Docker

## Mi primer encuentro con Docker

Recuerdo perfectamente la primera vez que usé Docker. Tenía un proyecto PHP caótico con dependencias imposibles de rastrear, diferentes versiones de PHP en desarrollo y producción, y el eterno "funciona en mi máquina" que tanto conocemos.

La magia ocurrió cuando ejecuté \`docker build\` por primera vez. De repente, todo mi entorno estaba encapsulado, reproducible, portable. Era como empaquetar no solo el código, sino todo el contexto de ejecución.

## ¿Qué es realmente un contenedor?

Un contenedor es una unidad ligera que empaqueta tu aplicación, todas sus librerías y configuraciones, proporcionando consistencia en cualquier sistema. A diferencia de las máquinas virtuales, los contenedores comparten el kernel del sistema operativo, haciéndolos increíblemente eficientes.

### Beneficios clave:

- **Portabilidad**: Funciona igual en desarrollo, staging y producción
- **Aislamiento**: Cada contenedor es un entorno aislado
- **Consistencia**: "Si funciona en Docker, funciona en todas partes"
- **Eficiencia**: Arranque en segundos, no minutos

## Microservicios y Kubernetes

Los contenedores facilitan los microservicios, permitiendo que cada servicio sea aislado y coordinado independientemente. Kubernetes lleva esto al siguiente nivel, automatizando la orquestación de contenedores a escala.

## Buenas prácticas

### 1. Adopta CI/CD
Automatiza la construcción y despliegue. Evita el "Frankenstein code" que parchas a mano. Usa GitHub Actions, GitLab CI o Jenkins.

### 2. Diseña imágenes livianas
- Usa imágenes base pequeñas (Alpine Linux)
- Implementa multistage builds
- Minimiza el número de capas
- Elimina dependencias de desarrollo en producción

### 3. Healthchecks y Readiness Probes
Configura healthchecks para que Kubernetes sepa cuándo tu contenedor está listo y funcionando correctamente.

### 4. Política de logs coherente
- Usa stdout/stderr para logs
- Implementa niveles de log apropiados
- Evita logs excesivos que afecten rendimiento

## Herramientas recomendadas

- **Docker**: El estándar de facto
- **Podman**: Alternativa sin daemon
- **Kubernetes**: Orquestación a escala
- **Docker Compose**: Perfecto para desarrollo local
- **Trivy**: Escaneo de seguridad de imágenes

## Conclusión

Los contenedores no son solo una moda tecnológica, son un cambio fundamental en cómo pensamos sobre el software. Nos obligan a ser más deliberados sobre las dependencias, más conscientes del entorno de ejecución, y más rigurosos en nuestra definición de "listo para producción".

¿Realmente aprovechas la portabilidad y escalabilidad de contenedores en tu stack actual? Te invito a reflexionar y compartir tu historia.`,
      en: `# Beyond Docker

## My first encounter with Docker

I perfectly remember the first time I used Docker. I had a chaotic PHP project with impossible-to-track dependencies, different PHP versions in development and production, and the eternal "works on my machine" that we all know.

The magic happened when I ran \`docker build\` for the first time. Suddenly, my entire environment was encapsulated, reproducible, portable. It was like packaging not just the code, but the entire execution context.

## What is a container really?

A container is a lightweight unit that packages your application, all its libraries and configurations, ensuring consistency across any system. Unlike virtual machines, containers share the operating system kernel, making them incredibly efficient.

### Key benefits:

- **Portability**: Works the same in dev, staging and production
- **Isolation**: Each container is an isolated environment
- **Consistency**: "If it works in Docker, it works everywhere"
- **Efficiency**: Boot in seconds, not minutes

## Microservices and Kubernetes

Containers facilitate microservices, allowing each service to be isolated and coordinated independently. Kubernetes takes this to the next level, automating container orchestration at scale.

## Best practices

### 1. Adopt CI/CD
Automate build and deployment. Avoid "Frankenstein code" that you patch by hand.

### 2. Design lean images
- Use small base images (Alpine Linux)
- Implement multistage builds
- Minimize layer count
- Remove dev dependencies in production

### 3. Healthchecks and Readiness Probes
Configure healthchecks so Kubernetes knows when your container is ready and working.

### 4. Consistent logging strategy
- Use stdout/stderr for logs
- Implement appropriate log levels
- Avoid excessive logging

## Recommended tools

- **Docker**: The de facto standard
- **Podman**: Daemon-less alternative
- **Kubernetes**: Orchestration at scale
- **Docker Compose**: Perfect for local development
- **Trivy**: Image security scanning

## Conclusion

Containers are not just a tech fad; they're a fundamental shift in how we think about software. They force us to be more deliberate about dependencies, more aware of the execution environment, and more rigorous in our definition of "production-ready".

Do you really leverage container portability and scalability in your current stack? I invite you to reflect and share your story.`
    },
    date: '2025-01-20',
    readTime: 8,
    category: 'devops',
    tags: ['Docker', 'Containers', 'Kubernetes', 'DevOps', 'Microservices'],
    featured: true
  },
  {
    id: '2',
    slug: 'ingenieria-de-prompts',
    title: {
      es: 'Ingeniería de Prompts: el arte olvidado del software moderno',
      en: 'Prompt Engineering: the forgotten art of modern software'
    },
    subtitle: {
      es: 'De trucos casuales a disciplina de software',
      en: 'From casual tricks to software discipline'
    },
    excerpt: {
      es: 'La prompt engineering ha evolucionado de ser un simple truco a convertirse en una disciplina esencial del desarrollo de software. Descubre cómo escribir prompts estructurados, testeables y mantenibles.',
      en: 'Prompt engineering has evolved from a simple trick to an essential software development discipline. Learn how to write structured, testable and maintainable prompts.'
    },
    content: {
      es: `# Ingeniería de Prompts

## La evolución de un arte

La ingeniería de prompts ha pasado de ser un truco casual a convertirse en una disciplina seria de software. Los prompts deben ser estructurados, testeables y mantenibles, igual que cualquier otro código en producción.

## Malos vs. Buenos Prompts

### ❌ Prompts malos
\`\`\`
"Escribe un post sobre microservicios"
\`\`\`

Este prompt es vago, sin contexto, y probablemente generará contenido genérico.

### ✅ Prompts buenos
\`\`\`
"Actúa como un arquitecto de software senior con 10 años de experiencia.
Escribe un artículo técnico de 1500 palabras sobre patrones de microservicios.
Incluye:
- Ventajas y desventajas
- Casos de uso reales
- Código de ejemplo en Python
- Referencias a arquitecturas conocidas (Netflix, Amazon)
Usa un tono profesional pero accesible."
\`\`\`

## Principios fundamentales

### 1. Trata los prompts como código
- **Modulariza**: Divide prompts complejos en componentes reutilizables
- **Versiona**: Usa Git para rastrear cambios
- **Testea**: Valida outputs con casos de prueba

### 2. Estructura clara
Define:
- **Rol**: Quién debe actuar la IA
- **Contexto**: Información de fondo necesaria
- **Tarea**: Qué debe hacer exactamente
- **Formato**: Cómo debe ser la salida
- **Restricciones**: Límites y consideraciones

### 3. Separación de capas
- **Sistema**: Comportamiento fundamental de la IA
- **Organización**: Reglas específicas de tu empresa
- **Usuario**: Consultas específicas

### 4. Declaración explícita
No dejes que la IA "adivine". Proporciona todos los datos necesarios explícitamente.

### 5. Manager Layer
Añade una capa de validación que verifique acciones antes de ejecutarlas. Especialmente crítico en operaciones que modifican datos.

## Patrones útiles

### Few-shot learning
\`\`\`
Analiza estos ejemplos y aplica el mismo patrón:

Entrada: "Usuario inactivo por 30 días"
Salida: { action: "send_reminder", priority: "low" }

Entrada: "Error crítico en producción"
Salida: { action: "alert_team", priority: "critical" }

Ahora analiza: "Límite de API alcanzado"
\`\`\`

### Chain-of-thought
\`\`\`
Resuelve este problema paso a paso:
1. Identifica las variables
2. Define las restricciones
3. Calcula la solución
4. Verifica el resultado
\`\`\`

## Herramientas y frameworks

- **LangChain**: Framework para construir aplicaciones con LLMs
- **LlamaIndex**: Para RAG (Retrieval-Augmented Generation)
- **Semantic Kernel**: De Microsoft, para integración empresarial
- **Guardrails**: Validación de outputs

## Mejores prácticas

1. **Documenta tus prompts**: Comenta qué hace cada sección
2. **Usa templates**: Parametriza para reutilización
3. **Mide y optimiza**: Trackea costos, latencia y calidad
4. **Maneja errores**: Implementa fallbacks y retries
5. **Seguridad**: Sanitiza inputs, valida outputs

## Conclusión

La ingeniería de prompts es ingeniería de software. Aplica los mismos principios: modularidad, testing, documentación y versionado. No son scripts casuales, son componentes críticos de tu sistema.`,
      en: `# Prompt Engineering

## The evolution of an art

Prompt engineering has evolved from a casual trick to a serious software discipline. Prompts must be structured, testable and maintainable, just like any other production code.

## Bad vs. Good Prompts

### ❌ Bad prompts
\`\`\`
"Write a blog about microservices"
\`\`\`

This prompt is vague, contextless, and will likely generate generic content.

### ✅ Good prompts
\`\`\`
"Act as a senior software architect with 10 years of experience.
Write a 1500-word technical article about microservice patterns.
Include:
- Advantages and disadvantages
- Real-world use cases
- Example code in Python
- References to known architectures (Netflix, Amazon)
Use a professional but accessible tone."
\`\`\`

## Core principles

### 1. Treat prompts like code
- **Modularize**: Break complex prompts into reusable components
- **Version**: Use Git to track changes
- **Test**: Validate outputs with test cases

### 2. Clear structure
Define:
- **Role**: Who the AI should act as
- **Context**: Necessary background information
- **Task**: What exactly it should do
- **Format**: How the output should be structured
- **Constraints**: Limits and considerations

### 3. Layer separation
- **System**: Fundamental AI behavior
- **Organization**: Company-specific rules
- **User**: Specific queries

### 4. Explicit declaration
Don't let the AI "guess". Provide all necessary data explicitly.

### 5. Manager Layer
Add a validation layer that verifies actions before executing them. Especially critical in operations that modify data.

## Useful patterns

### Few-shot learning
\`\`\`
Analyze these examples and apply the same pattern:

Input: "User inactive for 30 days"
Output: { action: "send_reminder", priority: "low" }

Input: "Critical error in production"
Output: { action: "alert_team", priority: "critical" }

Now analyze: "API limit reached"
\`\`\`

### Chain-of-thought
\`\`\`
Solve this problem step by step:
1. Identify the variables
2. Define the constraints
3. Calculate the solution
4. Verify the result
\`\`\`

## Tools and frameworks

- **LangChain**: Framework for building LLM applications
- **LlamaIndex**: For RAG (Retrieval-Augmented Generation)
- **Semantic Kernel**: From Microsoft, for enterprise integration
- **Guardrails**: Output validation

## Best practices

1. **Document your prompts**: Comment what each section does
2. **Use templates**: Parametrize for reusability
3. **Measure and optimize**: Track costs, latency and quality
4. **Handle errors**: Implement fallbacks and retries
5. **Security**: Sanitize inputs, validate outputs

## Conclusion

Prompt engineering is software engineering. Apply the same principles: modularity, testing, documentation and versioning. These aren't casual scripts—they're critical system components.`
    },
    date: '2025-01-18',
    readTime: 7,
    category: 'ai',
    tags: ['AI', 'LLM', 'Prompt Engineering', 'LangChain', 'GPT'],
    featured: true
  },
  {
    id: '3',
    slug: 'microservicios-y-scouts',
    title: {
      es: '¿Qué tiene en común un microservicio y un campamento scout?',
      en: 'What does a microservice have in common with a scout camp?'
    },
    subtitle: {
      es: 'Equipos pequeños, autónomos y coordinados',
      en: 'Small, autonomous and coordinated teams'
    },
    excerpt: {
      es: 'Los microservicios son como patrullas de scouts: equipos pequeños, autónomos, con responsabilidades claras, que se comunican entre sí para lograr un objetivo común.',
      en: 'Microservices are like scout patrols: small, autonomous teams with clear responsibilities that communicate with each other to achieve a common goal.'
    },
    content: {
      es: `# Microservicios y Scouts

## La metáfora del campamento

Imagina un campamento scout. Tienes múltiples patrullas, cada una responsable de una tarea específica: una cocina, otra monta las tiendas, otra organiza actividades. Cada patrulla es autónoma pero sigue las reglas generales del campamento y se coordina con las demás.

Así funcionan los microservicios.

## Fundamento técnico

Los microservicios permiten que una organización se divida en equipos pequeños, débilmente acoplados pero autónomos y multidisciplinares, que entregan cambios rápidos y fiables.

### Beneficios clave:

- **Autonomía del equipo**: Cada equipo desarrolla, testea y despliega independientemente
- **Escalabilidad específica**: Escala solo los servicios que lo necesitan
- **Tecnología heterogénea**: Cada servicio puede usar el stack más apropiado
- **Resiliencia**: Si un servicio falla, los demás continúan funcionando

## La analogía detallada

### Campamento base: API Gateway
El API Gateway es como la entrada del campamento. Organiza y coordina todas las peticiones, redirigiendo a cada patrulla (servicio) según corresponda.

### Patrullas: Microservicios
Cada patrulla (servicio) tiene:
- Responsabilidad clara sobre un subdominio
- Libertad para organizarse internamente
- Su propio "equipamiento" (base de datos, tecnología)
- Comunicación estandarizada con otras patrullas

### Protocolos de comunicación
- **Walkie-talkies (HTTP/REST)**: Comunicación síncrona y directa
- **Señales de humo (Eventos)**: Comunicación asíncrona
- **Tablón de anuncios (Message Queue)**: Mensajería persistente

### Juegos colaborativos
Como en los juegos scouts, los servicios colaboran en patrones:
- **Saga Pattern**: Como una carrera de relevos
- **CQRS**: Separación entre leer y escribir
- **Event Sourcing**: Registro de todas las acciones

## Lecciones y riesgos

### ⚠️ No todo debe ser un microservicio
El exceso de microservicios aumenta exponencialmente la complejidad. Empezar con un monolito bien estructurado es válido.

### ⚠️ Transacciones distribuidas
Las operaciones que abarcan múltiples servicios son complejas. Los patrones de Saga ayudan pero requieren diseño cuidadoso.

### ⚠️ Observabilidad es crítica
Sin tracing distribuido (OpenTelemetry, Jaeger), depurar problemas es como buscar una aguja en un pajar.

## Herramientas y frameworks

### Backend frameworks:
- **Spring Boot + Spring Cloud** (Java)
- **ASP.NET + Dapr** (.NET)
- **NestJS** (Node.js)
- **FastAPI** (Python)

### Orquestación:
- **Kubernetes**: El orchestrador estándar
- **Istio/Linkerd**: Service Mesh para gestión de tráfico

### Mensajería:
- **Apache Kafka**: Event streaming
- **RabbitMQ**: Message queue tradicional
- **Redis Streams**: Alternativa ligera

### Bases de datos:
- Cada servicio debe tener su propia BD
- Usa event-sourcing para mantener consistencia

## Conclusión

Los microservicios, como un campamento scout bien organizado, funcionan cuando cada equipo tiene autonomía pero comparte objetivos y protocolos comunes. La clave está en el balance: suficiente independencia para agilidad, suficiente coordinación para coherencia.`,
      en: `# Microservices and Scouts

## The camp metaphor

Imagine a scout camp. You have multiple patrols, each responsible for a specific task: one cooks, another sets up tents, another organizes activities. Each patrol is autonomous but follows general camp rules and coordinates with others.

That's how microservices work.

## Technical foundation

Microservices enable organizations to be split into small, loosely coupled cross-functional teams delivering rapid, reliable changes.

### Key benefits:

- **Team autonomy**: Each team develops, tests and deploys independently
- **Specific scalability**: Scale only the services that need it
- **Heterogeneous technology**: Each service can use the most appropriate stack
- **Resilience**: If one service fails, others continue functioning

## Detailed analogy

### Base camp: API Gateway
The API Gateway is like the camp entrance. It organizes and coordinates all requests, redirecting to each patrol (service) accordingly.

### Patrols: Microservices
Each patrol (service) has:
- Clear responsibility over a subdomain
- Freedom to organize internally
- Its own "equipment" (database, technology)
- Standardized communication with other patrols

### Communication protocols
- **Walkie-talkies (HTTP/REST)**: Synchronous, direct communication
- **Smoke signals (Events)**: Asynchronous communication
- **Bulletin board (Message Queue)**: Persistent messaging

### Collaborative games
Like scout games, services collaborate in patterns:
- **Saga Pattern**: Like a relay race
- **CQRS**: Separation between reading and writing
- **Event Sourcing**: Recording all actions

## Lessons and risks

### ⚠️ Not everything should be a microservice
Excessive microservices exponentially increase complexity. Starting with a well-structured monolith is valid.

### ⚠️ Distributed transactions
Operations spanning multiple services are complex. Saga patterns help but require careful design.

### ⚠️ Observability is critical
Without distributed tracing (OpenTelemetry, Jaeger), debugging is like finding a needle in a haystack.

## Tools and frameworks

### Backend frameworks:
- **Spring Boot + Spring Cloud** (Java)
- **ASP.NET + Dapr** (.NET)
- **NestJS** (Node.js)
- **FastAPI** (Python)

### Orchestration:
- **Kubernetes**: Standard orchestrator
- **Istio/Linkerd**: Service Mesh for traffic management

### Messaging:
- **Apache Kafka**: Event streaming
- **RabbitMQ**: Traditional message queue
- **Redis Streams**: Lightweight alternative

### Databases:
- Each service should have its own DB
- Use event-sourcing to maintain consistency

## Conclusion

Microservices, like a well-organized scout camp, work when each team has autonomy but shares common objectives and protocols. The key is balance: enough independence for agility, enough coordination for coherence.`
    },
    date: '2025-01-15',
    readTime: 9,
    category: 'architecture',
    tags: ['Microservices', 'Architecture', 'Kubernetes', 'Kafka', 'Spring Boot'],
    featured: false
  },
  {
    id: '4',
    slug: 'codigo-frankenstein',
    title: {
      es: 'El síndrome del código Frankenstein: por qué la escalabilidad empieza en el diseño',
      en: 'Frankenstein code syndrome: why scalability begins with design'
    },
    subtitle: {
      es: 'Cuando cada parche crea un nuevo problema',
      en: 'When every patch creates a new problem'
    },
    excerpt: {
      es: 'Un sistema parcheado y cosido con hacks se convierte en un monstruo difícil de mantener. La escalabilidad no se añade después, se diseña desde el principio.',
      en: 'A patchwork system sewn together with hacks becomes a maintenance monster. Scalability isn\'t added later—it\'s designed from the start.'
    },
    content: {
      es: `# El Código Frankenstein

## El monstruo que creamos

Frankenstein code es ese sistema que hemos parcheado tantas veces que ya no sabemos qué hace cada parte. Cada arreglo temporal se vuelve permanente, cada hack "por ahora" se queda para siempre, y cada nueva funcionalidad aumenta la complejidad exponencialmente.

Sin un diseño sólido, la escalabilidad se convierte en un monstruo imposible de controlar.

## Problemas comunes

### 1. Parches sin planificación
Cada parche aumenta la complejidad. Lo que empezó como un if temporal ahora es un laberinto de condicionales anidados.

### 2. Dev/Prod parity
Cuando el entorno de desarrollo difiere del de producción, aparecen bugs inesperados. "Funciona en mi máquina" deja de ser gracioso.

### 3. Dificultad para actualizar
El código espagueti hace imposible adoptar nuevas tecnologías. Estás atrapado en versiones antiguas por miedo a romper todo.

### 4. Deuda técnica exponencial
Cada decisión rápida aumenta la deuda. Eventualmente, el interés te consume.

## Buenas prácticas de arquitectura

### Diseño modular y SOLID
- **Single Responsibility**: Cada módulo una responsabilidad
- **Open/Closed**: Abierto a extensión, cerrado a modificación
- **Liskov Substitution**: Los componentes deben ser intercambiables
- **Interface Segregation**: Interfaces específicas, no genéricas
- **Dependency Inversion**: Depende de abstracciones, no de implementaciones

### Infrastructure as Code
\`\`\`yaml
# Ejemplo de IaC con Terraform
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"

  tags = {
    Name = "WebServer"
    Environment = "Production"
  }
}
\`\`\`

Beneficios:
- Reproducible en cualquier momento
- Versionado en Git
- Documentación viviente
- Reduce errores humanos

### Testing exhaustivo
- **Unit tests**: Prueba cada componente aislado
- **Integration tests**: Verifica la comunicación entre módulos
- **E2E tests**: Valida flujos completos
- **Load tests**: Asegura rendimiento bajo carga

### Clean Code y documentación
\`\`\`python
# ❌ Malo
def p(d):
    return d * 2

# ✅ Bueno
def calculate_doubled_price(original_price: float) -> float:
    """
    Calcula el precio con un markup del 100%.

    Args:
        original_price: Precio original del producto

    Returns:
        Precio final después de aplicar el markup
    """
    MARKUP_MULTIPLIER = 2
    return original_price * MARKUP_MULTIPLIER
\`\`\`

## Recursos y herramientas

### IaC (Infrastructure as Code):
- **Terraform**: Multi-cloud
- **Ansible**: Configuration management
- **Pulumi**: IaC con lenguajes de programación reales

### CI/CD:
- **Jenkins**: Open source, altamente configurable
- **GitLab CI**: Integrado con Git
- **GitHub Actions**: Simple y efectivo

### Arquitectura:
- **Hexagonal Architecture**: Separa lógica de negocio de infraestructura
- **Clean Architecture**: Capas con dependencias unidireccionales
- **C4 Model**: Diagramas de arquitectura en 4 niveles

## Conclusión

El código Frankenstein es evitable. La clave está en:
1. Diseñar antes de implementar
2. Automatizar todo lo automatizable
3. Testear exhaustivamente
4. Mantener el código limpio
5. Documentar las decisiones

Recuerda: **el tiempo que "ahorras" sin diseñar lo pagarás multiplicado en mantenimiento**.`,
      en: `# Frankenstein Code

## The monster we create

Frankenstein code is that system we've patched so many times we no longer know what each part does. Every temporary fix becomes permanent, every "just for now" hack stays forever, and every new feature exponentially increases complexity.

Without solid design, scalability becomes an uncontrollable monster.

## Common problems

### 1. Unplanned patches
Each patch increases complexity. What started as a temporary if is now a maze of nested conditionals.

### 2. Dev/Prod parity
When dev differs from production, unexpected bugs appear. "Works on my machine" stops being funny.

### 3. Difficulty updating
Spaghetti code makes adopting new technologies impossible. You're stuck on old versions for fear of breaking everything.

### 4. Exponential technical debt
Each quick decision increases debt. Eventually, the interest consumes you.

## Architecture best practices

### Modular design and SOLID
- **Single Responsibility**: Each module one responsibility
- **Open/Closed**: Open for extension, closed for modification
- **Liskov Substitution**: Components must be interchangeable
- **Interface Segregation**: Specific interfaces, not generic
- **Dependency Inversion**: Depend on abstractions, not implementations

### Infrastructure as Code
\`\`\`yaml
# IaC example with Terraform
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"

  tags = {
    Name = "WebServer"
    Environment = "Production"
  }
}
\`\`\`

Benefits:
- Reproducible anytime
- Versioned in Git
- Living documentation
- Reduces human errors

### Exhaustive testing
- **Unit tests**: Test each isolated component
- **Integration tests**: Verify communication between modules
- **E2E tests**: Validate complete flows
- **Load tests**: Ensure performance under load

### Clean code and documentation
\`\`\`python
# ❌ Bad
def p(d):
    return d * 2

# ✅ Good
def calculate_doubled_price(original_price: float) -> float:
    """
    Calculates price with 100% markup.

    Args:
        original_price: Original product price

    Returns:
        Final price after applying markup
    """
    MARKUP_MULTIPLIER = 2
    return original_price * MARKUP_MULTIPLIER
\`\`\`

## Resources and tools

### IaC (Infrastructure as Code):
- **Terraform**: Multi-cloud
- **Ansible**: Configuration management
- **Pulumi**: IaC with real programming languages

### CI/CD:
- **Jenkins**: Open source, highly configurable
- **GitLab CI**: Integrated with Git
- **GitHub Actions**: Simple and effective

### Architecture:
- **Hexagonal Architecture**: Separates business logic from infrastructure
- **Clean Architecture**: Layers with unidirectional dependencies
- **C4 Model**: Architecture diagrams in 4 levels

## Conclusion

Frankenstein code is avoidable. The key is:
1. Design before implementing
2. Automate everything automatable
3. Test exhaustively
4. Keep code clean
5. Document decisions

Remember: **the time you "save" by not designing, you'll pay multiplied in maintenance**.`
    },
    date: '2025-01-12',
    readTime: 10,
    category: 'architecture',
    tags: ['Architecture', 'Clean Code', 'SOLID', 'Technical Debt', 'IaC'],
    featured: false
  },
  {
    id: '5',
    slug: 'automatiza-o-muere',
    title: {
      es: 'Automatiza o muere: lecciones que aprendí intentando desplegar mi primer REST API',
      en: 'Automate or die: lessons I learned trying to deploy my first REST API'
    },
    excerpt: {
      es: 'Mi primer despliegue manual fue un desastre. Te cuento qué aprendí sobre CI/CD, Docker y por qué automatizar no es opcional.',
      en: 'My first manual deployment was a disaster. I tell you what I learned about CI/CD, Docker and why automation is not optional.'
    },
    content: {
      es: `# Automatiza o muere: lecciones que aprendí intentando desplegar mi primer REST API

## El desastre del despliegue manual

Era viernes por la tarde. Tenía mi primera REST API lista para producción. "¿Qué tan difícil puede ser?", pensé. Spoiler: muy difícil.

### El caos del primer intento

Conecté por SSH al servidor. Copié archivos manualmente con \`scp\`. Instalé dependencias. Configuré variables de entorno. Todo funcionaba... hasta que no.

El lunes, un bug crítico. Tenía que hacer hotfix. Repetir todo el proceso. 45 minutos después, el fix estaba en producción. Pero había sobreescrito una configuración importante. El servidor caído. Usuarios enfadados.

**Fue entonces cuando entendí: el despliegue manual no es valentía, es negligencia profesional.**

## La revelación: CI/CD no es lujo, es supervivencia

### ¿Qué es CI/CD realmente?

**Continuous Integration**: cada commit pasa tests automáticos
**Continuous Deployment**: código que pasa tests se despliega solo

No es magia. Es disciplina automatizada.

### Mi primer pipeline (GitHub Actions)

\`\`\`yaml
name: Deploy API

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Run tests
        run: npm test

      - name: Build Docker image
        run: docker build -t api:latest .

      - name: Push to registry
        run: docker push myregistry/api:latest

      - name: Deploy
        run: ssh user@server 'docker-compose pull && docker-compose up -d'
\`\`\`

**Resultado**: de 45 minutos de despliegue manual a 3 minutos automatizados. Cero errores humanos.

## Docker: la pieza que faltaba

### El problema de "en mi máquina funciona"

- Desarrollador: "Funciona en mi laptop"
- Servidor: Python 3.8 vs Python 3.10
- Servidor: falta una librería del sistema
- **Resultado**: 2 horas debuggeando diferencias de entorno

### La solución: contenedores

\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000
CMD ["node", "server.js"]
\`\`\`

**Lo que cambió**:
- Mismo entorno en desarrollo, staging y producción
- Deploy = \`docker-compose up\`
- Rollback = cambiar versión de imagen

## Lecciones aprendidas a golpes

### 1. Automatiza desde el día uno

No esperes a tener problemas. Tu primer proyecto merece CI/CD.

**Mínimo viable**:
- Tests automáticos en cada commit
- Deploy con un comando
- Rollback fácil

### 2. Infrastructure as Code

Mi \`docker-compose.yml\` de producción:

\`\`\`yaml
version: '3.8'

services:
  api:
    image: myregistry/api:\${VERSION}
    restart: always
    environment:
      - NODE_ENV=production
      - DATABASE_URL=\${DATABASE_URL}
    ports:
      - "3000:3000"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  nginx:
    image: nginx:alpine
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    ports:
      - "80:80"
      - "443:443"
    depends_on:
      - api
\`\`\`

**Todo en Git. Todo reproducible. Cero configuración manual.**

### 3. Monitoriza o vuela ciego

Añadí healthchecks, logs centralizados, alertas. Ahora sé cuando algo falla antes que los usuarios.

### 4. Testing no es opcional

Mi regla: **si no hay tests, no hay merge**.

\`\`\`javascript
describe('API Endpoints', () => {
  it('should return 200 on health check', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
  });

  it('should validate input data', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: '' }); // invalid
    expect(response.status).toBe(400);
  });
});
\`\`\`

## El antes y el después

### Antes (despliegue manual)
- ⏱️ 45 minutos por deploy
- 😰 Ansiedad cada viernes
- 🐛 3-4 errores por despliegue
- 🔥 Hotfixes = pánico

### Después (CI/CD + Docker)
- ⚡ 3 minutos automatizados
- 😎 Deploys tranquilos cualquier día
- ✅ Cero errores humanos
- 🚀 Hotfixes en minutos, sin estrés

## Herramientas que uso hoy

- **CI/CD**: GitHub Actions (gratis para proyectos públicos)
- **Contenedores**: Docker + Docker Compose
- **Hosting**: Railway (extremadamente fácil para empezar)
- **Monitoring**: Sentry para errores, UptimeRobot para disponibilidad
- **Secrets**: Variables de entorno en plataforma, nunca en código

## Consejo final

**No necesitas ser experto en DevOps para automatizar.** Necesitas:

1. Dockerfile básico (5 líneas)
2. GitHub Actions workflow (20 líneas)
3. Script de deploy (10 líneas)

Total: menos de 50 líneas de código que te ahorrarán cientos de horas y errores.

El despliegue manual es como conducir sin cinturón: quizá llegues bien algunas veces, pero eventualmente tendrás un accidente.

**Automatiza desde hoy. Tu yo del futuro te lo agradecerá.**`,
      en: `# Automate or die: lessons I learned trying to deploy my first REST API

## The manual deployment disaster

It was Friday afternoon. I had my first REST API ready for production. "How hard can it be?", I thought. Spoiler: very hard.

### The chaos of the first attempt

I connected via SSH to the server. Copied files manually with \`scp\`. Installed dependencies. Configured environment variables. Everything worked... until it didn't.

On Monday, a critical bug. Had to do a hotfix. Repeat the whole process. 45 minutes later, the fix was in production. But I had overwritten an important configuration. Server down. Angry users.

**That's when I understood: manual deployment isn't bravery, it's professional negligence.**

## The revelation: CI/CD isn't luxury, it's survival

### What is CI/CD really?

**Continuous Integration**: every commit goes through automated tests
**Continuous Deployment**: code that passes tests deploys automatically

It's not magic. It's automated discipline.

### My first pipeline (GitHub Actions)

\`\`\`yaml
name: Deploy API

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Run tests
        run: npm test

      - name: Build Docker image
        run: docker build -t api:latest .

      - name: Push to registry
        run: docker push myregistry/api:latest

      - name: Deploy
        run: ssh user@server 'docker-compose pull && docker-compose up -d'
\`\`\`

**Result**: from 45 minutes of manual deployment to 3 minutes automated. Zero human errors.

## Docker: the missing piece

### The "works on my machine" problem

- Developer: "Works on my laptop"
- Server: Python 3.8 vs Python 3.10
- Server: missing system library
- **Result**: 2 hours debugging environment differences

### The solution: containers

\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000
CMD ["node", "server.js"]
\`\`\`

**What changed**:
- Same environment in development, staging and production
- Deploy = \`docker-compose up\`
- Rollback = change image version

## Lessons learned the hard way

### 1. Automate from day one

Don't wait for problems. Your first project deserves CI/CD.

**Minimum viable**:
- Automated tests on every commit
- Deploy with one command
- Easy rollback

### 2. Infrastructure as Code

My production \`docker-compose.yml\`:

\`\`\`yaml
version: '3.8'

services:
  api:
    image: myregistry/api:\${VERSION}
    restart: always
    environment:
      - NODE_ENV=production
      - DATABASE_URL=\${DATABASE_URL}
    ports:
      - "3000:3000"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  nginx:
    image: nginx:alpine
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    ports:
      - "80:80"
      - "443:443"
    depends_on:
      - api
\`\`\`

**Everything in Git. Everything reproducible. Zero manual configuration.**

### 3. Monitor or fly blind

I added healthchecks, centralized logs, alerts. Now I know when something fails before users do.

### 4. Testing is not optional

My rule: **no tests, no merge**.

\`\`\`javascript
describe('API Endpoints', () => {
  it('should return 200 on health check', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
  });

  it('should validate input data', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: '' }); // invalid
    expect(response.status).toBe(400);
  });
});
\`\`\`

## Before and after

### Before (manual deployment)
- ⏱️ 45 minutes per deploy
- 😰 Anxiety every Friday
- 🐛 3-4 errors per deployment
- 🔥 Hotfixes = panic

### After (CI/CD + Docker)
- ⚡ 3 minutes automated
- 😎 Calm deploys any day
- ✅ Zero human errors
- 🚀 Hotfixes in minutes, no stress

## Tools I use today

- **CI/CD**: GitHub Actions (free for public projects)
- **Containers**: Docker + Docker Compose
- **Hosting**: Railway (extremely easy to start)
- **Monitoring**: Sentry for errors, UptimeRobot for uptime
- **Secrets**: Environment variables on platform, never in code

## Final advice

**You don't need to be a DevOps expert to automate.** You need:

1. Basic Dockerfile (5 lines)
2. GitHub Actions workflow (20 lines)
3. Deploy script (10 lines)

Total: less than 50 lines of code that will save you hundreds of hours and errors.

Manual deployment is like driving without a seatbelt: you might be fine sometimes, but eventually you'll have an accident.

**Automate today. Your future self will thank you.**`
    },
    date: '2025-01-18',
    readTime: 8,
    category: 'automation',
    tags: ['CI/CD', 'Docker', 'DevOps', 'GitHub Actions', 'Automation'],
    featured: true
  },
  {
    id: '6',
    slug: 'local-first-ai',
    title: {
      es: 'Local-First AI: ¿moda o la clave de la privacidad del futuro?',
      en: 'Local-First AI: fad or the key to future privacy?'
    },
    excerpt: {
      es: 'Descubrí Ollama y cambió mi forma de trabajar con IA. Te explico por qué ejecutar modelos localmente no es paranoia, es sentido común.',
      en: 'I discovered Ollama and it changed the way I work with AI. I explain why running models locally is not paranoia, it\'s common sense.'
    },
    content: {
      es: `# Local-First AI: ¿moda o la clave de la privacidad del futuro?

## El momento de la revelación

Estaba usando ChatGPT para revisar código de un proyecto con datos sensibles. De repente pensé: **"Estoy enviando código privado a un servidor de OpenAI".**

No es que no confíe en OpenAI. Es que **no debería tener que confiar en nadie** para mantener mi privacidad.

Ahí empezó mi viaje hacia la IA local.

## El problema que nadie quiere discutir

### Cada prompt es una fuga de datos

Cuando usas ChatGPT, Claude, o cualquier IA en la nube:

- ✉️ Tu código viaja por Internet
- 🏢 Se almacena en servidores de terceros
- 📊 Puede usarse para entrenar modelos (según TOS)
- 🔍 Está sujeto a análisis de cumplimiento

**Para un chatbot casual: no hay problema.**
**Para código propietario, datos médicos, o información sensible: es un riesgo inaceptable.**

### El caso de uso que me convenció

Trabajaba en un proyecto con datos de pacientes (anonimizados, pero aún así sensibles). Quería usar IA para:
- Analizar patrones en logs
- Generar queries SQL complejas
- Refactorizar código de procesamiento

**Usar ChatGPT = posible violación de GDPR.**
**No usar IA = trabajar más lento sin razón.**

La solución: **IA local**.

## Ollama: IA de calidad en tu laptop

### ¿Qué es Ollama?

Piensa en Docker, pero para modelos de IA. Instalas la herramienta, descargas un modelo, y lo ejecutas completamente en tu máquina.

**Instalación** (literalmente 1 comando):
\`\`\`bash
curl -fsSL https://ollama.com/install.sh | sh
\`\`\`

**Descargar un modelo**:
\`\`\`bash
ollama pull llama3.1
\`\`\`

**Ejecutar**:
\`\`\`bash
ollama run llama3.1
\`\`\`

Eso es todo. Tienes IA local funcionando.

### Modelos que uso diariamente

**Para código** (mi favorito):
\`\`\`bash
ollama run codellama:13b
\`\`\`
- Entiende 16 lenguajes de programación
- Excelente para refactoring y debugging
- Funciona offline

**Para tareas generales**:
\`\`\`bash
ollama run llama3.1:8b
\`\`\`
- Rápido y eficiente
- Buena comprensión de contexto
- Funciona en laptops modestos

**Para análisis profundo**:
\`\`\`bash
ollama run llama3.1:70b
\`\`\`
- Calidad comparable a GPT-4
- Necesitas GPU potente o paciencia
- Vale la pena para tareas críticas

## Mi workflow diario con IA local

### 1. Revisión de código sensible

\`\`\`bash
# Analizar función con datos sensibles
cat src/payment-processor.ts | ollama run codellama:13b \\
  "Review this code for security issues and suggest improvements"
\`\`\`

**Todo en mi máquina. Cero datos enviados a Internet.**

### 2. Generación de SQL complejo

\`\`\`bash
ollama run llama3.1 "Generate a PostgreSQL query to find users
who made purchases in last 30 days but haven't logged in for 7 days"
\`\`\`

### 3. Análisis de logs con datos reales

Antes: tenía que sanitizar logs antes de usar ChatGPT.
Ahora: paso logs directos a Ollama. Cero preocupaciones.

### 4. Integración en editor (el game changer)

Extensión **Continue.dev** para VSCode:

\`\`\`json
{
  "models": [
    {
      "title": "Llama 3.1",
      "provider": "ollama",
      "model": "llama3.1:8b"
    }
  ]
}
\`\`\`

**Ahora tengo Copilot, pero privado y gratis.**

## La verdad sobre el rendimiento

### ¿Es más lento que ChatGPT?

Sí, pero no tanto como piensas:

| Modelo | Velocidad (tokens/s) | Calidad vs GPT-4 |
|--------|---------------------|------------------|
| llama3.1:8b | ~40 tok/s | 70% |
| llama3.1:70b | ~8 tok/s | 90% |
| codellama:13b | ~25 tok/s | 85% (para código) |

**En mi laptop (MacBook M2 Pro)**:
- Respuestas cortas: 2-3 segundos
- Análisis profundo: 10-20 segundos

**¿Es molesto?** Al principio.
**¿Me acostumbré?** Totalmente.
**¿Vale la pena?** Absolutamente.

### ¿Necesitas GPU de la NASA?

**No.** Uso esto en:
- MacBook Pro M2 (16GB RAM) → perfecto
- Desktop con RTX 3060 → excelente
- Laptop Lenovo con 8GB RAM → modelos pequeños funcionan

**Truco**: usa modelos cuantizados (4-bit). Misma calidad, menos memoria.

## Casos de uso donde IA local es obligatoria

### 1. Desarrollo con datos sensibles
- Código propietario
- Datos de clientes
- Información médica/financiera

### 2. Trabajo offline
- Vuelos largos
- Zonas sin Internet
- Seguridad crítica (airgapped systems)

### 3. Prototipado rápido sin costes
- ChatGPT Plus: $20/mes
- Claude Pro: $20/mes
- Ollama: $0/mes, uso ilimitado

### 4. Aprendizaje y experimentación
- Prueba diferentes modelos
- Ajusta parámetros
- Sin límites de requests

## Limitaciones honestas

### Ollama NO es mejor en todo

❌ **Peor en**:
- Razonamiento extremadamente complejo
- Tareas multimodales (imágenes)
- Contextos gigantescos (100k+ tokens)

✅ **Mejor en**:
- Privacidad (obvio)
- Coste (gratis)
- Velocidad para tareas simples (sin latencia de red)
- Control total (ajustas todo)

### Mi estrategia híbrida

**70% del tiempo**: Ollama (código, análisis, prototipado)
**30% del tiempo**: ChatGPT (brainstorming complejo, investigación profunda)

No es blanco o negro. Es usar la herramienta correcta para cada tarea.

## Cómo empezar hoy (paso a paso)

### Día 1: Setup básico (10 minutos)
\`\`\`bash
# Instalar Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Descargar modelo rápido
ollama pull llama3.1:8b

# Primer test
ollama run llama3.1 "Explain Docker in simple terms"
\`\`\`

### Día 2: Integración en workflow
- Instala Continue.dev en VSCode
- Configura Ollama como provider
- Usa Ctrl+L para chatear con tu código

### Día 3: Experimenta
\`\`\`bash
# Prueba diferentes modelos
ollama pull codellama
ollama pull mistral
ollama pull mixtral

# Compara resultados para tu caso de uso
\`\`\`

## El futuro es local (y distribuido)

La tendencia es clara:
- Modelos más pequeños, igual de capaces (Llama 3.1, Mistral)
- Hardware más accesible (Mac M-series, RTX 4060)
- Tools mejores (Ollama, LM Studio, Jan)

**En 2-3 años, correr IA local será tan normal como tener Node.js instalado.**

## Mi conclusión (y recomendación)

**Local-First AI no es paranoia.** Es:
- ✅ Privacidad real
- ✅ Costes cero
- ✅ Control total
- ✅ Independencia de plataformas

**¿Reemplaza ChatGPT completamente?** No todavía.
**¿Debería ser tu opción por defecto para trabajo sensible?** Absolutamente.

Prueba Ollama este fin de semana. 10 minutos de setup que pueden cambiar tu forma de trabajar con IA para siempre.

**Tu código, tu datos, tu máquina. Así es como debería ser.**`,
      en: `# Local-First AI: fad or the key to future privacy?

## The moment of revelation

I was using ChatGPT to review code from a project with sensitive data. Suddenly I thought: **"I'm sending private code to an OpenAI server."**

It's not that I don't trust OpenAI. It's that **I shouldn't have to trust anyone** to maintain my privacy.

That's when my journey towards local AI began.

## The problem nobody wants to discuss

### Every prompt is a data leak

When you use ChatGPT, Claude, or any cloud AI:

- ✉️ Your code travels through the Internet
- 🏢 It's stored on third-party servers
- 📊 Can be used to train models (according to TOS)
- 🔍 Subject to compliance analysis

**For casual chatbot use: no problem.**
**For proprietary code, medical data, or sensitive information: it's an unacceptable risk.**

### The use case that convinced me

I was working on a project with patient data (anonymized, but still sensitive). I wanted to use AI to:
- Analyze patterns in logs
- Generate complex SQL queries
- Refactor processing code

**Using ChatGPT = possible GDPR violation.**
**Not using AI = working slower for no reason.**

The solution: **local AI**.

## Ollama: quality AI on your laptop

### What is Ollama?

Think of Docker, but for AI models. You install the tool, download a model, and run it completely on your machine.

**Installation** (literally 1 command):
\`\`\`bash
curl -fsSL https://ollama.com/install.sh | sh
\`\`\`

**Download a model**:
\`\`\`bash
ollama pull llama3.1
\`\`\`

**Run**:
\`\`\`bash
ollama run llama3.1
\`\`\`

That's it. You have local AI running.

### Models I use daily

**For code** (my favorite):
\`\`\`bash
ollama run codellama:13b
\`\`\`
- Understands 16 programming languages
- Excellent for refactoring and debugging
- Works offline

**For general tasks**:
\`\`\`bash
ollama run llama3.1:8b
\`\`\`
- Fast and efficient
- Good context understanding
- Works on modest laptops

**For deep analysis**:
\`\`\`bash
ollama run llama3.1:70b
\`\`\`
- Quality comparable to GPT-4
- Need powerful GPU or patience
- Worth it for critical tasks

## My daily workflow with local AI

### 1. Sensitive code review

\`\`\`bash
# Analyze function with sensitive data
cat src/payment-processor.ts | ollama run codellama:13b \\
  "Review this code for security issues and suggest improvements"
\`\`\`

**Everything on my machine. Zero data sent to Internet.**

### 2. Complex SQL generation

\`\`\`bash
ollama run llama3.1 "Generate a PostgreSQL query to find users
who made purchases in last 30 days but haven't logged in for 7 days"
\`\`\`

### 3. Real data log analysis

Before: had to sanitize logs before using ChatGPT.
Now: pass logs directly to Ollama. Zero concerns.

### 4. Editor integration (the game changer)

**Continue.dev** extension for VSCode:

\`\`\`json
{
  "models": [
    {
      "title": "Llama 3.1",
      "provider": "ollama",
      "model": "llama3.1:8b"
    }
  ]
}
\`\`\`

**Now I have Copilot, but private and free.**

## The truth about performance

### Is it slower than ChatGPT?

Yes, but not as much as you think:

| Model | Speed (tokens/s) | Quality vs GPT-4 |
|-------|------------------|------------------|
| llama3.1:8b | ~40 tok/s | 70% |
| llama3.1:70b | ~8 tok/s | 90% |
| codellama:13b | ~25 tok/s | 85% (for code) |

**On my laptop (MacBook M2 Pro)**:
- Short answers: 2-3 seconds
- Deep analysis: 10-20 seconds

**Is it annoying?** At first.
**Did I get used to it?** Totally.
**Is it worth it?** Absolutely.

### Do you need NASA's GPU?

**No.** I use this on:
- MacBook Pro M2 (16GB RAM) → perfect
- Desktop with RTX 3060 → excellent
- Lenovo laptop with 8GB RAM → small models work

**Trick**: use quantized models (4-bit). Same quality, less memory.

## Use cases where local AI is mandatory

### 1. Development with sensitive data
- Proprietary code
- Customer data
- Medical/financial information

### 2. Offline work
- Long flights
- Areas without Internet
- Critical security (airgapped systems)

### 3. Rapid prototyping without costs
- ChatGPT Plus: $20/month
- Claude Pro: $20/month
- Ollama: $0/month, unlimited use

### 4. Learning and experimentation
- Try different models
- Adjust parameters
- No request limits

## Honest limitations

### Ollama is NOT better at everything

❌ **Worse at**:
- Extremely complex reasoning
- Multimodal tasks (images)
- Giant contexts (100k+ tokens)

✅ **Better at**:
- Privacy (obvious)
- Cost (free)
- Speed for simple tasks (no network latency)
- Total control (adjust everything)

### My hybrid strategy

**70% of the time**: Ollama (code, analysis, prototyping)
**30% of the time**: ChatGPT (complex brainstorming, deep research)

It's not black or white. It's using the right tool for each task.

## How to start today (step by step)

### Day 1: Basic setup (10 minutes)
\`\`\`bash
# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Download fast model
ollama pull llama3.1:8b

# First test
ollama run llama3.1 "Explain Docker in simple terms"
\`\`\`

### Day 2: Workflow integration
- Install Continue.dev in VSCode
- Configure Ollama as provider
- Use Ctrl+L to chat with your code

### Day 3: Experiment
\`\`\`bash
# Try different models
ollama pull codellama
ollama pull mistral
ollama pull mixtral

# Compare results for your use case
\`\`\`

## The future is local (and distributed)

The trend is clear:
- Smaller models, equally capable (Llama 3.1, Mistral)
- More accessible hardware (Mac M-series, RTX 4060)
- Better tools (Ollama, LM Studio, Jan)

**In 2-3 years, running local AI will be as normal as having Node.js installed.**

## My conclusion (and recommendation)

**Local-First AI is not paranoia.** It's:
- ✅ Real privacy
- ✅ Zero costs
- ✅ Total control
- ✅ Platform independence

**Does it completely replace ChatGPT?** Not yet.
**Should it be your default option for sensitive work?** Absolutely.

Try Ollama this weekend. 10 minutes of setup that can change the way you work with AI forever.

**Your code, your data, your machine. That's how it should be.**`
    },
    date: '2025-01-25',
    readTime: 9,
    category: 'ai',
    tags: ['AI', 'Privacy', 'Ollama', 'Local AI', 'LLM'],
    featured: true
  },
  {
    id: '7',
    slug: 'backend-zen',
    title: {
      es: 'Backend Zen: cuando el código se convierte en flujo',
      en: 'Backend Zen: when code becomes flow'
    },
    excerpt: {
      es: 'Descubrí que programar backend puede ser meditativo. Te cuento cómo encontré el estado de flow y por qué el backend es puro mindfulness.',
      en: 'I discovered that backend programming can be meditative. I tell you how I found the flow state and why backend is pure mindfulness.'
    },
    content: {
      es: `# Backend Zen: cuando el código se convierte en flujo

## El descubrimiento accidental

Era domingo por la noche. Llevaba 4 horas diseñando una API REST. Cuando levanté la vista, no podía creer que hubiera pasado tanto tiempo.

No estaba cansado. Estaba **energizado**.

**Había experimentado "flow"** sin darme cuenta.

## ¿Qué es el flow en programación?

### La definición formal

Mihaly Csikszentmihalyi lo llama "flow state":
- Concentración total en la tarea
- Percepción alterada del tiempo
- Desaparición del ego
- Feedback inmediato
- Balance perfecto entre desafío y habilidad

**En programación: es cuando el código fluye sin esfuerzo consciente.**

### Por qué el backend es especial

El frontend tiene interrupciones constantes:
- "¿Cómo se ve esto en móvil?"
- "¿Y si cambio este color?"
- "Mejor pruebo otro espaciado"

**El backend es diferente**:
- Diseñas un sistema completo en tu cabeza
- Implementas con lógica pura
- El feedback es binario: funciona o no funciona
- Puedes mantener contexto profundo durante horas

**Es como resolver un puzzle complejo donde todas las piezas están en tu mente.**

## Mi ritual para entrar en flow

### 1. Preparación del entorno (5 minutos)

\`\`\`bash
# Limpio el contexto mental
pkill Slack
pkill Discord

# Música sin letra (mi playlist):
# - Tycho, Boards of Canada, Ólafur Arnalds
# O silencio total

# Setup técnico
tmux new -s flow
git checkout -b feature/new-endpoint
\`\`\`

### 2. Definición del problema (10 minutos)

Antes de escribir código, escribo en papel:
- ¿Qué estoy construyendo?
- ¿Cuál es la entrada/salida?
- ¿Qué puede fallar?

**Ejemplo real** (diseñando autenticación JWT):
\`\`\`
Endpoint: POST /auth/login
Input: { email, password }
Output: { token, refreshToken }

Flujo:
1. Validar formato email
2. Buscar usuario en DB
3. Verificar contraseña (bcrypt)
4. Generar JWT (15min) + Refresh (7d)
5. Retornar ambos

Edge cases:
- Usuario no existe → 401
- Password incorrecta → 401
- Email no verificado → 403
- Too many attempts → 429
\`\`\`

**Ahora el código escribe solo.**

### 3. Timeboxing consciente (90 minutos)

Uso Pomodoro adaptado:
- 90 min de deep work
- 15 min de descanso (caminar, café, NO redes sociales)
- Máximo 2-3 sesiones al día

**¿Por qué 90 minutos?** Es el ciclo natural de atención profunda (ultradian rhythm).

## Ejemplo práctico: diseñando un webhook handler

Voy a mostrarte cómo aplico "backend zen" en un caso real.

### El problema

Necesito procesar webhooks de Stripe. Requisitos:
- Verificar firma HMAC
- Procesar diferentes event types
- Idempotencia (evitar duplicados)
- Retry automático en fallos

### Fase 1: Diseño mental (en papel)

\`\`\`
Flujo:
1. Recibir POST con signature en headers
2. Verificar firma (crypto.createHmac)
3. Parsear evento
4. Check idempotency (Redis: evento_id)
5. Route a handler específico
6. Ack 200 (o queue para retry)

Estructura:
- webhookRouter.ts → routing
- webhookVerifier.ts → HMAC check
- handlers/payment.ts → procesar pagos
- handlers/subscription.ts → procesar subs
\`\`\`

### Fase 2: Implementación en flow

\`\`\`typescript
// webhookVerifier.ts - Una sola responsabilidad
import crypto from 'crypto';

export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const hmac = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(hmac)
  );
}

// webhookRouter.ts - Orquestación clara
import express from 'express';
import { verifyWebhookSignature } from './webhookVerifier';
import { checkIdempotency, markProcessed } from './idempotency';
import * as handlers from './handlers';

const router = express.Router();

router.post('/stripe', async (req, res) => {
  const signature = req.headers['stripe-signature'] as string;
  const payload = JSON.stringify(req.body);

  // Verificación
  if (!verifyWebhookSignature(payload, signature, process.env.STRIPE_SECRET!)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  const event = req.body;

  // Idempotencia
  const isProcessed = await checkIdempotency(event.id);
  if (isProcessed) {
    return res.status(200).json({ status: 'already_processed' });
  }

  // Routing
  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlers.handlePaymentSuccess(event.data.object);
        break;
      case 'customer.subscription.updated':
        await handlers.handleSubscriptionUpdate(event.data.object);
        break;
      default:
        console.log(\`Unhandled event: \${event.type}\`);
    }

    await markProcessed(event.id);
    res.status(200).json({ status: 'processed' });
  } catch (error) {
    console.error('Webhook processing failed:', error);
    res.status(500).json({ error: 'Processing failed' });
  }
});

export default router;
\`\`\`

### Fase 3: Testing (el cierre perfecto)

\`\`\`typescript
// webhookRouter.test.ts
import request from 'supertest';
import app from '../app';

describe('Stripe Webhook Handler', () => {
  it('rejects invalid signature', async () => {
    const response = await request(app)
      .post('/webhooks/stripe')
      .set('stripe-signature', 'invalid')
      .send({ type: 'payment_intent.succeeded' });

    expect(response.status).toBe(401);
  });

  it('handles idempotent requests', async () => {
    const event = { id: 'evt_123', type: 'payment_intent.succeeded' };

    // Primera llamada
    const first = await request(app)
      .post('/webhooks/stripe')
      .set('stripe-signature', validSignature(event))
      .send(event);

    expect(first.status).toBe(200);

    // Segunda llamada (debería detectar duplicado)
    const second = await request(app)
      .post('/webhooks/stripe')
      .set('stripe-signature', validSignature(event))
      .send(event);

    expect(second.body.status).toBe('already_processed');
  });
});
\`\`\`

**Resultado**: 2 horas de flow puro. Sistema robusto, testeado, desplegable.

## Señales de que estás en flow

✅ **Estás en flow cuando**:
- El tiempo desaparece
- No necesitas forzar la concentración
- El código "escribe solo"
- Anticipas problemas antes de ejecutar
- Tests pasan a la primera
- Sientes energía al terminar

❌ **NO estás en flow cuando**:
- Revisas Slack cada 5 minutos
- Reescribes la misma función 10 veces
- No entiendes tu propio código al día siguiente
- Te sientes drenado, no energizado

## Los enemigos del flow (y cómo evitarlos)

### 1. Interrupciones

**Problema**: cada interrupción = 23 minutos para recuperar contexto profundo.

**Solución**:
\`\`\`bash
# Mi script de "flow mode"
#!/bin/bash
# flow-mode.sh

# Notificaciones OFF
osascript -e 'tell application "System Events" to keystroke "D" using {command down, shift down, option down, control down}'

# Apps que distraen → cerradas
pkill Slack
pkill Discord

# Temporizador
echo "Flow mode activado. 90 minutos."
sleep 5400  # 90 min
say "Flow session completada"
\`\`\`

### 2. Código legacy sin tests

**Problema**: no puedes entrar en flow cuando tienes miedo de romper algo.

**Solución**: antes de cambiar legacy code, escribe tests de integración:
\`\`\`typescript
// Cubre el comportamiento actual (aunque sea feo)
describe('Legacy payment processor', () => {
  it('should process payment successfully', async () => {
    const result = await processPayment({ amount: 1000 });
    expect(result.status).toBe('success');
  });
});
\`\`\`

**Ahora puedes refactorizar con confianza.**

### 3. Sobre-abstracción prematura

**Problema**: pensar en "¿y si necesito extender esto en el futuro?" mata el flow.

**Solución**: **escribe la versión más simple que funcione**. Refactoriza cuando tengas casos de uso reales.

\`\`\`typescript
// ❌ Matar flow con sobre-ingeniería
interface PaymentProcessor {
  process(payment: Payment): Promise<Result>;
}

class StripeProcessor implements PaymentProcessor { ... }
class PayPalProcessor implements PaymentProcessor { ... }
class CryptoProcessor implements PaymentProcessor { ... }

// ✅ Mantener flow con simplicidad
async function processStripePayment(payment: Payment) {
  // Solo implementa lo que necesitas HOY
}
\`\`\`

## Backend como práctica mindfulness

### Las similitudes con meditación

**Meditación**:
- Focus en la respiración
- Observar pensamientos sin juzgar
- Volver al presente cuando te distraes

**Backend Zen**:
- Focus en el problema
- Observar bugs sin frustrarte
- Volver al código cuando pierdes contexto

**Ambos entrenan el mismo músculo: atención sostenida.**

### Mi práctica diaria

1. **Morning pages** (10 min): escribo a mano qué voy a construir hoy
2. **Deep work session** (90 min): backend en flow
3. **Reflection** (5 min): ¿qué aprendí? ¿qué mejorar?

**Después de 6 meses**: mi capacidad de concentración se duplicó. No solo en código, en todo.

## Consejos para cultivar tu backend zen

### 1. Empieza con problemas bien definidos

No entrarás en flow con: "mejora el sistema de autenticación".
Sí entrarás con: "implementa refresh token rotation con Redis".

### 2. Trabaja en bloques de backend puro

Evita saltar entre frontend y backend. Dedica días enteros solo a backend.

### 3. Documenta tu pensamiento

Mantén un \`THINKING.md\` en cada proyecto:
\`\`\`markdown
## 2025-01-25 - Webhook System Design

Problema: procesar webhooks de Stripe de forma confiable

Decisiones:
- Redis para idempotencia (TTL 7 días)
- Handlers separados por event type
- No usar queue inicialmente (YAGNI)

Dudas:
- ¿Verificar firma antes o después de parsear?
  → Antes, para evitar parsing de requests inválidos
\`\`\`

### 4. Celebra el flow

Cuando termines una sesión productiva, reconócelo:
- Commit con mensaje descriptivo
- Agradece el tiempo de concentración
- Nota cómo te sientes

**Refuerzas el estado mental que quieres repetir.**

## El regalo del backend zen

Después de un año practicando "backend zen":
- Mis APIs son más robustas
- Disfruto programar más que nunca
- Mi capacidad de concentración mejoró en todo (no solo código)
- Reduje ansiedad (el flow es terapéutico)

**Backend no es solo tecnología. Es una práctica de atención plena.**

La próxima vez que diseñes un endpoint, respira profundo. Apaga Slack. Define el problema con claridad.

**Y deja que el código fluya.**`,
      en: `# Backend Zen: when code becomes flow

## The accidental discovery

It was Sunday night. I had been designing a REST API for 4 hours. When I looked up, I couldn't believe that much time had passed.

I wasn't tired. I was **energized**.

**I had experienced "flow"** without realizing it.

## What is flow in programming?

### The formal definition

Mihaly Csikszentmihalyi calls it "flow state":
- Total concentration on the task
- Altered perception of time
- Disappearance of ego
- Immediate feedback
- Perfect balance between challenge and skill

**In programming: it's when code flows without conscious effort.**

### Why backend is special

Frontend has constant interruptions:
- "How does this look on mobile?"
- "What if I change this color?"
- "Better try another spacing"

**Backend is different**:
- You design a complete system in your head
- You implement with pure logic
- Feedback is binary: it works or it doesn't
- You can maintain deep context for hours

**It's like solving a complex puzzle where all pieces are in your mind.**

## My ritual to enter flow

### 1. Environment preparation (5 minutes)

\`\`\`bash
# Clear mental context
pkill Slack
pkill Discord

# Music without lyrics (my playlist):
# - Tycho, Boards of Canada, Ólafur Arnalds
# Or total silence

# Technical setup
tmux new -s flow
git checkout -b feature/new-endpoint
\`\`\`

### 2. Problem definition (10 minutes)

Before writing code, I write on paper:
- What am I building?
- What's the input/output?
- What can fail?

**Real example** (designing JWT authentication):
\`\`\`
Endpoint: POST /auth/login
Input: { email, password }
Output: { token, refreshToken }

Flow:
1. Validate email format
2. Find user in DB
3. Verify password (bcrypt)
4. Generate JWT (15min) + Refresh (7d)
5. Return both

Edge cases:
- User doesn't exist → 401
- Incorrect password → 401
- Email not verified → 403
- Too many attempts → 429
\`\`\`

**Now the code writes itself.**

### 3. Conscious timeboxing (90 minutes)

I use adapted Pomodoro:
- 90 min of deep work
- 15 min break (walk, coffee, NO social media)
- Maximum 2-3 sessions per day

**Why 90 minutes?** It's the natural deep attention cycle (ultradian rhythm).

## Practical example: designing a webhook handler

I'll show you how I apply "backend zen" to a real case.

### The problem

I need to process Stripe webhooks. Requirements:
- Verify HMAC signature
- Process different event types
- Idempotency (avoid duplicates)
- Automatic retry on failures

### Phase 1: Mental design (on paper)

\`\`\`
Flow:
1. Receive POST with signature in headers
2. Verify signature (crypto.createHmac)
3. Parse event
4. Check idempotency (Redis: event_id)
5. Route to specific handler
6. Ack 200 (or queue for retry)

Structure:
- webhookRouter.ts → routing
- webhookVerifier.ts → HMAC check
- handlers/payment.ts → process payments
- handlers/subscription.ts → process subs
\`\`\`

### Phase 2: Implementation in flow

\`\`\`typescript
// webhookVerifier.ts - Single responsibility
import crypto from 'crypto';

export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const hmac = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(hmac)
  );
}

// webhookRouter.ts - Clear orchestration
import express from 'express';
import { verifyWebhookSignature } from './webhookVerifier';
import { checkIdempotency, markProcessed } from './idempotency';
import * as handlers from './handlers';

const router = express.Router();

router.post('/stripe', async (req, res) => {
  const signature = req.headers['stripe-signature'] as string;
  const payload = JSON.stringify(req.body);

  // Verification
  if (!verifyWebhookSignature(payload, signature, process.env.STRIPE_SECRET!)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  const event = req.body;

  // Idempotency
  const isProcessed = await checkIdempotency(event.id);
  if (isProcessed) {
    return res.status(200).json({ status: 'already_processed' });
  }

  // Routing
  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlers.handlePaymentSuccess(event.data.object);
        break;
      case 'customer.subscription.updated':
        await handlers.handleSubscriptionUpdate(event.data.object);
        break;
      default:
        console.log(\`Unhandled event: \${event.type}\`);
    }

    await markProcessed(event.id);
    res.status(200).json({ status: 'processed' });
  } catch (error) {
    console.error('Webhook processing failed:', error);
    res.status(500).json({ error: 'Processing failed' });
  }
});

export default router;
\`\`\`

### Phase 3: Testing (the perfect closure)

\`\`\`typescript
// webhookRouter.test.ts
import request from 'supertest';
import app from '../app';

describe('Stripe Webhook Handler', () => {
  it('rejects invalid signature', async () => {
    const response = await request(app)
      .post('/webhooks/stripe')
      .set('stripe-signature', 'invalid')
      .send({ type: 'payment_intent.succeeded' });

    expect(response.status).toBe(401);
  });

  it('handles idempotent requests', async () => {
    const event = { id: 'evt_123', type: 'payment_intent.succeeded' };

    // First call
    const first = await request(app)
      .post('/webhooks/stripe')
      .set('stripe-signature', validSignature(event))
      .send(event);

    expect(first.status).toBe(200);

    // Second call (should detect duplicate)
    const second = await request(app)
      .post('/webhooks/stripe')
      .set('stripe-signature', validSignature(event))
      .send(event);

    expect(second.body.status).toBe('already_processed');
  });
});
\`\`\`

**Result**: 2 hours of pure flow. Robust system, tested, deployable.

## Signs you're in flow

✅ **You're in flow when**:
- Time disappears
- You don't need to force concentration
- Code "writes itself"
- You anticipate problems before running
- Tests pass on first try
- You feel energized when finished

❌ **You're NOT in flow when**:
- You check Slack every 5 minutes
- You rewrite the same function 10 times
- You don't understand your own code the next day
- You feel drained, not energized

## Flow enemies (and how to avoid them)

### 1. Interruptions

**Problem**: each interruption = 23 minutes to recover deep context.

**Solution**:
\`\`\`bash
# My "flow mode" script
#!/bin/bash
# flow-mode.sh

# Notifications OFF
osascript -e 'tell application "System Events" to keystroke "D" using {command down, shift down, option down, control down}'

# Distracting apps → closed
pkill Slack
pkill Discord

# Timer
echo "Flow mode activated. 90 minutes."
sleep 5400  # 90 min
say "Flow session complete"
\`\`\`

### 2. Legacy code without tests

**Problem**: you can't enter flow when you're afraid of breaking something.

**Solution**: before changing legacy code, write integration tests:
\`\`\`typescript
// Cover current behavior (even if ugly)
describe('Legacy payment processor', () => {
  it('should process payment successfully', async () => {
    const result = await processPayment({ amount: 1000 });
    expect(result.status).toBe('success');
  });
});
\`\`\`

**Now you can refactor with confidence.**

### 3. Premature over-abstraction

**Problem**: thinking "what if I need to extend this in the future?" kills flow.

**Solution**: **write the simplest version that works**. Refactor when you have real use cases.

\`\`\`typescript
// ❌ Kill flow with over-engineering
interface PaymentProcessor {
  process(payment: Payment): Promise<Result>;
}

class StripeProcessor implements PaymentProcessor { ... }
class PayPalProcessor implements PaymentProcessor { ... }
class CryptoProcessor implements PaymentProcessor { ... }

// ✅ Maintain flow with simplicity
async function processStripePayment(payment: Payment) {
  // Only implement what you need TODAY
}
\`\`\`

## Backend as mindfulness practice

### Similarities with meditation

**Meditation**:
- Focus on breath
- Observe thoughts without judgment
- Return to present when distracted

**Backend Zen**:
- Focus on problem
- Observe bugs without frustration
- Return to code when losing context

**Both train the same muscle: sustained attention.**

### My daily practice

1. **Morning pages** (10 min): handwrite what I'll build today
2. **Deep work session** (90 min): backend in flow
3. **Reflection** (5 min): what did I learn? what to improve?

**After 6 months**: my concentration capacity doubled. Not just in code, in everything.

## Tips to cultivate your backend zen

### 1. Start with well-defined problems

You won't enter flow with: "improve authentication system".
You will with: "implement refresh token rotation with Redis".

### 2. Work in pure backend blocks

Avoid jumping between frontend and backend. Dedicate entire days to backend only.

### 3. Document your thinking

Keep a \`THINKING.md\` in each project:
\`\`\`markdown
## 2025-01-25 - Webhook System Design

Problem: process Stripe webhooks reliably

Decisions:
- Redis for idempotency (TTL 7 days)
- Separate handlers per event type
- Don't use queue initially (YAGNI)

Questions:
- Verify signature before or after parsing?
  → Before, to avoid parsing invalid requests
\`\`\`

### 4. Celebrate flow

When you finish a productive session, acknowledge it:
- Commit with descriptive message
- Appreciate concentration time
- Note how you feel

**You reinforce the mental state you want to repeat.**

## The gift of backend zen

After a year practicing "backend zen":
- My APIs are more robust
- I enjoy programming more than ever
- My concentration ability improved in everything (not just code)
- Reduced anxiety (flow is therapeutic)

**Backend is not just technology. It's a mindfulness practice.**

Next time you design an endpoint, breathe deeply. Turn off Slack. Define the problem clearly.

**And let the code flow.**`
    },
    date: '2025-02-01',
    readTime: 11,
    category: 'mindfulness',
    tags: ['Mindfulness', 'Flow State', 'Backend', 'Productivity', 'Meditation'],
    featured: false
  },
  {
    id: '8',
    slug: 'errores-que-deberias-cometer',
    title: {
      es: 'Errores que deberías cometer en tu primer proyecto',
      en: 'Mistakes you should make in your first project'
    },
    excerpt: {
      es: 'Mi primer proyecto fue un desastre. Y fue perfecto. Los errores que cometí me enseñaron más que cualquier tutorial.',
      en: 'My first project was a disaster. And it was perfect. The mistakes I made taught me more than any tutorial.'
    },
    content: {
      es: `# Errores que deberías cometer en tu primer proyecto

## El proyecto que "fracasó" perfectamente

Mi primer proyecto: una app de gestión de tareas con React, Node.js, y MongoDB. Lo terminé, lo desplegué, lo usé yo solo durante 2 semanas, y lo abandoné.

**¿Fracaso?** No. **Aprendizaje comprimido.**

En 3 meses cometí todos los errores clásicos. Y cada uno me enseñó algo que ningún curso podría.

## Los errores que DEBES cometer

### 1. Sobre-ingeniería desde el inicio

**Lo que hice**:
\`\`\`typescript
// Mi primer endpoint (sin exagerar)
interface TaskRepository {
  findById(id: string): Promise<Task | null>;
  findAll(filters: TaskFilters): Promise<Task[]>;
  create(task: CreateTaskDTO): Promise<Task>;
  update(id: string, task: UpdateTaskDTO): Promise<Task>;
  delete(id: string): Promise<void>;
}

class MongoTaskRepository implements TaskRepository {
  // 200 líneas de código para... 5 tareas en la DB
}

class TaskService {
  constructor(
    private repo: TaskRepository,
    private validator: TaskValidator,
    private eventBus: EventBus
  ) {}
}
\`\`\`

**Tenía 0 usuarios. Pero ya tenía Event Bus.**

**Lo que aprendí**:
- YAGNI (You Aren't Gonna Need It) es real
- La mejor arquitectura para empezar es la más simple que funciona
- Puedes refactorizar cuando tengas casos de uso reales

**Lo que haría hoy**:
\`\`\`typescript
// Suficiente para empezar
const tasks = [];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const task = { id: uuidv4(), ...req.body };
  tasks.push(task);
  res.json(task);
});
\`\`\`

**Refactoriza cuando duela, no antes.**

### 2. Commitear directo a main (sin tests)

**Lo que hice**:
\`\`\`bash
git add .
git commit -m "fix"
git push origin main
\`\`\`

**Viernes 9pm. Producción caída. Sin forma de hacer rollback fácil.**

**Lo que aprendí**:
- Tests no son opcionales (son la red de seguridad)
- Branches te dejan experimentar sin miedo
- CI/CD debería estar desde commit #1

**Lo que haría hoy**:
\`\`\`bash
# Setup inicial del proyecto
git checkout -b develop

# Para cada feature
git checkout -b feature/nueva-funcionalidad

# GitHub Actions desde el inicio
# .github/workflows/test.yml
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm test
\`\`\`

**Incluso proyectos personales merecen workflow profesional.**

### 3. Hardcodear todo (incluidas las credenciales)

**Lo que hice**:
\`\`\`typescript
const mongoose = require('mongoose');

mongoose.connect('mongodb://admin:password123@localhost:27017/mydb');

const sendEmail = async (to, message) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'miemailreal@gmail.com',
      pass: 'miPasswordRealDeGmail'
    }
  });
};
\`\`\`

**Commiteado a GitHub público. 3 horas después, cuenta de Gmail comprometida.**

**Lo que aprendí**:
- NUNCA commits secrets
- \`.env\` + \`.gitignore\` es lo mínimo
- Mejor: usa variables de entorno de la plataforma

**Lo que haría hoy**:
\`\`\`bash
# .env (NUNCA commiteado)
DATABASE_URL=mongodb://localhost:27017/mydb
SMTP_USER=miemailreal@gmail.com
SMTP_PASS=miPasswordReal

# .env.example (SÍ commiteado)
DATABASE_URL=mongodb://localhost:27017/mydb
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_password
\`\`\`

\`\`\`typescript
// config.ts
import 'dotenv/config';

export const config = {
  databaseUrl: process.env.DATABASE_URL!,
  smtp: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!
  }
};
\`\`\`

### 4. Reinventar la rueda en todo

**Lo que hice**:
- Autenticación custom (con bugs de seguridad)
- Validación custom (que dejaba pasar datos inválidos)
- Logger custom (que no funcionaba bien)

**Lo que aprendí**:
- Auth es DIFÍCIL. Usa Passport, Auth0, Supabase, lo que sea
- Validación: Zod, Joi, Yup existen por algo
- Logging: Winston, Pino ya lo resolvieron

**Lo que haría hoy**:
\`\`\`typescript
// Auth con Passport (probado por millones)
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

passport.use(new LocalStrategy(async (email, password, done) => {
  const user = await findUserByEmail(email);
  if (!user || !await bcrypt.compare(password, user.password)) {
    return done(null, false);
  }
  return done(null, user);
}));

// Validación con Zod
import { z } from 'zod';

const TaskSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().optional(),
  dueDate: z.date().optional()
});

app.post('/tasks', (req, res) => {
  const result = TaskSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error });
  }
  // ...
});
\`\`\`

**Reinventa la rueda solo si es tu objetivo aprender. Si quieres construir, usa librerías.**

### 5. Ignorar el rendimiento (hasta que es tarde)

**Lo que hice**:
\`\`\`typescript
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find(); // Todas las tasks
  const users = await User.find(); // Todos los users

  const result = tasks.map(task => ({
    ...task,
    user: users.find(u => u.id === task.userId) // N+1 query
  }));

  res.json(result);
});
\`\`\`

**Con 10 tasks: funciona. Con 1000: timeout.**

**Lo que aprendí**:
- N+1 queries matan performance
- Índices en DB no son opcionales
- Monitoriza desde el inicio (aunque sea con console.time)

**Lo que haría hoy**:
\`\`\`typescript
app.get('/tasks', async (req, res) => {
  // Población eficiente (1 query)
  const tasks = await Task.find()
    .populate('user')
    .limit(100) // Siempre pagina
    .sort({ createdAt: -1 });

  res.json(tasks);
});

// Índice en MongoDB
db.tasks.createIndex({ userId: 1, createdAt: -1 });
\`\`\`

### 6. No documentar nada

**Lo que hice**:
Cero documentación. Volví al proyecto 2 meses después y no entendía mi propio código.

**Lo que aprendí**:
- README.md con setup instructions es lo mínimo
- Comenta el "por qué", no el "qué"
- Tu yo del futuro te lo agradecerá

**Lo que haría hoy**:
\`\`\`markdown
# Task Manager API

## Setup
\\\`\\\`\\\`bash
npm install
cp .env.example .env
# Edita .env con tus credenciales
npm run dev
\\\`\\\`\\\`

## Architecture decisions
- Usamos MongoDB (no SQL) porque necesitamos schema flexible
- Auth con JWT (no sessions) para facilitar scaling horizontal
- Redis para rate limiting (no in-memory) para múltiples instancias
\`\`\`

\`\`\`typescript
// Comenta decisiones no obvias
function calculatePriority(task: Task): number {
  // Usamos log porque prioridad crece exponencial con urgencia
  // Formula: log(daysUntilDue) * importance
  const daysUntilDue = differenceInDays(task.dueDate, new Date());
  return Math.log(daysUntilDue + 1) * task.importance;
}
\`\`\`

## Los errores que NO deberías cometer

Hay errores instructivos y errores destructivos:

### ❌ NO cometas estos

1. **No hacer backups**: perdí mi DB 2 veces antes de aprender
2. **Exponer API sin rate limiting**: $500 en costes de Heroku
3. **No validar input del usuario**: SQL injection (en mi propia app)
4. **Deployar sin health checks**: no sabía cuándo se caía

### ✅ Aprende de otros en estos

- Lee postmortems de GitHub, Cloudflare, etc.
- Son lecciones sin pagar el precio

## El proyecto perfecto para cometer errores

**Características ideales**:
- Lo suficientemente complejo: backend + frontend + DB
- Lo suficientemente simple: terminas en 1-3 meses
- Útil para ti: lo usarás de verdad
- Open source: portfolio + feedback gratis

**Mis recomendaciones**:

1. **Personal finance tracker**: CRUD + auth + gráficos
2. **Blog personal**: SSG + CMS + deploy
3. **Task manager con twist**: lo clásico, pero con tu idea única
4. **API wrapper con cache**: consume API externa, mejora con Redis

## Lecciones meta

### 1. Termina el proyecto

**El 80% de programadores abandona su primer proyecto.**

No seas ese 80%. Incluso si es feo, termínalo. Deploy. Comparte.

**Proyecto terminado > proyecto perfecto abandonado.**

### 2. Escribe sobre tus errores

Documenta lo que salió mal. Público o privado, da igual.

**Este post nació de mi \`MISTAKES.md\` del primer proyecto.**

### 3. No te compares con seniors

Tu primer proyecto será "malo" comparado con código de Google. **Es normal.**

**Compárate con tu yo de ayer, no con el senior de 10 años.**

### 4. Todos los seniors cometieron estos errores

Los mismos. Hardcodear passwords, N+1 queries, zero tests.

**La diferencia: ellos ya los pagaron.**

## Mi consejo final

**No intentes evitar todos los errores.** No funcionará. Y te paralizarás.

**Mejor estrategia**:
1. Empieza con lo más simple
2. Comete errores
3. Aprende de cada uno
4. Documenta las lecciones
5. Aplica en el siguiente proyecto

**Tu primer proyecto es tu mejor profesor.**

No será perfecto. No lo usará nadie (probablemente). Cometerás errores.

**Y está perfecto.**

Porque en 6 meses, cuando lances tu segundo proyecto, sabrás exactamente qué NO hacer.

**Ahora deja de leer, y empieza ese proyecto que llevas meses posponiendo.**

Los errores te esperan. (Y eso es bueno.)`,
      en: `# Mistakes you should make in your first project

## The project that "failed" perfectly

My first project: a task management app with React, Node.js, and MongoDB. I finished it, deployed it, used it alone for 2 weeks, and abandoned it.

**Failure?** No. **Compressed learning.**

In 3 months I made all the classic mistakes. And each one taught me something no course could.

## Mistakes you SHOULD make

### 1. Over-engineering from the start

**What I did**:
\`\`\`typescript
// My first endpoint (no exaggeration)
interface TaskRepository {
  findById(id: string): Promise<Task | null>;
  findAll(filters: TaskFilters): Promise<Task[]>;
  create(task: CreateTaskDTO): Promise<Task>;
  update(id: string, task: UpdateTaskDTO): Promise<Task>;
  delete(id: string): Promise<void>;
}

class MongoTaskRepository implements TaskRepository {
  // 200 lines of code for... 5 tasks in DB
}

class TaskService {
  constructor(
    private repo: TaskRepository,
    private validator: TaskValidator,
    private eventBus: EventBus
  ) {}
}
\`\`\`

**I had 0 users. But I already had an Event Bus.**

**What I learned**:
- YAGNI (You Aren't Gonna Need It) is real
- The best starting architecture is the simplest that works
- You can refactor when you have real use cases

**What I'd do today**:
\`\`\`typescript
// Enough to start
const tasks = [];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const task = { id: uuidv4(), ...req.body };
  tasks.push(task);
  res.json(task);
});
\`\`\`

**Refactor when it hurts, not before.**

### 2. Committing directly to main (without tests)

**What I did**:
\`\`\`bash
git add .
git commit -m "fix"
git push origin main
\`\`\`

**Friday 9pm. Production down. No easy way to rollback.**

**What I learned**:
- Tests are not optional (they're the safety net)
- Branches let you experiment without fear
- CI/CD should be there from commit #1

**What I'd do today**:
\`\`\`bash
# Initial project setup
git checkout -b develop

# For each feature
git checkout -b feature/new-functionality

# GitHub Actions from the start
# .github/workflows/test.yml
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm test
\`\`\`

**Even personal projects deserve professional workflow.**

### 3. Hardcoding everything (including credentials)

**What I did**:
\`\`\`typescript
const mongoose = require('mongoose');

mongoose.connect('mongodb://admin:password123@localhost:27017/mydb');

const sendEmail = async (to, message) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'myrealemail@gmail.com',
      pass: 'myRealGmailPassword'
    }
  });
};
\`\`\`

**Committed to public GitHub. 3 hours later, Gmail account compromised.**

**What I learned**:
- NEVER commit secrets
- \`.env\` + \`.gitignore\` is the minimum
- Better: use platform environment variables

**What I'd do today**:
\`\`\`bash
# .env (NEVER committed)
DATABASE_URL=mongodb://localhost:27017/mydb
SMTP_USER=myrealemail@gmail.com
SMTP_PASS=myRealPassword

# .env.example (YES committed)
DATABASE_URL=mongodb://localhost:27017/mydb
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_password
\`\`\`

\`\`\`typescript
// config.ts
import 'dotenv/config';

export const config = {
  databaseUrl: process.env.DATABASE_URL!,
  smtp: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!
  }
};
\`\`\`

### 4. Reinventing the wheel in everything

**What I did**:
- Custom authentication (with security bugs)
- Custom validation (that let invalid data through)
- Custom logger (that didn't work well)

**What I learned**:
- Auth is HARD. Use Passport, Auth0, Supabase, whatever
- Validation: Zod, Joi, Yup exist for a reason
- Logging: Winston, Pino already solved it

**What I'd do today**:
\`\`\`typescript
// Auth with Passport (tested by millions)
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

passport.use(new LocalStrategy(async (email, password, done) => {
  const user = await findUserByEmail(email);
  if (!user || !await bcrypt.compare(password, user.password)) {
    return done(null, false);
  }
  return done(null, user);
}));

// Validation with Zod
import { z } from 'zod';

const TaskSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().optional(),
  dueDate: z.date().optional()
});

app.post('/tasks', (req, res) => {
  const result = TaskSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error });
  }
  // ...
});
\`\`\`

**Reinvent the wheel only if your goal is learning. If you want to build, use libraries.**

### 5. Ignoring performance (until it's too late)

**What I did**:
\`\`\`typescript
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find(); // All tasks
  const users = await User.find(); // All users

  const result = tasks.map(task => ({
    ...task,
    user: users.find(u => u.id === task.userId) // N+1 query
  }));

  res.json(result);
});
\`\`\`

**With 10 tasks: works. With 1000: timeout.**

**What I learned**:
- N+1 queries kill performance
- DB indexes are not optional
- Monitor from the start (even with console.time)

**What I'd do today**:
\`\`\`typescript
app.get('/tasks', async (req, res) => {
  // Efficient population (1 query)
  const tasks = await Task.find()
    .populate('user')
    .limit(100) // Always paginate
    .sort({ createdAt: -1 });

  res.json(tasks);
});

// Index in MongoDB
db.tasks.createIndex({ userId: 1, createdAt: -1 });
\`\`\`

### 6. Not documenting anything

**What I did**:
Zero documentation. Came back to the project 2 months later and didn't understand my own code.

**What I learned**:
- README.md with setup instructions is the minimum
- Comment the "why", not the "what"
- Your future self will thank you

**What I'd do today**:
\`\`\`markdown
# Task Manager API

## Setup
\\\`\\\`\\\`bash
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
\\\`\\\`\\\`

## Architecture decisions
- Using MongoDB (not SQL) because we need flexible schema
- Auth with JWT (not sessions) to facilitate horizontal scaling
- Redis for rate limiting (not in-memory) for multiple instances
\`\`\`

\`\`\`typescript
// Comment non-obvious decisions
function calculatePriority(task: Task): number {
  // Using log because priority grows exponentially with urgency
  // Formula: log(daysUntilDue) * importance
  const daysUntilDue = differenceInDays(task.dueDate, new Date());
  return Math.log(daysUntilDue + 1) * task.importance;
}
\`\`\`

## Mistakes you should NOT make

There are instructive mistakes and destructive mistakes:

### ❌ DON'T make these

1. **Not backing up**: lost my DB twice before learning
2. **Exposing API without rate limiting**: $500 in Heroku costs
3. **Not validating user input**: SQL injection (in my own app)
4. **Deploying without health checks**: didn't know when it went down

### ✅ Learn from others on these

- Read postmortems from GitHub, Cloudflare, etc.
- They're lessons without paying the price

## The perfect project to make mistakes

**Ideal characteristics**:
- Complex enough: backend + frontend + DB
- Simple enough: finish in 1-3 months
- Useful to you: you'll actually use it
- Open source: portfolio + free feedback

**My recommendations**:

1. **Personal finance tracker**: CRUD + auth + charts
2. **Personal blog**: SSG + CMS + deploy
3. **Task manager with twist**: the classic, but with your unique idea
4. **API wrapper with cache**: consume external API, improve with Redis

## Meta lessons

### 1. Finish the project

**80% of programmers abandon their first project.**

Don't be that 80%. Even if it's ugly, finish it. Deploy. Share.

**Finished project > perfect abandoned project.**

### 2. Write about your mistakes

Document what went wrong. Public or private, doesn't matter.

**This post was born from my \`MISTAKES.md\` from the first project.**

### 3. Don't compare yourself to seniors

Your first project will be "bad" compared to Google code. **It's normal.**

**Compare yourself to yesterday's you, not to the 10-year senior.**

### 4. All seniors made these mistakes

The same ones. Hardcoded passwords, N+1 queries, zero tests.

**The difference: they already paid for them.**

## My final advice

**Don't try to avoid all mistakes.** It won't work. And you'll get paralyzed.

**Better strategy**:
1. Start with the simplest thing
2. Make mistakes
3. Learn from each one
4. Document lessons
5. Apply in next project

**Your first project is your best teacher.**

It won't be perfect. Nobody will use it (probably). You'll make mistakes.

**And that's perfect.**

Because in 6 months, when you launch your second project, you'll know exactly what NOT to do.

**Now stop reading, and start that project you've been postponing for months.**

The mistakes are waiting for you. (And that's good.)`
    },
    date: '2025-02-08',
    readTime: 12,
    category: 'learning',
    tags: ['Learning', 'First Project', 'Mistakes', 'Best Practices', 'Advice'],
    featured: false
  }
];

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return blogPosts.filter(post => post.featured);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}
