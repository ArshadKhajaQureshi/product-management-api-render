// src/models/product.js

const products = [];

/**
 * Return all products with optional filters.
 */
export function findAll(filters = {}) {
  let result = [...products];

  if (filters.category) {
    result = result.filter(
      p => p.category === filters.category
    );
  }

  if (filters.status) {
    result = result.filter(
      p => p.status === filters.status
    );
  }

  if (filters.inStock === true) {
    result = result.filter(
      p => p.stock > 0
    );
  }

  if (filters.inStock === false) {
    result = result.filter(
      p => p.stock === 0
    );
  }

  if (filters.minPrice) {
    result = result.filter(
      p => p.price >= filters.minPrice
    );
  }

  if (filters.maxPrice) {
    result = result.filter(
      p => p.price <= filters.maxPrice
    );
  }

  if (filters.search) {
    const search = filters.search.toLowerCase();

    result = result.filter(
      p =>
        p.name?.toLowerCase().includes(search) ||
        p.description?.toLowerCase().includes(search) ||
        p.sku?.toLowerCase().includes(search)
    );
  }

  return result;
}

/**
 * Find product by id
 */
export function findById(id) {
  return products.find(
    p => p.id === id
  );
}

/**
 * Create product
 */
export function create(productData) {
  const product = {
    id: crypto.randomUUID(),
    name: productData.name,
    sku: productData.sku,
    description: productData.description ?? '',
    category: productData.category,
    price: productData.price,
    stock: productData.stock,
    status: productData.status ?? 'active',
    createdAt: new Date().toISOString(),
    archivedAt: null
  };

  products.push(product);

  return product;
}

/**
 * Update product
 */
export function update(id, updateData) {
  const index = products.findIndex(
    p => p.id === id
  );

  if (index === -1) {
    return null;
  }

  products[index] = {
    ...products[index],
    ...updateData
  };

  return products[index];
}

/**
 * Delete product
 */
export function remove(id) {
  const index = products.findIndex(
    p => p.id === id
  );

  if (index === -1) {
    return false;
  }

  products.splice(index, 1);

  return true;
}