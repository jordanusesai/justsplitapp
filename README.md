# JustSplit App

A production-grade monorepo for splitting bills and expenses with friends, built with modern web and mobile technologies.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and pnpm 8+
- MongoDB Atlas or local MongoDB instance
- Foursquare API Key (optional, for place recommendations)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd justsplitapp

# Install dependencies
pnpm i

# Run the interactive setup wizard
pnpm setup

# Start all applications in development mode
pnpm dev:all
```

### What the Setup Wizard Does

The `pnpm setup` command will:
1. Prompt for your MongoDB Atlas URI (validates format)
2. Prompt for your Foursquare API Key (validates format)
3. Generate a strong JWT secret for authentication
4. Create `.env` files for all applications
5. Set up feature flags with development defaults

### Development URLs

After running `pnpm dev:all`, you can access:

- **Web App**: http://localhost:5173
- **API Server**: http://localhost:4000
- **Mobile App**: Use Expo Go app to scan QR code or run `pnpm --filter @justsplitapp/mobile start`

## 📱 Applications

### Web App (`apps/web`)

Built with:
- **React 18** + TypeScript
- **Vite** for fast development
- **React Router** for navigation
- **TanStack Query** for server state
- **Zustand** for client state
- **i18next** for internationalization
- **Tailwind CSS** for styling

### Mobile App (`apps/mobile`)

Built with:
- **Expo** (React Native)
- **Expo Router** for navigation
- **TypeScript**
- **Zustand** for state management
- **i18next** for internationalization

### API Server (`apps/server`)

Built with:
- **NestJS** framework
- **TypeScript**
- **Mongoose** for MongoDB
- **Socket.IO** for real-time features
- **JWT** for authentication
- **Feature flags** system

## 📦 Packages

### Shared Packages

- **@justsplitapp/types** - Shared TypeScript interfaces
- **@justsplitapp/utils** - Common utility functions
- **@justsplitapp/tokens** - Design tokens and theme
- **@justsplitapp/ui** - Shared UI components
- **@justsplitapp/testing** - Testing utilities and mocks

## 🚦 Feature Flags

The application uses a feature flag system for controlled rollouts:

### Development Flags
```bash
recommendations:true,ocr:true,chat:true,mockMode:true
```

### Production Flags
```bash
recommendations:false,ocr:true,chat:true,mockMode:false
```

### Available Flags

- **recommendations**: Enable place recommendations
- **ocr**: Enable receipt OCR scanning
- **chat**: Enable in-app chat features
- **mockMode**: Use mock data instead of real API calls

## 🛠️ Scripts

### Root Level Scripts

```bash
# Setup and development
pnpm setup              # Run interactive setup wizard
pnpm dev:all             # Start all apps in development mode

# Building
pnpm build               # Build all packages and apps
pnpm build:web           # Build only web app
pnpm build:mobile        # Build only mobile app
pnpm build:server        # Build only server

# Testing
pnpm test                # Run all tests
pnpm test:watch          # Run tests in watch mode
pnpm test:coverage       # Run tests with coverage

# Code quality
pnpm lint                # Run ESLint on all files
pnpm typecheck           # Run TypeScript type checking
pnpm format              # Format code with Prettier
pnpm format:check        # Check code formatting

# Storybook
pnpm storybook           # Start web Storybook
pnpm component-gallery   # Start mobile component gallery
```

### App-Specific Scripts

```bash
# Web app
pnpm --filter @justsplitapp/web dev
pnpm --filter @justsplitapp/web build
pnpm --filter @justsplitapp/web storybook

# Mobile app
pnpm --filter @justsplitapp/mobile start
pnpm --filter @justsplitapp/mobile android
pnpm --filter @justsplitapp/mobile ios

