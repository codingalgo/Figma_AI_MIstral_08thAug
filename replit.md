# Overview

This is a full-stack TypeScript application with a React frontend and Express.js backend. The project uses modern web development tools and follows a monorepo structure with shared schemas between client and server. It's configured for development with Vite and includes a comprehensive UI component library based on shadcn/ui.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

### August 3, 2025 - Enhanced DA Auto Test Generator with Advanced Features
- **Comprehensive Application Description**: Added detailed explanation of how the app works (Figma integration, JSON extraction, AI analysis, test case generation, auto execution)
- **Enhanced Progress Indicators**: Implemented 5-step visual progress with animated progress bars and step-by-step indicators
- **AI Prompt Display**: Added collapsible section showing the actual prompt being sent to Mistral AI for transparency
- **Auto Test Executor**: Integrated automatic launching of c:\testexecutor.bat after downloads complete (desktop version only)
- **Console Output Window**: Added real-time console window to display test executor output with color-coded messages
- **Step-by-Step Process**: Enhanced unified workflow with clear visual progression through Connect → Extract → AI Analysis → Generate → Execute
- **Real-time Feedback**: Users can now see exactly what's happening behind the scenes during each processing step
- **Updated Branding**: Changed heading to "DA: Auto Test Generator from Figma using AI & auto Execution on Device"
- **Numbered Steps**: Added numbered steps (1-5) in expandable application description with color-coded sections
- **Enhanced Animations**: Implemented different color schemes for step states (orange for active, yellow for processing, green for completed)
- **Persistent Progress**: Steps remain visible after completion to show the complete workflow
- **Unified Button Sizing**: Made individual operation buttons consistent in size and styling

### August 1, 2025 - Electron Desktop App Implementation
- **Desktop App Support**: Added full Electron desktop application functionality
- **Executable Runner**: Desktop app can select and run .exe files for automated testing
- **File System Access**: Desktop version supports native file selection and directory saving
- **Dual Mode Operation**: Both web browser and desktop app modes available
- **Startup Scripts**: Created `start-desktop.bat` for easy desktop app launching
- **Documentation**: Added README.md with clear instructions for both modes

### January 31, 2025 - Complete DA Auto Test Generator Implementation
- **Rebranded**: Changed from "Figma Frame Exporter" to "DA Auto Test Generator from Figma"
- **Updated tagline**: "Generate and validate test case & auto execute on real device"
- **Unified Operation**: New main button "🚀 Generate Everything - Export Frames + AI Test Cases"
- **Single-click automation**: Exports all frames, generates AI test cases, and downloads everything automatically
- **Enhanced AI prompt**: Improved Mistral AI integration with detailed formatting requirements
- **Payload optimization**: Increased server limits to 50MB and optimized data processing
- **Sequential workflow**: Unified process runs frames export → AI test generation → automatic downloads
- **Individual operations**: Maintained separate buttons for frame-only or test-case-only operations
- **Auto-download**: Test cases automatically download as testcases.txt after generation

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: shadcn/ui component library with Radix UI primitives

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: tsx for TypeScript execution in development
- **Build**: esbuild for production bundling

### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: Configured for PostgreSQL (via Neon serverless)
- **Schema Management**: Shared schema definitions in TypeScript
- **Migrations**: Drizzle Kit for schema migrations

## Key Components

### Project Structure
```
├── client/          # React frontend application
├── server/          # Express.js backend application
├── shared/          # Shared TypeScript schemas and types
├── migrations/      # Database migration files
└── dist/           # Build output directory
```

### Shared Schema
- User management with username/password authentication
- Type-safe schema definitions using Drizzle ORM
- Zod validation schemas for runtime type checking

### Storage Layer
- Abstract storage interface for CRUD operations
- In-memory storage implementation for development
- Designed for easy swapping to database-backed storage

### Development Tools
- Hot module replacement with Vite
- TypeScript checking across the entire monorepo
- Replit-specific development enhancements

## Data Flow

1. **Client Requests**: React components use TanStack Query for data fetching
2. **API Layer**: Express.js routes handle HTTP requests with `/api` prefix
3. **Business Logic**: Route handlers interact with storage interface
4. **Data Storage**: Storage layer abstracts database operations
5. **Response**: JSON responses sent back to client with error handling

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **@tanstack/react-query**: Client-side data fetching and caching
- **@radix-ui/***: Accessible UI component primitives
- **drizzle-orm**: Type-safe database ORM
- **express**: Web application framework
- **react**: Frontend UI library
- **tailwindcss**: Utility-first CSS framework

### Development Dependencies
- **vite**: Build tool and dev server
- **tsx**: TypeScript execution for Node.js
- **esbuild**: JavaScript bundler for production
- **drizzle-kit**: Database schema management

## Deployment Strategy

### Development
- Vite dev server for frontend with HMR
- tsx for running TypeScript backend directly
- Concurrent development of frontend and backend

### Production Build
1. **Frontend**: Vite builds React app to `dist/public`
2. **Backend**: esbuild bundles Express server to `dist/index.js`
3. **Static Serving**: Express serves built frontend files
4. **Database**: Migrations applied via Drizzle Kit

### Environment Configuration
- `DATABASE_URL` required for PostgreSQL connection
- Development vs production modes handled via `NODE_ENV`
- Replit-specific configurations for cloud development

The application is designed to be deployment-ready for platforms like Replit, with proper environment variable handling and build processes for both development and production environments.