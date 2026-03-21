#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import readline from 'readline'
import crypto from 'crypto'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.join(__dirname, '..')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve)
  })
}

function validateMongoURI(uri) {
  return uri.startsWith('mongodb://') || uri.startsWith('mongodb+srv://')
}

function validateFoursquareKey(key) {
  return key.length >= 10 && /^[a-zA-Z0-9_-]+$/.test(key)
}

function generateJWTSecret() {
  return crypto.randomBytes(64).toString('hex')
}

function writeEnvFile(filePath, content) {
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(filePath, content)
}

async function setup() {
  console.log('🚀 JustSplit App Setup Wizard')
  console.log('================================\n')

  let mongoUri, foursquareKey, jwtSecret
  let isInteractive = process.stdin.isTTY

  if (isInteractive) {
    console.log('This wizard will help you configure your environment variables.\n')

    // MongoDB URI
    while (!mongoUri) {
      const input = await question('Enter your MongoDB Atlas URI (mongodb:// or mongodb+srv://): ')
      if (!input.trim()) {
        console.log('⚠️  MongoDB URI is required. Using placeholder...')
        mongoUri = 'mongodb://localhost:27017/justsplitapp'
      } else if (validateMongoURI(input)) {
        mongoUri = input.trim()
      } else {
        console.log('❌ Invalid MongoDB URI format. Please use mongodb:// or mongodb+srv://')
      }
    }

    // Foursquare API Key
    while (!foursquareKey) {
      const input = await question('Enter your Foursquare API Key: ')
      if (!input.trim()) {
        console.log('⚠️  Foursquare API Key is required. Using placeholder...')
        foursquareKey = 'your-foursquare-api-key-here'
      } else if (validateFoursquareKey(input)) {
        foursquareKey = input.trim()
      } else {
        console.log('❌ Invalid Foursquare API Key format. Please enter a valid key.')
      }
    }

    // JWT Secret
    jwtSecret = generateJWTSecret()
    console.log(`✅ Generated JWT Secret: ${jwtSecret.substring(0, 16)}...`)
  } else {
    // Non-interactive mode - use placeholders
    mongoUri = 'mongodb://localhost:27017/justsplitapp'
    foursquareKey = 'your-foursquare-api-key-here'
    jwtSecret = generateJWTSecret()
    console.log('📝 Non-interactive mode detected. Using placeholder values.')
  }

  const featureFlags = 'recommendations:true,ocr:true,chat:true'

  // Write server .env
  const serverEnv = `# Database
MONGODB_URI=${mongoUri}

# Authentication
JWT_SECRET=${jwtSecret}

# Feature flags (comma-separated)
FEATURE_FLAGS=${featureFlags}

# API Keys
FOURSQUARE_API_KEY=${foursquareKey}

# Services
CURRENCY_PROVIDER=frankfurter

# Server
PORT=4000
NODE_ENV=development
`
  writeEnvFile(path.join(rootDir, 'apps', 'server', '.env'), serverEnv)

  // Write web .env
  const webEnv = `# Feature flags (comma-separated)
VITE_FEATURE_FLAGS=${featureFlags}

# API endpoints
VITE_API_URL=http://localhost:4000
VITE_WS_URL=ws://localhost:4000
`
  writeEnvFile(path.join(rootDir, 'apps', 'web', '.env'), webEnv)

  // Write mobile .env
  const mobileEnv = `# Feature flags (comma-separated)
EXPO_PUBLIC_FEATURE_FLAGS=${featureFlags}

# API endpoints
EXPO_PUBLIC_API_URL=http://localhost:4000
EXPO_PUBLIC_WS_URL=ws://localhost:4000
`
  writeEnvFile(path.join(rootDir, 'apps', 'mobile', '.env'), mobileEnv)

  // Write root .env.example
  const rootEnvExample = `# Database
MONGODB_URI=mongodb://localhost:27017/justsplitapp

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Feature flags (comma-separated)
FEATURE_FLAGS=recommendations:true,ocr:true,chat:true

# API Keys
FOURSQUARE_API_KEY=your-foursquare-api-key-here

# Services
CURRENCY_PROVIDER=frankfurter

# Server
PORT=4000
NODE_ENV=development
`
  writeEnvFile(path.join(rootDir, '.env.example'), rootEnvExample)

  console.log('\n✅ Setup completed successfully!')
  console.log('\n📁 Environment files created:')
  console.log('   - apps/server/.env')
  console.log('   - apps/web/.env')
  console.log('   - apps/mobile/.env')
  console.log('   - .env.example')

  if (!isInteractive) {
    console.log('\n📋 Next steps:')
    console.log('   1. Update the placeholder values in the .env files')
    console.log('   2. Run: pnpm i')
    console.log('   3. Run: pnpm dev:all')
  }

  rl.close()
}

setup().catch(console.error)
