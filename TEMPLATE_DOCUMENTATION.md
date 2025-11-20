# Next.js Full-Stack Template Documentation

## Table of Contents
1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Architecture](#project-architecture)
4. [Folder Structure](#folder-structure)
5. [Key Features & Patterns](#key-features--patterns)
6. [State Management](#state-management)
7. [API Integration](#api-integration)
8. [Authentication Flow](#authentication-flow)
9. [Styling Approach](#styling-approach)
10. [TypeScript Patterns](#typescript-patterns)
11. [Setup Instructions](#setup-instructions)
12. [Recreating This Template](#recreating-this-template)

---

## Overview

This is a production-ready Next.js 14+ template featuring server-side rendering, client-side state management, authentication, and a modern development workflow with strict linting and formatting rules.

**Author:** Nisharg Shah  
**Last Updated:** 14/05/2024  
**Package Manager:** pnpm (required)  
**Node Version:** >=20.0.0

---

## Tech Stack

### Core Framework
- **Next.js 14.2.3** - React framework with App Router
- **React 18.3.1** - UI library
- **TypeScript 5.4.5** - Type safety

### State Management
- **Zustand 4.5.2** - Client state management (auth, theme, loading)
- **@tanstack/react-query 5.36.0** - Server state management and caching

### Styling
- **Tailwind CSS 3.4.3** - Utility-first CSS framework
- **CSS Modules** - Component-scoped styles
- **PostCSS & Autoprefixer** - CSS processing

### Form & Validation
- **react-hook-form 7.51.4** - Form state management and validation

### HTTP Client
- **Axios 1.6.8** - API requests with interceptors

### UI/UX
- **react-toastify 10.0.5** - Toast notifications
- **next-nprogress-bar 2.3.11** - Loading progress bar
- **clsx 2.1.1** - Conditional class names

### Development Tools
- **ESLint** - Code linting (Airbnb config + custom rules)
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Pre-commit linting
- **TypeScript ESLint** - TypeScript-specific linting

---

## Project Architecture

### Architecture Pattern
This template follows a **feature-based architecture** with clear separation of concerns:

```
├── api/          → HTTP client, axios instance, endpoints
├── app/          → Next.js App Router pages
├── components/   → Reusable UI components
├── config/       → Configuration (queryClient, tokenStore)
├── constants/    → App constants
├── context/      → React Context providers (Zustand)
├── features/     → Feature modules (auth, profile, user)
├── hooks/        → Custom React hooks
├── shared/       → Shared utilities and components
├── store/        → Zustand store and slices
├── styles/       → Global styles
├── types/        → TypeScript type definitions
└── utils/        → Utility functions
```

---

## Folder Structure

### `/src/api/`
Centralized API configuration and utilities.

```typescript
api/
├── api.ts          // Base API class with methods
├── axios.ts        // Axios instance with interceptors
├── endpoints.ts    // API endpoint definitions
├── index.ts        // Public exports
└── utils.ts        // API utility functions
```

**Key Pattern**: Single axios instance with request/response interceptors for token management and error handling.

### `/src/app/`
Next.js App Router with route groups and layouts.

```
app/
├── (auth)/         // Route group for auth pages
│   ├── layout.tsx  // Auth layout
│   └── login/
│       └── page.tsx
├── app/            // Protected app routes
│   ├── layout.tsx  // App layout with auth guard
│   ├── page.tsx    // Dashboard
│   └── users/
│       └── page.tsx
├── _app.tsx        // Client-side app wrapper
├── layout.tsx      // Root layout (SSR)
├── page.tsx        // Home page
├── providers.tsx   // Client providers wrapper
└── global-error.tsx
```

**Key Pattern**: 
- `layout.tsx` handles SSR initialization (theme, auth)
- `providers.tsx` wraps client-side providers
- `_app.tsx` handles client-side initialization
- Route groups for logical organization

### `/src/components/`
Feature-specific components with CSS modules.

```
components/
├── dashboard/
│   ├── Dashboard.tsx
│   └── Dashboard.module.css
├── header/
│   ├── Header.tsx
│   └── Header.module.css
├── login/
│   ├── Login.tsx
│   └── Login.module.css
└── users/
    ├── Users.tsx
    └── Users.module.css
```

**Key Pattern**: Each component has its own module CSS file for scoped styles.

### `/src/features/`
Feature modules with API, hooks, and types.

```
features/
├── auth/
│   ├── auth.api.ts      // API functions
│   ├── auth.type.ts     // TypeScript types
│   └── useLogin.ts      // React Query hook
├── profile/
│   ├── profile.api.ts
│   ├── profile.type.ts
│   └── useProfile.ts
└── user/
    ├── user.api.ts
    ├── user.type.ts
    └── useUsers.ts
```

**Key Pattern**: Each feature is self-contained with its API layer, types, and hooks.

### `/src/store/`
Zustand store with slice pattern.

```
store/
├── slices/
│   ├── auth.slice.ts      // Authentication state
│   ├── loading.slice.ts   // Loading state
│   └── theme.slice.ts     // Theme (dark/light)
├── store.ts               // Store creator
└── index.ts               // useStore hook
```

**Key Pattern**: 
- Slices are combined in `store.ts`
- Server state (user, theme) initialized from SSR
- `useStore` hook with selector pattern

### `/src/types/`
Centralized TypeScript types.

```
types/
├── index.ts       // Common types (Component, Layout, etc.)
├── store.ts       // Store-related types
└── [feature].ts   // Feature-specific types
```

---

## Key Features & Patterns

### 1. Server-Side Initialization
The template initializes state on the server for better UX:

```typescript
// app/layout.tsx
const RootLayout: Layout = async ({ children }) => {
  // Read theme from cookies
  const modeStr = await tokenStore.getAsync(constants.cookies.themeName);
  const { mode } = getMode(modeStr);

  // Fetch user if authenticated
  const { user } = await (async () => {
    const hasToken = await tokenStore.getAsync();
    if (hasToken) {
      return await getProfileApi({}, { throwError: false });
    }
    return { user: undefined };
  })();

  // Pass to client providers
  return (
    <html lang="en" className={`${mode}-mode`}>
      <body>
        <Providers user={user} mode={mode}>
          {children}
        </Providers>
      </body>
    </html>
  );
};
```

### 2. Zustand with Server State Hydration
Zustand store is initialized with server data:

```typescript
// context/ZustandProvider.tsx
const ZustandProvider: Layout<ZustandInitialState> = ({ 
  children, 
  initialState 
}) => {
  const storeRef = useRef<ZustandStoreApi>();
  
  if (!storeRef.current) {
    storeRef.current = createStore(initialState);
  }
  
  return (
    <ZustandContext.Provider value={storeRef.current}>
      {children}
    </ZustandContext.Provider>
  );
};
```

### 3. Type-Safe Store Slices
Zustand slices use a consistent pattern:

```typescript
interface ThemeSlice {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

const createThemeSlice: SliceCreator<ThemeSlice> = set => ({
  mode: 'light',
  setMode: (mode) => {
    set({ mode }, false, 'theme/setMode');
    setModeClient(mode);
  },
});
```

### 4. React Query Integration
Server state managed with React Query:

```typescript
// features/auth/useLogin.ts
export const useLogin = () => {
  const login = useStore(state => state.login);
  
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      login(data.access_token);
    },
  });
};
```

### 5. API Layer Abstraction
Centralized API class:

```typescript
// api/api.ts
class Api {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return axiosInstance.get(url, config);
  }
  
  post<T>(url: string, data?: unknown): Promise<T> {
    return axiosInstance.post(url, data);
  }
}
```

### 6. Token Management
Cookies-based token storage:

```typescript
// config/tokenStore.ts
const tokenStore = {
  get: () => getCookie(constants.cookies.tokenName),
  set: (token: string) => setCookie(constants.cookies.tokenName, token),
  delete: () => deleteCookie(constants.cookies.tokenName),
  getAsync: async () => {
    const token = await getCookie(constants.cookies.tokenName);
    return token;
  },
};
```

### 7. Dark Mode Support
CSS variable-based theming:

```css
:root {
  --theme-white: #fff;
  --theme-black: #000;
}

:root.dark-mode {
  --theme-white: #000;
  --theme-black: #fff;
}
```

### 8. Loading States
Multiple loading mechanisms:
- Website loader (initial load)
- Progress bar (navigation)
- Component-level loading (forms)

---

## State Management

### Zustand Store Structure

```typescript
StoreState = {
  // Auth Slice
  isAuthenticated: boolean;
  token: string | null;
  user: GetProfileOutput | null;
  login: (token: string) => void;
  setUser: (user: GetProfileOutput) => void;
  logout: () => void;
  
  // Loading Slice
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  
  // Theme Slice
  mode: 'dark' | 'light';
  setMode: (mode: Mode) => void;
}
```

### Usage Pattern

```typescript
// In component
const user = useStore(state => state.user);
const setMode = useStore(state => state.setMode);
```

---

## API Integration

### Feature API Structure

Each feature has its own API file:

```typescript
// features/auth/auth.api.ts
export const loginApi = async (data: LoginInput): Promise<LoginOutput> => {
  return api.post<LoginOutput>(endpoints.login, data);
};
```

### React Query Hook Pattern

```typescript
// features/auth/useLogin.ts
export const useLogin = () => {
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      // Handle success
    },
    onError: (error) => {
      // Handle error
    },
  });
};
```

---

## Authentication Flow

1. **Login**: User submits credentials
2. **Token Storage**: Token saved in cookies
3. **Zustand Update**: Auth state updated
4. **Profile Fetch**: User profile fetched
5. **SSR Hydration**: On refresh, server reads token and fetches user
6. **Client Hydration**: Zustand store initialized with server data

---

## Styling Approach

### Hybrid Approach
- **Tailwind CSS**: Utility classes for layout and common styles
- **CSS Modules**: Component-specific styles
- **Global CSS**: Theme variables and base styles

### Example

```tsx
// Using Tailwind
<div className="flex items-center justify-between px-4 py-2">

// Using CSS Modules
import styles from './Header.module.css';
<div className={styles.container}>

// Combining both
<div className={clsx('flex', styles.container)}>
```

---

## TypeScript Patterns

### Generic Types

```typescript
export type Component<E = unknown> = FC<E>;
export type Layout<E = unknown> = FC<Children & E>;
```

### Utility Types

```typescript
// Remove function types
export type RemoveFnType<T> = ConditionalExcept<T, Function>;

// Infer state from slice creators
export type StateFromFunctions<T extends [...any]> = ...;
```

---

## Setup Instructions

1. **Install pnpm globally**
   ```bash
   npm install -g pnpm
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure environment**
   - Copy `.env.development` or `.env.production`
   - Fill in required variables

4. **Run development server**
   ```bash
   pnpm start:dev
   ```

5. **Build for production**
   ```bash
   pnpm build
   pnpm start
   ```

---

## Recreating This Template

### Step 1: Initialize Next.js Project

```bash
npx create-next-app@latest my-project --typescript --app --tailwind
cd my-project
```

### Step 2: Install Core Dependencies

```bash
pnpm add @tanstack/react-query @tanstack/react-query-devtools
pnpm add zustand axios clsx cookies-next
pnpm add react-hook-form react-toastify
pnpm add next-nprogress-bar type-fest
```

### Step 3: Install Dev Dependencies

```bash
pnpm add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
pnpm add -D eslint-config-airbnb eslint-config-airbnb-typescript
pnpm add -D eslint-plugin-import eslint-plugin-jsx-a11y
pnpm add -D eslint-plugin-react eslint-plugin-react-hooks
pnpm add -D eslint-config-prettier eslint-plugin-prettier
pnpm add -D husky lint-staged prettier
pnpm add -D @tanstack/eslint-plugin-query
```

### Step 4: Configure Tailwind

Create `tailwind.config.ts`:
```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
```

Create `postcss.config.js`:
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### Step 5: Create Folder Structure

```bash
mkdir -p src/{api,components,config,constants,context,features,hooks,shared,store,styles,types,utils}
```

### Step 6: Set Up Zustand Store

1. Create `src/store/slices/auth.slice.ts`
2. Create `src/store/slices/theme.slice.ts`
3. Create `src/store/slices/loading.slice.ts`
4. Create `src/store/store.ts` to combine slices
5. Create `src/store/index.ts` with useStore hook

### Step 7: Set Up Context

Create `src/context/ZustandProvider.tsx` with:
- Context creation
- useRef for store persistence
- Initial state hydration

### Step 8: Create API Layer

1. Create `src/api/axios.ts` with interceptors
2. Create `src/api/api.ts` with API class
3. Create `src/api/endpoints.ts` with endpoint constants
4. Create `src/config/tokenStore.ts` for token management

### Step 9: Configure App Router

1. Create `src/app/layout.tsx` (server component)
2. Create `src/app/providers.tsx` (client component)
3. Create `src/app/_app.tsx` (client wrapper)
4. Set up route groups for organization

### Step 10: Create Feature Modules

For each feature:
```
features/[feature]/
├── [feature].api.ts
├── [feature].type.ts
└── use[Feature].ts
```

### Step 11: Configure ESLint

Create `.eslintrc.js` with Airbnb config and custom rules.

### Step 12: Configure Prettier

Create `.prettierrc.js` with formatting rules.

### Step 13: Set Up Git Hooks

```bash
pnpm prepare  # Initialize husky
```

Create `.lintstagedrc.js`:
```javascript
module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{json,css,scss,md}': ['prettier --write'],
};
```

### Step 14: Add Global Styles

Update `src/styles/style.css` with:
- Tailwind directives
- CSS variables for theming
- Global resets

---

## Key Configuration Files

### `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "esnext"],
    "strict": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### `next.config.js`
```javascript
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
  },
};
```

---

## Best Practices

1. **Type Safety**: Always define types for API responses and props
2. **Error Handling**: Use try-catch in async operations
3. **Loading States**: Show loading indicators for async operations
4. **Server Components**: Use SSR for initial data fetching
5. **Client Components**: Mark with 'use client' only when needed
6. **Code Splitting**: Use dynamic imports for heavy components
7. **Caching**: Leverage React Query caching strategies
8. **Accessibility**: Follow a11y guidelines
9. **Git Discipline**: Commit passes all lint and format checks

---

## Common Patterns

### Creating a New Feature

1. Create feature folder: `src/features/[feature]/`
2. Add API functions: `[feature].api.ts`
3. Define types: `[feature].type.ts`
4. Create React Query hooks: `use[Feature].ts`
5. Build UI component: `src/components/[feature]/`
6. Add route: `src/app/[route]/page.tsx`

### Adding a New Page

1. Create page file: `src/app/[route]/page.tsx`
2. Create layout if needed: `src/app/[route]/layout.tsx`
3. Build component: `src/components/[page]/`
4. Connect to store/API as needed

---

## Environment Variables

Create `.env.development` and `.env.production`:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
NEXT_PUBLIC_APP_NAME=My App
# Add other variables as needed
```

---

## Deployment

### Docker

Example `Dockerfile`:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
```

### GitLab CI

Example `.gitlab-ci.yml`:
```yaml
build:
  image: node:20
  script:
    - npm install -g pnpm
    - pnpm install
    - pnpm build
```

---

## Troubleshooting

### Common Issues

1. **ESLint errors**: Run `pnpm lint:fix`
2. **Type errors**: Run `pnpm ts` to check
3. **Formatting**: Run `pnpm prettier:fix`
4. **Cache issues**: Delete `.next` folder

---

## License

ISC

---

## Credits

Template created by **Nisharg Shah**

Fake API: https://fakeapi.platzi.com/

---

**Last Updated:** 14/05/2024
