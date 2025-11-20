# React.js Full-Stack Template

A production-ready React.js template featuring modern tooling, state management, authentication, and best practices.

**Author:** Nisharg Shah  
**Tech Stack:** React 18 + Vite + JavaScript  
**Package Manager:** npm/yarn/pnpm

---

## ✨ Features

- ⚡️ **Vite** - Lightning fast build tool
- ⚛️ **React 18.3** - Latest React with hooks
- 🎨 **Tailwind CSS + CSS Modules** - Hybrid styling approach
- 🔐 **Authentication** - Complete auth flow with JWT
- 📊 **Zustand** - Lightweight state management
- 🔄 **React Query** - Server state & caching
- 🎯 **React Router v6** - Client-side routing
- 📝 **React Hook Form** - Form validation
- 🎉 **React Toastify** - Toast notifications
- 🌙 **Dark Mode** - Built-in theme switching
- 🔧 **ESLint + Prettier** - Code quality & formatting
- 🪝 **Husky + lint-staged** - Git hooks
- 📱 **Responsive Design** - Mobile-first approach

---

## 📁 Project Structure

```
src/
├── api/              # API layer (axios, endpoints)
├── components/       # UI components
│   ├── auth/        # Auth-related components
│   ├── layout/      # Layout components
│   └── shared/      # Reusable components
├── config/          # Configuration files
├── constants/       # App constants
├── features/        # Feature modules
│   ├── auth/       # Authentication feature
│   └── users/      # Users feature
├── hooks/           # Custom React hooks
├── pages/           # Page components
├── routes/          # Routing configuration
├── store/           # Zustand store
│   └── slices/     # Store slices
├── styles/          # Global styles
└── utils/           # Utility functions
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm, yarn, or pnpm

### Installation

1. **Clone or download this template**

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure your API endpoint:
   ```env
   VITE_API_BASE_URL=https://api.escuelajs.co/api/v1
   VITE_APP_NAME=React Template
   ```

4. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3000`
   - Default demo credentials:
     - Email: `john@mail.com`
     - Password: `changeme`

---

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors |
| `npm run format` | Check code formatting |
| `npm run format:fix` | Fix code formatting |

---

## 🏗️ Architecture Patterns

### State Management

**Zustand Store Structure:**
```javascript
// Client state (Zustand)
- Authentication state
- Theme mode (dark/light)
- Loading states

// Server state (React Query)
- User data
- API responses
- Caching & synchronization
```

### API Layer

Centralized API configuration with interceptors:
```javascript
// Automatic token injection
// Global error handling
// Response transformation
```

### Feature-Based Organization

Each feature contains:
- `*.api.js` - API functions
- `use*.js` - React Query hooks
- Components in `/components/`

---

## 🎨 Styling Approach

### Hybrid Strategy

1. **Tailwind CSS** - Utility classes for layout
2. **CSS Modules** - Component-specific styles
3. **CSS Variables** - Theme management

### Dark Mode

Toggle between light and dark themes:
```javascript
const { mode, toggleMode } = useStore();
```

CSS variables automatically update based on theme.

---

## 🔐 Authentication Flow

1. User submits login credentials
2. JWT token stored in cookies
3. Zustand store updated with auth state
4. Protected routes check authentication
5. Automatic token injection in API requests
6. Token refresh on page reload

### Protected Routes

```javascript
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

### Guest Routes

```javascript
<GuestRoute>
  <Login />
</GuestRoute>
```

---

## 📦 Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.3.1 | UI library |
| vite | ^5.2.11 | Build tool |
| zustand | ^4.5.2 | State management |
| @tanstack/react-query | ^5.36.0 | Server state |
| react-router-dom | ^6.23.1 | Routing |
| axios | ^1.6.8 | HTTP client |
| react-hook-form | ^7.51.4 | Form handling |
| tailwindcss | ^3.4.3 | CSS framework |

---

## 🛠️ Development Guidelines

### Code Quality

- **ESLint** with Airbnb config
- **Prettier** for consistent formatting
- **Husky** pre-commit hooks
- **lint-staged** for staged files

### Component Guidelines

1. Use functional components with hooks
2. Implement proper prop validation
3. Keep components focused and small
4. Use CSS Modules for component styles
5. Follow naming conventions

### State Management

- Use Zustand for client state
- Use React Query for server state
- Avoid prop drilling with context when needed

---

## 🧪 Creating New Features

### Step 1: Create Feature Module

```bash
src/features/[feature-name]/
├── [feature].api.js
└── use[Feature].js
```

### Step 2: Add API Functions

```javascript
// features/posts/posts.api.js
export const getPostsApi = async () => {
  return api.get(endpoints.posts);
};
```

### Step 3: Create React Query Hook

```javascript
// features/posts/usePosts.js
export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: getPostsApi,
  });
};
```

### Step 4: Build UI Component

```javascript
// pages/Posts.jsx
export const Posts = () => {
  const { data, isLoading } = usePosts();
  // Render component
};
```

### Step 5: Add Route

```javascript
// routes/index.jsx
<Route path="/posts" element={<Posts />} />
```

---

## 🌐 API Integration

### Base Configuration

The template uses a demo API: `https://api.escuelajs.co/api/v1`

### Changing API Endpoint

Update `.env` file:
```env
VITE_API_BASE_URL=https://your-api.com
```

### Adding New Endpoints

Edit `src/api/endpoints.js`:
```javascript
export const endpoints = {
  posts: '/posts',
  post: id => `/posts/${id}`,
};
```

---

## 📱 Responsive Design

The template is mobile-first and fully responsive:
- Flexbox & CSS Grid layouts
- Tailwind responsive utilities
- Mobile navigation
- Adaptive components

---

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

Output will be in `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Deploy Options

- **Vercel** - Zero configuration
- **Netlify** - Automatic deployments
- **GitHub Pages** - Static hosting
- **Docker** - Containerized deployment

### Environment Variables

Set production environment variables in your hosting platform:
```
VITE_API_BASE_URL=https://api.production.com
```

---

## 🔧 Configuration Files

### ESLint (`.eslintrc.cjs`)
- Airbnb configuration
- React hooks rules
- Prettier integration

### Prettier (`.prettierrc.cjs`)
- Single quotes
- 2 space indentation
- Semicolons enabled

### Tailwind (`tailwind.config.js`)
- Custom colors
- Dark mode class strategy
- Extended theme

---

## 📚 Learn More

### Documentation

- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/)

### Code Examples

Check out the example features:
- Authentication (`/src/features/auth/`)
- Users management (`/src/features/users/`)
- Protected routes (`/src/components/auth/`)

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and formatting
5. Submit a pull request

---

## 📝 License

ISC

---

## 👨‍💻 Author

**Nisharg Shah**

---

## 🙏 Acknowledgments

- Demo API: [Fake Store API](https://fakeapi.platzi.com/)
- Icons: Emoji
- Inspiration: Modern React best practices

---

**Last Updated:** 2024
