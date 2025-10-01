#!/bin/bash

# Script para inicializar todos los servidores MCP del proyecto
# Autor: Vicente Rivas Monferrer (@vjrivmon)
# Proyecto: visitech_portfolio

echo "🚀 Iniciando servidores MCP para visitech_portfolio..."
echo ""

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Array de servidores MCP configurados
declare -A MCP_SERVERS=(
  ["github"]="@modelcontextprotocol/server-github"
  ["filesystem"]="@modelcontextprotocol/server-filesystem"
  ["sequential-thinking"]="@modelcontextprotocol/server-sequential-thinking"
  ["playwright"]="@executeautomation/playwright-mcp-server"
  ["chakra-ui"]="@chakra-ui/react-mcp"
  ["puppeteer"]="puppeteer-mcp-server"
  ["reactbits"]="reactbits-dev-mcp-server"
)

# Función para verificar si un servidor MCP está disponible
check_mcp_server() {
  local name=$1
  local package=$2

  echo -n "Verificando ${name}... "

  # Verificar si el paquete existe sin ejecutarlo
  if timeout 2 bash -c "echo '' | npx -y ${package} 2>&1 | head -1" &>/dev/null; then
    echo -e "${GREEN}✓ Disponible${NC}"
    return 0
  else
    echo -e "${RED}✗ No disponible${NC}"
    return 1
  fi
}

# Verificar todos los servidores
echo "📋 Verificando disponibilidad de servidores MCP:"
echo ""

available_count=0
total_count=${#MCP_SERVERS[@]}

for name in "${!MCP_SERVERS[@]}"; do
  package="${MCP_SERVERS[$name]}"
  if check_mcp_server "$name" "$package"; then
    ((available_count++))
  fi
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "Resultado: ${GREEN}${available_count}/${total_count}${NC} servidores MCP disponibles"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ $available_count -eq $total_count ]; then
  echo -e "${GREEN}✅ Todos los servidores MCP están funcionando correctamente${NC}"
  exit 0
else
  echo -e "${YELLOW}⚠️  Algunos servidores MCP no están disponibles${NC}"
  echo "   Verifica la configuración en .mcp.json"
  exit 1
fi
