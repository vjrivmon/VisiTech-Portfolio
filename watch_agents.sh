#!/bin/bash

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

while true; do
    clear
    echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║    Multi-Agent System Monitor - $(date '+%H:%M:%S')    ║${NC}"
    echo -e "${BLUE}╚════════════════════════════════════════════╝${NC}"
    echo ""
    
    if [ -f "agent_comms.json" ]; then
        echo -e "${GREEN}🎯 COORDINATOR${NC}"
        jq -r '.agents.coordinator | "Status: \(.status) | Done: \(.done | length) tasks"' agent_comms.json 2>/dev/null || echo "Parsing..."
        echo ""
        
        echo -e "${BLUE}🏗️  ARCHITECT${NC}"
        jq -r '.agents.architect | "Status: \(.status) | Pending: \(.pending | length) | Doing: \(.doing | length) | Done: \(.done | length)"' agent_comms.json 2>/dev/null || echo "Waiting..."
        echo ""
        
        echo -e "${BLUE}⚛️  FRONTEND${NC}"
        jq -r '.agents["frontend-planner"] | "Status: \(.status) | Pending: \(.pending | length) | Doing: \(.doing | length) | Done: \(.done | length)"' agent_comms.json 2>/dev/null || echo "Waiting..."
        echo ""
        
        echo -e "${BLUE}🔧 BACKEND${NC}"
        jq -r '.agents["backend-planner"] | "Status: \(.status) | Pending: \(.pending | length) | Doing: \(.doing | length) | Done: \(.done | length)"' agent_comms.json 2>/dev/null || echo "Waiting..."
        echo ""
        
        echo -e "${BLUE}🎨 UI/UX${NC}"
        jq -r '.agents["ui-ux-analyzer"] | "Status: \(.status) | Pending: \(.pending | length) | Doing: \(.doing | length) | Done: \(.done | length)"' agent_comms.json 2>/dev/null || echo "Waiting..."
        echo ""
        
        echo -e "${BLUE}🚀 DEVOPS${NC}"
        jq -r '.agents["devops-planner"] | "Status: \(.status) | Pending: \(.pending | length) | Doing: \(.doing | length) | Done: \(.done | length)"' agent_comms.json 2>/dev/null || echo "Waiting..."
        echo ""
        
        echo -e "${BLUE}⚡ N8N${NC}"
        jq -r '.agents["n8n-planner"] | "Status: \(.status) | Pending: \(.pending | length) | Doing: \(.doing | length) | Done: \(.done | length)"' agent_comms.json 2>/dev/null || echo "Waiting..."
        echo ""
        
        echo -e "${RED}🎬 EXECUTOR${NC}"
        jq -r '.agents.executor | "Status: \(.status) | Progress: \(.progress // "0%")"' agent_comms.json 2>/dev/null || echo "Waiting..."
        echo ""
        
        echo -e "${YELLOW}📋 Recent Activity:${NC}"
        echo "─────────────────"
        tail -n 5 agent_status.log 2>/dev/null || echo "No activity yet"
    else
        echo -e "${RED}⏳ Waiting for system initialization...${NC}"
    fi
    
    sleep 2
done