# GitHub Copilot Instructions - School Management System

## Project Context
This is an Angular 20 + Firebase school management system with TypeScript, TailwindCSS, focusing on student enrollment, teacher management, class scheduling, and grade tracking using modern Angular features.

## Code Style & Standards

### Angular 20 Modern Features
- Use Angular Signals for reactive state management
- Implement HttpClient with resource pattern for HTTP operations
- Use standalone components (no NgModules)
- Implement control flow with @if, @for, @switch
- Use inject() function for dependency injection
- Implement view transitions API where supported
- Use Angular's new lifecycle hooks (afterNextRender, afterRender)
- Prefer computed signals over pipes for transformations

### TypeScript & Angular Architecture
- Use strict TypeScript with explicit types
- Implement signal-based reactive forms
- Use input() and output() signal functions for component communication
- Follow Angular style guide with standalone component architecture
- Use async/await with signal-based error handling
- Implement proper signal effects and computations

### Firebase Integration with Signals
- Use Firestore with signal-based reactive patterns
- Convert Firebase observables to signals using toSignal()
- Implement Firebase Authentication with signal state management
- Use AngularFire with signal integration patterns
- Structure Firestore documents with proper signal updates
- Use Firebase Security Rules for data protection
- Implement offline persistence with signal state sync

### Component Structure with Signals
- Create standalone reusable components
- Use signal inputs and outputs for communication
- Implement signal-based state management in components
- Use TailwindCSS for all styling (no Angular Material)
- Follow mobile-first responsive design with Tailwind
- Use signal-driven template updates with @if/@for

### Service Patterns with Signals
- Create signal-based services for Firebase collections
- Use inject() function for dependency injection
- Implement signal stores for complex state management
- Use computed signals for derived data
- Create signal-based CRUD operations
- Handle loading and error states with signals

### TailwindCSS Guidelines
- Use TailwindCSS utility classes exclusively
- Implement responsive design with Tailwind breakpoints
- Use Tailwind's color palette and design tokens
- Create component variants with Tailwind class combinations
- Use Tailwind forms plugin for form styling
- Implement dark mode with Tailwind's dark: prefix
- Use @apply sparingly, prefer utility classes

### Security & Validation with Signals
- Validate inputs using signal-based validators
- Use Angular guards with signal integration
- Implement role-based access with signal state
- Use signal effects for security rule enforcement
- Sanitize data in signal transformations
- Use environment signals for configuration
- Handle authentication state with signals

### File Organization
- Use standalone components in feature folders
- Create signal stores for shared state
- Keep components focused and signal-driven
- Separate Firebase services with signal integration
- Create typed interfaces for all Firebase documents
- Use index.ts files for clean imports

### HTTP and Data Management
- Use HttpClient with resource pattern for REST APIs
- Implement signal-based caching strategies
- Convert HTTP observables to signals with toSignal()
- Use computed signals for data transformations
- Implement real-time updates with Firestore signals
- Handle loading states with signal patterns

### Testing with Modern Angular
- Write unit tests for signal-based components
- Mock Firebase with signal test utilities
- Test signal computations and effects
- Use Angular Testing Library patterns
- Create signal-based test fixtures
- Test error scenarios with signal error handling

### Performance with Signals
- Use OnPush change detection (default with signals)
- Implement lazy loading with standalone components
- Optimize with computed signals instead of pipes
- Use signal effects for side effects only
- Implement virtual scrolling with signal data
- Cache computed values with signal memoization

### Naming Conventions
- Use camelCase for signals and variables
- Use PascalCase for standalone components and interfaces
- Use kebab-case for file names and selectors
- Prefix signal stores with 'use' (e.g., useStudentStore)
- Add 'Signal' suffix to signal services
- Use descriptive names for Firebase collections

### Control Flow and Templates
- Use @if instead of *ngIf
- Use @for instead of *ngFor with proper track expressions
- Use @switch instead of *ngSwitch
- Implement signal-driven conditional rendering
- Use computed signals for complex template logic
- Avoid pipes, prefer computed signals

### Error Handling with Signals
- Create signal-based error handling service
- Use signal effects for error side effects
- Implement error signals in components
- Handle Firebase errors with signal patterns
- Show user feedback with signal-driven notifications
- Log errors using signal effects

### Data Management Patterns
- Use signal-based forms for user inputs
- Implement signal stores for complex state
- Create signal resources for HTTP operations
- Use Firebase with signal integration patterns
- Implement optimistic updates with signals
- Use Firebase Timestamp with signal transformations

### UI/UX with TailwindCSS
- Use TailwindCSS utility classes for all styling
- Implement loading states with Tailwind animations
- Create modal dialogs with Tailwind and signals
- Use Tailwind forms for input styling
- Implement responsive grids with Tailwind
- Use Tailwind's transition utilities for animations
- Create custom components with Tailwind composition

### Modern Angular Patterns
- Use inject() in component constructors
- Implement afterNextRender for DOM operations
- Use computed() for derived signal values
- Use effect() for signal side effects
- Implement untracked() for non-reactive reads
- Use resource() for HTTP operations with signals
