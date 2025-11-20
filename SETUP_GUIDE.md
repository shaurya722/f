# Setup Guide

## Quick Setup (5 minutes)

### 1. Install Dependencies

Choose your preferred package manager:

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm (recommended)
pnpm install
```

### 2. Configure Environment

Copy the example environment file:

```bash
cp .env.example .env
```

The `.env` file should contain:

```env
VITE_API_BASE_URL=https://api.escuelajs.co/api/v1
VITE_APP_NAME=React Template
```

### 3. Initialize Git Hooks (Optional)

```bash
npm run prepare
```

This sets up Husky for pre-commit hooks.

### 4. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## First Login

Use these demo credentials to test the application:

- **Email:** `john@mail.com`
- **Password:** `changeme`

---

## Folder Structure Overview

```
├── src/
│   ├── api/              # Axios instance, API class, endpoints
│   ├── components/       # React components
│   │   ├── auth/        # ProtectedRoute, GuestRoute
│   │   ├── layout/      # Header, Layout
│   │   └── shared/      # Card, Loading
│   ├── config/          # React Query client config
│   ├── constants/       # App constants (routes, cookies)
│   ├── features/        # Feature modules
│   │   ├── auth/       # Login API, hooks
│   │   └── users/      # Users API, hooks
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── routes/          # Routing configuration
│   ├── store/           # Zustand store
│   │   └── slices/     # Auth, theme, loading slices
│   ├── styles/          # Global CSS
│   └── utils/           # Helper functions, token storage
├── .eslintrc.cjs        # ESLint configuration
├── .prettierrc.cjs      # Prettier configuration
├── tailwind.config.js   # Tailwind CSS config
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies and scripts
```

---

## Key Concepts

### 1. State Management

**Zustand (Client State):**
- Authentication status
- User data
- Theme mode (light/dark)
- Loading states

**React Query (Server State):**
- API data fetching
- Caching and synchronization
- Mutations with optimistic updates

### 2. Routing

- **Public Routes:** Home, Login
- **Protected Routes:** Dashboard, Users, Profile
- **Auto Redirect:** Authenticated users redirected from login

### 3. Styling

Three-layer approach:
1. **Tailwind CSS** - Utility classes for rapid development
2. **CSS Modules** - Scoped component styles
3. **CSS Variables** - Theme management (dark/light mode)

### 4. API Integration

All API calls go through:
1. **Axios instance** with interceptors
2. **API class** with CRUD methods
3. **Feature API functions** for specific endpoints
4. **React Query hooks** for component usage

---

## Common Tasks

### Adding a New Page

1. Create page component in `/src/pages/`
2. Add route in `/src/routes/index.jsx`
3. Update constants if needed in `/src/constants/`

Example:
```jsx
// src/pages/NewPage.jsx
export const NewPage = () => {
  return <div>New Page</div>;
};

// src/routes/index.jsx
<Route path="/new-page" element={<NewPage />} />
```

### Adding a New API Endpoint

1. Add endpoint to `/src/api/endpoints.js`
2. Create API function in feature folder
3. Create React Query hook
4. Use in component

Example:
```javascript
// src/api/endpoints.js
export const endpoints = {
  posts: '/posts',
};

// src/features/posts/posts.api.js
export const getPostsApi = async () => {
  return api.get(endpoints.posts);
};

// src/features/posts/usePosts.js
export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: getPostsApi,
  });
};
```

### Creating a Store Slice

1. Create slice file in `/src/store/slices/`
2. Import and add to store in `/src/store/store.js`

Example:
```javascript
// src/store/slices/modalSlice.js
export const createModalSlice = (set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
});

// src/store/store.js
import { createModalSlice } from './slices/modalSlice';

export const useStore = create(
  devtools((...args) => ({
    ...createAuthSlice(...args),
    ...createThemeSlice(...args),
    ...createLoadingSlice(...args),
    ...createModalSlice(...args), // Add here
  }))
);
```

### Styling a Component

Combine Tailwind and CSS Modules:

```jsx
import styles from './Component.module.css';

export const Component = () => {
  return (
    <div className="flex items-center"> {/* Tailwind */}
      <div className={styles.custom}> {/* CSS Module */}
        Content
      </div>
    </div>
  );
};
```

---

## Environment Variables

### Development

Create `.env` file (already exists from setup):
```env
VITE_API_BASE_URL=https://api.escuelajs.co/api/v1
VITE_APP_NAME=React Template
```

### Production

Set environment variables in your hosting platform:
- Vercel: Project Settings > Environment Variables
- Netlify: Site Settings > Build & Deploy > Environment
- Docker: Pass via docker-compose or Dockerfile

---

## Troubleshooting

### Port 3000 Already in Use

Change port in `vite.config.js`:
```javascript
server: {
  port: 3001,
}
```

### ESLint Errors

Run auto-fix:
```bash
npm run lint:fix
```

### Module Not Found

Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Tailwind Styles Not Working

1. Check if Tailwind directives are in `globals.css`
2. Verify `tailwind.config.js` content paths
3. Restart dev server

### API Errors

1. Check `.env` file exists with correct API URL
2. Verify API is accessible
3. Check browser console for CORS errors
4. Inspect Network tab in DevTools

---

## Development Workflow

### Daily Development

```bash
# Start dev server
npm run dev

# In another terminal, run linting
npm run lint

# Before committing
npm run format:fix
npm run lint:fix
```

### Pre-Commit Checklist

- [ ] Code is formatted (Prettier)
- [ ] No linting errors (ESLint)
- [ ] All components render correctly
- [ ] No console errors
- [ ] Tested in both light and dark mode

### Git Workflow

```bash
git add .
# Husky will run lint-staged automatically
git commit -m "feat: add new feature"
git push
```

---

## Building for Production

### Create Production Build

```bash
npm run build
```

### Preview Production Build Locally

```bash
npm run preview
```

### Analyze Bundle Size

The build output will show:
- Chunk sizes
- Total bundle size
- Gzipped sizes

---

## Deployment Platforms

### Vercel (Recommended)

1. Push code to GitHub
2. Import project on Vercel
3. Set environment variables
4. Deploy automatically

### Netlify

1. Connect Git repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

---

## Performance Tips

1. **Code Splitting:** Routes are already code-split
2. **Image Optimization:** Use WebP format
3. **Lazy Loading:** Implement for heavy components
4. **React Query:** Leverage caching strategies
5. **Bundle Analysis:** Use `vite-plugin-bundle-analyzer`

---

## Security Checklist

- [x] JWT tokens stored in httpOnly cookies (js-cookie)
- [x] Protected routes implemented
- [x] API interceptors for token injection
- [x] Environment variables for sensitive data
- [ ] Add CSRF protection (if needed)
- [ ] Implement rate limiting (backend)
- [ ] Add input sanitization

---

## Next Steps

1. **Customize branding** - Update colors, logo, app name
2. **Add features** - Build your application logic
3. **Configure API** - Connect to your backend
4. **Add tests** - Implement unit and integration tests
5. **Deploy** - Choose hosting platform and deploy

---

## Getting Help

- Check the main `README.md` for architecture details
- Review example code in `/src/features/`
- Consult official documentation for each library
- Inspect browser DevTools for debugging

---

**Happy Coding! 🚀**
