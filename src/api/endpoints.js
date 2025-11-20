export const endpoints = {
  // Auth endpoints
  login: '/auth/login',
  register: '/auth/register',
  profile: '/auth/profile',
  
  // User endpoints
  users: '/users',
  user: id => `/users/${id}`,
  
  // Product endpoints (example)
  products: '/products',
  product: id => `/products/${id}`,
};
