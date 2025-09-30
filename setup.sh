#!/bin/bash

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  VisiTech Portfolio - Setup Automático   ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════╝${NC}"
echo ""

# Check if running in correct directory
if [ ! -d ".claude" ]; then
    echo -e "${YELLOW}📁 Creando estructura de directorios...${NC}"
fi

# 1. Copiar .env.example
echo -e "${YELLOW}📋 Paso 1: Configurando variables de entorno...${NC}"
if [ ! -f ".env.local" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env.local
        echo -e "${GREEN}✅ Archivo .env.local creado${NC}"
        echo -e "${YELLOW}⚠️  IMPORTANTE: Edita .env.local con tus tokens reales${NC}"
    else
        echo -e "${RED}❌ .env.example no encontrado${NC}"
    fi
else
    echo -e "${BLUE}ℹ️  .env.local ya existe, saltando...${NC}"
fi

# 2. Crear estructura de carpetas
echo ""
echo -e "${YELLOW}📁 Paso 2: Creando estructura de carpetas...${NC}"

directories=(
    ".claude"
    ".claude/agents"
    ".claude/sessions"
    ".claude/doc"
    ".claude/doc/architecture"
    ".claude/doc/frontend"
    ".claude/doc/backend"
    ".claude/doc/ui-ux"
    ".claude/doc/devops"
    ".claude/doc/n8n"
    ".claude/doc/executor"
    ".claude/tools"
    "public"
    "public/projects"
    "public/og-images"
)

for dir in "${directories[@]}"; do
    if [ ! -d "$dir" ]; then
        mkdir -p "$dir"
        echo -e "${GREEN}✅ Creado: $dir${NC}"
    else
        echo -e "${BLUE}ℹ️  Ya existe: $dir${NC}"
    fi
done

# 3. Copiar developer_profile.json
echo ""
echo -e "${YELLOW}⚙️  Paso 3: Verificando archivos de configuración...${NC}"

if [ -f "developer_profile.json" ]; then
    cp developer_profile.json .claude/sessions/
    echo -e "${GREEN}✅ developer_profile.json copiado a .claude/sessions/${NC}"
else
    echo -e "${RED}❌ developer_profile.json no encontrado${NC}"
    echo -e "${YELLOW}   Crea este archivo con tu perfil antes de continuar${NC}"
fi

if [ -f ".mcp.json" ]; then
    echo -e "${GREEN}✅ .mcp.json encontrado${NC}"
else
    echo -e "${RED}❌ .mcp.json no encontrado${NC}"
    echo -e "${YELLOW}   Crea este archivo con la configuración de MCPs${NC}"
fi

# 4. Inicializar agent_comms.json
echo ""
echo -e "${YELLOW}🤖 Paso 4: Inicializando sistema de comunicación de agentes...${NC}"

if [ ! -f "agent_comms.json" ]; then
    cat > agent_comms.json << 'EOF'
{
  "project": "visitech-portfolio",
  "phase": "not-started",
  "lastUpdate": "",
  "agents": {
    "coordinator": {
      "status": "ready",
      "currentTask": null,
      "pending": [],
      "doing": [],
      "done": [],
      "blockedBy": [],
      "blocking": []
    },
    "architect": {
      "status": "waiting",
      "currentTask": null,
      "pending": [],
      "doing": [],
      "done": [],
      "blockedBy": [],
      "blocking": []
    },
    "frontend-planner": {
      "status": "waiting",
      "currentTask": null,
      "pending": [],
      "doing": [],
      "done": [],
      "blockedBy": ["architect"],
      "blocking": []
    },
    "backend-planner": {
      "status": "waiting",
      "currentTask": null,
      "pending": [],
      "doing": [],
      "done": [],
      "blockedBy": ["architect"],
      "blocking": []
    },
    "ui-ux-analyzer": {
      "status": "waiting",
      "currentTask": null,
      "pending": [],
      "doing": [],
      "done": [],
      "blockedBy": ["frontend-planner"],
      "blocking": []
    },
    "devops-planner": {
      "status": "waiting",
      "currentTask": null,
      "pending": [],
      "doing": [],
      "done": [],
      "blockedBy": ["architect"],
      "blocking": []
    },
    "n8n-planner": {
      "status": "waiting",
      "currentTask": null,
      "pending": [],
      "doing": [],
      "done": [],
      "blockedBy": ["backend-planner"],
      "blocking": []
    },
    "executor": {
      "status": "waiting",
      "currentTask": null,
      "pending": [],
      "doing": [],
      "done": [],
      "blockedBy": ["architect", "frontend-planner", "backend-planner", "ui-ux-analyzer", "devops-planner", "n8n-planner"],
      "blocking": []
    }
  },
  "dependencies": {
    "coordinator": [],
    "architect": [],
    "frontend-planner": ["architect"],
    "backend-planner": ["architect"],
    "ui-ux-analyzer": ["frontend-planner"],
    "devops-planner": ["architect"],
    "n8n-planner": ["backend-planner"],
    "executor": ["architect", "frontend-planner", "backend-planner", "ui-ux-analyzer", "devops-planner", "n8n-planner"]
  },
  "mcps_available": [
    "shadcn-ui",
    "playwright",
    "github-api",
    "vercel-api",
    "n8n-api",
    "filesystem",
    "markdown",
    "docker"
  ]
}
EOF
    echo -e "${GREEN}✅ agent_comms.json inicializado${NC}"
else
    echo -e "${BLUE}ℹ️  agent_comms.json ya existe${NC}"
fi

# 5. Crear agent_status.log
if [ ! -f "agent_status.log" ]; then
    touch agent_status.log
    echo -e "${GREEN}✅ agent_status.log creado${NC}"
else
    echo -e "${BLUE}ℹ️  agent_status.log ya existe${NC}"
fi

# 6. Verificar watch_agents.sh
echo ""
echo -e "${YELLOW}📊 Paso 5: Verificando script de monitoreo...${NC}"

if [ -f "watch_agents.sh" ]; then
    chmod +x watch_agents.sh
    echo -e "${GREEN}✅ watch_agents.sh encontrado y ejecutable${NC}"
else
    echo -e "${RED}❌ watch_agents.sh no encontrado${NC}"
    echo -e "${YELLOW}   Crea este archivo para monitorear los agentes${NC}"
fi

# 7. Verificar jq
echo ""
echo -e "${YELLOW}🔍 Paso 6: Verificando dependencias...${NC}"

if command -v jq &> /dev/null; then
    echo -e "${GREEN}✅ jq está instalado${NC}"
else
    echo -e "${RED}❌ jq no está instalado${NC}"
    echo -e "${YELLOW}   Instala con: brew install jq (macOS) o sudo apt install jq (Linux)${NC}"
fi

# 8. Verificar configuración de GitHub
echo ""
echo -e "${YELLOW}🔍 Paso 7: Verificando configuración de GitHub...${NC}"

if [ -f ".env.local" ]; then
    if grep -q "ghp_" .env.local; then
        echo -e "${GREEN}✅ GITHUB_TOKEN encontrado en .env.local${NC}"
    else
        echo -e "${RED}❌ GITHUB_TOKEN no configurado en .env.local${NC}"
        echo -e "${YELLOW}   Genera tu token en: https://github.com/settings/tokens${NC}"
        echo -e "${YELLOW}   Scopes necesarios: repo (read), user (read)${NC}"
    fi
    
    if grep -q "vjrivmon" .env.local; then
        echo -e "${GREEN}✅ GITHUB_USERNAME configurado${NC}"
    else
        echo -e "${YELLOW}⚠️  Verifica que GITHUB_USERNAME=vjrivmon en .env.local${NC}"
    fi
else
    echo -e "${RED}❌ Archivo .env.local no encontrado${NC}"
fi

# 9. Resumen final
echo ""
echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║           Setup Completado ✅              ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${GREEN}Próximos pasos:${NC}"
echo ""
echo -e "1. ${YELLOW}Configura tus tokens en .env.local:${NC}"
echo -e "   ${BLUE}nano .env.local${NC}"
echo ""
echo -e "2. ${YELLOW}Genera tu GitHub Personal Access Token:${NC}"
echo -e "   ${BLUE}https://github.com/settings/tokens${NC}"
echo -e "   Scopes necesarios: ${GREEN}repo (read), user (read)${NC}"
echo ""
echo -e "3. ${YELLOW}Verifica los archivos de agentes en .claude/agents/${NC}"
echo -e "   Debes tener 8 archivos: coordinator.md, architect.md, etc."
echo ""
echo -e "4. ${YELLOW}Inicia el monitor de agentes (Terminal 1):${NC}"
echo -e "   ${BLUE}./watch_agents.sh${NC}"
echo ""
echo -e "5. ${YELLOW}Ejecuta el sistema multi-agente (Terminal 2):${NC}"
echo -e "   ${BLUE}claude-code --agent coordinator \"\$(cat INIT_PROMPT.md)\"${NC}"
echo ""
echo -e "${GREEN}¡Todo listo para empezar! 🚀${NC}"