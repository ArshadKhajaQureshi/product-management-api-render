import { productRepository } from '../repositories/product.repository.js';
import { sendResponse } from '../middleware/responseHandler.js';

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await productRepository.findAll();
    sendResponse(res, 200, products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await productRepository.findById(req.params.id);
    if (!product) {
      return sendResponse(res, 404, null, { message: 'Product not found' });
    }
    sendResponse(res, 200, product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const product = await productRepository.create(req.body);
    sendResponse(res, 201, product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const product = await productRepository.update(req.params.id, req.body);
    if (!product) {
      return sendResponse(res, 404, null, { message: 'Product not found' });
    }
    sendResponse(res, 200, product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const deleted = await productRepository.delete(req.params.id);
    if (!deleted) {
      return sendResponse(res, 404, null, { message: 'Product not found' });
    }
    sendResponse(res, 200, { message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};
