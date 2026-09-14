const products = [];

class ProductRepository {
  async findAll() {
    return [...products];
  }

  async findById(id) {
    return products.find(p => p.id === id);
  }

  async create(productData) {
    const newProduct = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    products.push(newProduct);
    return newProduct;
  }

  async update(id, updateData) {
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;

    products[index] = { ...products[index], ...updateData };
    return products[index];
  }

  async delete(id) {
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return false;

    products.splice(index, 1);
    return true;
  }
}

export const productRepository = new ProductRepository();
