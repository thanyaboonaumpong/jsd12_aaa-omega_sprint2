// --- URL สำหรับระบบเก่า (Admin จัดการสินค้า) ---
const BASE_URL = 'http://localhost:5000/api';

// --- URL สำหรับระบบใหม่ (ตะกร้าสินค้า) ---
const API_CART_URL = "http://localhost:5000/v1/carts";


// ==========================================
// --- Admin Products API (ของเดิมที่ต้องเก็บไว้) ---
// ==========================================

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


// ==========================================
// --- Cart API (เวอร์ชันใหม่ล่าสุด) ---
// ==========================================

export const getCart = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");
  
  const response = await fetch(API_CART_URL, {
    method: "GET",
    headers: { 
      "Content-Type": "application/json", 
      "Authorization": `Bearer ${token}` 
    }
  });
  if (!response.ok) throw new Error("Failed to fetch cart");
  return response.json();
};

export const addToCartAPI = async (productNumber, quantity) => {
  const token = localStorage.getItem("token");
  
  const response = await fetch(`${API_CART_URL}/add`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json", 
      "Authorization": `Bearer ${token}` 
    },
    body: JSON.stringify({ productNumber, quantity })
  });
  if (!response.ok) throw new Error("Failed to add item to cart");
  return response.json();
};

export const updateCartItem = async (productNumber, quantity) => {
  const token = localStorage.getItem("token");
  
  const response = await fetch(`${API_CART_URL}/update`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json", 
      "Authorization": `Bearer ${token}` 
    },
    body: JSON.stringify({ productNumber, quantity })
  });
  if (!response.ok) throw new Error("Failed to update quantity");
  return response.json();
};

export const removeFromCart = async (productNumber) => {
  const token = localStorage.getItem("token");
  
  const response = await fetch(`${API_CART_URL}/remove/${productNumber}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` }
  });
  if (!response.ok) throw new Error("Failed to remove item");
  return response.json();
};