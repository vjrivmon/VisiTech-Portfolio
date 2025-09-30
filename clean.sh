#!/bin/bash

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${RED}╔════════════════════════════════════════════╗${NC}"
echo -e "${RED}║     Limpieza del Sistema Multi-Agente     ║${NC}"
echo -e "${RED}╚════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${YELLOW}⚠️  ADVERTENCIA: Esto eliminará todos los logs y progreso${NC}"
echo -e "${YELLOW}    Los archivos de configuración se mantendrán${NC}"
echo ""

read -p "¿Continuar? (s/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Ss]$ ]]; then
    echo -e "${GREEN}Operación cancelada${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}🧹 Limpiando archivos...${NC}"

# Limpiar logs
if [ -f "agent_status.log" ]; then
    > agent_status.log
    echo -e "${GREEN}✅ agent_status.log limpiado${NC}"
fi

# Reiniciar agent_comms.json
if [ -f "agent_comms.json" ]; then
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
  }
}
EOF
    echo -e "${GREEN}✅ agent_comms.json reiniciado${NC}"
fi

# Limpiar documentación generada
if [ -d ".claude/doc" ]; then
    find .claude/doc -type f -name "*.md" -delete
    echo -e "${GREEN}✅ Documentación generada eliminada${NC}"
fi

# Limpiar context session (opcional)
read -p "¿Eliminar también context_session_portfolio.md? (s/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Ss]$ ]]; then
    if [ -f ".claude/sessions/context_session_portfolio.md" ]; then
        rm .claude/sessions/context_session_portfolio.md
        echo -e "${GREEN}✅ context_session_portfolio.md eliminado${NC}"
    fi
fi

echo ""
echo -e "${GREEN}╔════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║          Limpieza Completada ✅            ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${YELLOW}El sistema está listo para reiniciar.${NC}"
echo -e "${YELLOW}Ejecuta: ./setup.sh para verificar la configuración${NC}"