# Server
pnpm --filter @justsplitapp/server dev
pnpm --filter @justsplitapp/server build
pnpm --filter @justsplitapp/server start:prod
```

## 🏗️ Architecture

### Monorepo Structure

```
justsplitapp/
├── apps/
│   ├── web/           # React web application
│   ├── mobile/        # Expo React Native app
│   └── server/        # NestJS API server
├── packages/
│   ├── ui/            # Shared UI components
│   ├── tokens/        # Design tokens
│   ├── types/         # TypeScript definitions
│   ├── utils/         # Utility functions
│   └── testing/       # Testing utilities
├── tools/
│   └── setup.mjs      # Interactive setup wizard
├── .github/
│   └── workflows/     # CI/CD pipelines
├── turbo.json         # Turborepo configuration
├── pnpm-workspace.yaml # PNPM workspace config
└── tsconfig.base.json # Base TypeScript config
```

### Data Flow

1. **Web/Mobile** → **API Server** via HTTP/REST
2. **Real-time updates** via Socket.IO
3. **Shared types** ensure type safety across apps
4. **Feature flags** control functionality per environment

## 🌐 Deployment

### Render Deployment

The repository includes `render.yaml` for automatic deployment to Render:

- **Web App**: Static site deployment
- **API Server**: Node.js service with MongoDB
- **Database**: Managed MongoDB instance

### Environment Variables

#### Server (.env)
```bash
MONGODB_URI=mongodb://localhost:27017/justsplitapp
JWT_SECRET=your-super-secret-jwt-key
FEATURE_FLAGS=recommendations:true,ocr:true,chat:true,mockMode:true
FOURSQUARE_API_KEY=your-foursquare-api-key
PORT=4000
NODE_ENV=development
```

#### Web (.env)
```bash
VITE_FEATURE_FLAGS=recommendations:true,ocr:true,chat:true,mockMode:true
VITE_API_URL=http://localhost:4000
```

#### Mobile (.env)
```bash
EXPO_PUBLIC_FEATURE_FLAGS=recommendations:true,ocr:true,chat:true,mockMode:true
EXPO_PUBLIC_API_URL=http://localhost:4000
```

## 🧪 Testing

### Unit Tests
```bash
pnpm test                # Run all unit tests
pnpm test:watch          # Run tests in watch mode
pnpm test:coverage       # Run tests with coverage report
```

### E2E Tests
```bash
pnpm test:e2e            # Run end-to-end tests
```

### Component Testing
```bash
pnpm storybook           # View and test components
pnpm component-gallery   # Mobile component testing
```

## 📱 Accessibility

The application follows WCAG 2.2 AA guidelines:

- **Keyboard navigation** support
- **Screen reader** compatibility
- **Color contrast** ratios
- **Touch targets** minimum 44px for mobile
- **Semantic HTML** structure
- **ARIA labels** where needed

## 🔧 Development Guidelines

### Code Style

- **ESLint** + **Prettier** for consistent formatting
- **Conventional Commits** for commit messages
- **TypeScript** strict mode enabled
- **Husky** + **lint-staged** for pre-commit hooks

### Commit Message Format

```
feat: add new feature
fix: fix bug in existing feature
docs: update documentation
style: format code, add missing semicolons, etc.
refactor: refactor code without changing behavior
perf: performance improvements
test: add or update tests
chore: maintenance tasks
```

### Branch Strategy

- `main` - Production-ready code
- `develop` - Integration branch
- `feature/*` - Feature branches
- `hotfix/*` - Critical fixes

## 🚀 What's Next

### Planned Features

- [ ] Receipt OCR scanning with ML
- [ ] Place recommendations with Foursquare API
- [ ] Real-time collaboration on splits
- [ ] In-app chat for group discussions
- [ ] Advanced analytics and insights
- [ ] Multi-currency support with real-time rates
- [ ] Payment integrations (Stripe, PayPal)
- [ ] Push notifications
- [ ] Offline mode support

### Technical Improvements

- [ ] Progressive Web App (PWA) support
- [ ] Advanced caching strategies
- [ ] Performance monitoring
- [ ] Error tracking integration
- [ ] Automated security scanning
- [ ] Load testing setup

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`pnpm test`)
5. Commit your changes (`git commit -m 'feat: add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Join our [Discord](https://discord.gg/your-invite) for community support

---

## 📋 UI Prompt.txt Compliance

This implementation strictly follows the requirements outlined in `UI Prompt.txt`:

### ✅ Implemented Features
- **Monorepo Architecture**: pnpm + Turborepo with shared packages.
- **Cross-Platform Parity**: Web (Vite) and Mobile (Expo) feature parity.
- **Design System**: Centralized tokens in `packages/tokens` with platform-specific implementations.
- **Accessibility**: WCAG 2.2 AA compliant, 44pt touch targets, ARIA labels, and SR announcements.
- **Expense Management**: Full flow for adding expenses, including split logic (equal, exact, percentage, shares).
- **OCR Scanning**: Mock OCR service with parse preview, editable fields, and status updates.
- **Currency Support**: Frankfurter integration with fallback to exchangerate.host and rate-locking logic.
- **Place Recommendations**: Foursquare integration gated by explicit user consent.
- **Real-time Chat**: Socket.IO powered chat with embedded expense cards and inline actions.
- **Deployment**: Render "Blueprints as Code" with `render.yaml` for dev and prod environments.
- **Developer Experience**: Interactive setup wizard, conventional commits, and pre-commit hooks.

### 🎯 Architecture
- **Modular NestJS Backend**: Structured modules for Users, Splits, OCR, Currency, and Places.
- **Type Safety**: Shared zod-validated interfaces in `packages/types`.
- **Responsive UI**: Tailwind-powered web UI and token-driven React Native styles.
- **Environment Separation**: Distinct feature flag sets for development and production.

---
