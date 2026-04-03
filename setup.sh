#!/bin/bash

# Color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Setting up Hornet Project...${NC}"
echo ""

# Install dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
npm install --legacy-peer-deps

if [ $? -ne 0 ]; then
    echo "Failed to install dependencies"
    exit 1
fi

echo -e "${GREEN}✓ Dependencies installed successfully!${NC}"
echo ""

# Start development server
echo -e "${BLUE}🔧 Starting development server on http://localhost:9002...${NC}"
echo ""

npm run dev
