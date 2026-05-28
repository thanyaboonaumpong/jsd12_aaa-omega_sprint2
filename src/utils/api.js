const BASE_URL = 'http://localhost:5000/api';

// --- Cart API ---

// GET selected products in cart for a given user (products/<user_id>)
export const getCart = async (userId) => {
  const response = await fetch(`${BASE_URL}/cart/${userId}`);
  if (!response.ok) throw new Error('Failed to fetch cart');
  return response.json();
};

// POST save selected product to cart
export const addToCart = async ({ userId, productId, name, price, image, quantity = 1 }) => {
  const response = await fetch(`${BASE_URL}/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, productId, name, price, image, quantity }),
  });
  if (!response.ok) throw new Error('Failed to add to cart');
  return response.json();
};

// PUT update item quantity in cart
export const updateCartItem = async (userId, productId, quantity) => {
  const response = await fetch(`${BASE_URL}/cart/${userId}/${productId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity }),
  });
  if (!response.ok) throw new Error('Failed to update cart item');
  return response.json();
};

// DELETE item from cart
export const removeFromCart = async (userId, productId) => {
  const response = await fetch(`${BASE_URL}/cart/${userId}/${productId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to remove from cart');
  return response.json();
};

// --- Admin Products API ---

// GET all products in store
export const fetchAllProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};

// POST create new product to store
export const createProduct = async (productData) => {
  const response = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  if (!response.ok) throw new Error('Failed to create product');
  return response.json();
};

// PUT update existing product
export const updateProduct = async (productId, productData) => {
  const response = await fetch(`${BASE_URL}/products/${productId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  if (!response.ok) throw new Error('Failed to update product');
  return response.json();
};

// DELETE product from store
export const deleteProduct = async (productId) => {
  const response = await fetch(`${BASE_URL}/products/${productId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete product');
  return response.json();
};
