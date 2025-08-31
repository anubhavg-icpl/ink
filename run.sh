#!/bin/bash

# DevHub CLI Runner Script

echo "🚀 DevHub CLI - Ultimate Developer Dashboard"
echo "============================================"
echo ""
echo "Building and launching DevHub..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    pnpm install
fi

# Check if dist directory exists
if [ ! -d "dist" ]; then
    echo "🔨 Building application..."
    pnpm build
fi

# Run the application
echo "✨ Starting DevHub CLI..."
echo ""
node dist/index.js "$@"