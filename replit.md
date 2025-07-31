# Overview

This is a full-stack TypeScript application with a React frontend and Express.js backend. The project uses modern web development tools and follows a monorepo structure with shared schemas between client and server. It's configured for development with Vite and includes a comprehensive UI component library based on shadcn/ui.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

### January 31, 2025 - AI Test Case Generation Feature Added
- Added Mistral AI integration for automated test case generation from Figma prototypes
- New AI Test Case Generator section in the UI with "Generate Test Cases from Figma" button
- Backend API endpoint `/api/generate-test-cases` that processes Figma JSON data through Mistral AI
- Automatic parsing of prototype interactions and generation of formatted test cases
- Download functionality for test cases in both web and desktop versions
- Test cases generated in the exact format: `<Test Case Name>,CLICK/CLICK_COORDS,SLEEP,<duration>,CHECK,<expected_text>`

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