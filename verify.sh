#!/bin/bash

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║      Verificación Pre-Vuelo del Sistema   ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════╝${NC}"
echo ""

ERRORS=0
WARNINGS=0

# Function to check file
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✅ $1${NC}"
        return 0
    else
        echo -e "${RED}❌ $1 - NO ENCONTRADO${NC}"
        ERRORS=$((ERRORS + 1))
        return 1
    fi
}

# Function to check directory
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✅ $1/${NC}"
        return 0
    else
        echo -e "${RED}❌ $1/ - NO ENCONTRADO${NC}"
        ERRORS=$((ERRORS + 1))
        return 1
    fi
}

# Function to check executable
check_exec() {
    if [ -x "$1" ]; then
        echo -e "${GREEN}✅ $1 (ejecutable)${NC}"
        return 0
    else
        echo -e "${YELLOW}⚠️  $1 - no ejecutable${NC}"
        WARNINGS=$((WARNINGS + 1))
        return 1
    fi
}

# 1. Archivos esenciales
echo -e "${BLUE}📄 Archivos Esenciales:${NC}"
check_file "developer_profile.json"
check_file ".mcp.json"
check_file ".env.local"
check_file "agent_comms.json"
check_file "agent_status.log"
check_file "INIT_PROMPT.md"
echo ""

# 2. Scripts
echo -e "${BLUE}📜 Scripts:${NC}"
check_exec "setup.sh"
check_exec "watch_agents.sh"
check_exec "clean.sh"
check_exec "verify.sh"
echo ""

# 3. Estructura de directorios
echo -e "${BLUE}📁 Estructura de Directorios:${NC}"
check_dir ".claude"
check_dir ".claude/agents"
check_dir ".claude/sessions"
check_dir ".claude/doc"
check_dir ".claude/doc/architecture"
check_dir ".claude/doc/frontend"
check_dir ".claude/doc/backend"
check_dir ".claude/doc/ui-ux"
check_dir ".claude/doc/devops"
check_dir ".claude/doc/n8n"
check_dir ".claude/doc/executor"
echo ""

# 4. Archivos de agentes
echo -e "${BLUE}🤖 Archivos de Agentes:${NC}"
check_file ".claude/agents/coordinator.md"
check_file ".claude/agents/architect.md"
check_file ".claude/agents/frontend-planner.md"
check_file ".claude/agents/backend-planner.md"
check_file ".claude/agents/ui-ux-analyzer.md"
check_file ".claude/agents/devops-planner.md"
check_file ".claude/agents/n8n-planner.md"
check_file ".claude/agents/executor.md"
echo ""

# 5. Verificar contenido de .env.local
echo -e "${BLUE}🔐 Configuración de GitHub:${NC}"
if [ -f ".env.local" ]; then
    if grep -q "GITHUB_TOKEN=ghp_" .env.local; then
        echo -e "${GREEN}✅ GITHUB_TOKEN configurado${NC}"
    else
        echo -e "${RED}❌ GITHUB_TOKEN no configurado o inválido${NC}"
        ERRORS=$((ERRORS + 1))
    fi
    
    if grep -q "GITHUB_USERNAME=vjrivmon" .env.local; then
        echo -e "${GREEN}✅ GITHUB_USERNAME correcto${NC}"
    else
        echo -e "${YELLOW}⚠️  GITHUB_USERNAME puede estar incorrecto${NC}"
        WARNINGS=$((WARNINGS + 1))
    fi
else
    echo -e "${RED}❌ .env.local no encontrado${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 6. Verificar dependencias del sistema
echo -e "${BLUE}🔧 Dependencias del Sistema:${NC}"
if command -v jq &> /dev/null; then
    echo -e "${GREEN}✅ jq instalado${NC}"
else
    echo -e "${RED}❌ jq no instalado${NC}"
    echo -e "${YELLOW}   Instala con: brew install jq (macOS) o sudo apt install jq (Linux)${NC}"
    ERRORS=$((ERRORS + 1))
fi

if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✅ Node.js instalado ($NODE_VERSION)${NC}"
else
    echo -e "${YELLOW}⚠️  Node.js no detectado${NC}"
    WARNINGS=$((WARNINGS + 1))
fi

if command -v yarn &> /dev/null; then
    YARN_VERSION=$(yarn --version)
    echo -e "${GREEN}✅ Yarn instalado ($YARN_VERSION)${NC}"
else
    echo -e "${YELLOW}⚠️  Yarn no detectado${NC}"
    WARNINGS=$((WARNINGS + 1))
fi
echo ""

# 7. Verificar JSON válido
echo -e "${BLUE}📝 Validación de JSON:${NC}"
if command -v jq &> /dev/null; then
    if jq empty agent_comms.json 2>/dev/null; then
        echo -e "${GREEN}✅ agent_comms.json es JSON válido${NC}"
    else
        echo -e "${RED}❌ agent_comms.json tiene errores de sintaxis${NC}"
        ERRORS=$((ERRORS + 1))
    fi
    
    if [ -f "developer_profile.json" ]; then
        if jq empty developer_profile.json 2>/dev/null; then
            echo -e "${GREEN}✅ developer_profile.json es JSON válido${NC}"
        else
            echo -e "${RED}❌ developer_profile.json tiene errores de sintaxis${NC}"
            ERRORS=$((ERRORS + 1))
        fi
    fi
    
    if [ -f ".mcp.json" ]; then
        if jq empty .mcp.json 2>/dev/null; then
            echo -e "${GREEN}✅ .mcp.json es JSON válido${NC}"
        else
            echo -e "${RED}❌ .mcp.json tiene errores de sintaxis${NC}"
            ERRORS=$((ERRORS + 1))
        fi
    fi
fi
echo ""

# Resumen final
echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║           Resumen de Verificación         ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════╝${NC}"
echo ""

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}🎉 ¡TODO PERFECTO!${NC}"
    echo -e "${GREEN}El sistema está listo para ejecutarse.${NC}"
    echo ""
    echo -e "${YELLOW}Próximos pasos:${NC}"
    echo -e "1. Terminal 1: ${BLUE}./watch_agents.sh${NC}"
    echo -e "2. Terminal 2: ${BLUE}claude-code --agent coordinator \"\$(cat INIT_PROMPT.md)\"${NC}"
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠️  $WARNINGS advertencia(s) encontrada(s)${NC}"
    echo -e "${YELLOW}El sistema puede ejecutarse, pero revisa las advertencias.${NC}"
else
    echo -e "${RED}❌ $ERRORS error(es) encontrado(s)${NC}"
    if [ $WARNINGS -gt 0 ]; then
        echo -e "${YELLOW}⚠️  $WARNINGS advertencia(s) encontrada(s)${NC}"
    fi
    echo -e "${RED}Corrige los errores antes de ejecutar el sistema.${NC}"
fi
echo ""