import express from 'express';
import { body } from 'express-validator';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller.js';
import { validate } from '../middleware/validator.js';

const router = express.Router();

const productValidationSchema = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 150 }).withMessage('Name must not exceed 150 characters'),
  body('sku').trim().notEmpty().withMessage('SKU is required').matches(/^[A-Z0-9-]{3,20}$/).withMessage('SKU must be 3-20 characters and contain only uppercase letters, numbers, and hyphens'),
  body('category').trim().notEmpty().withMessage('Category is required').isIn(['electronics', 'clothing', 'food', 'books', 'other']).withMessage('Category must be one of: electronics, clothing, food, books, other'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number')
    .custom(value => {
      if (!/^\d+(\.\d{1,2})?$/.test(value.toString())) {
        throw new Error('Price can have at most 2 decimal places');
      }
      return true;
    }),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
  body('status').isIn(['active', 'inactive', 'out_of_stock']).withMessage('Invalid status'),
];

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', productValidationSchema, validate, createProduct);
router.put('/:id', productValidationSchema, validate, updateProduct);
router.delete('/:id', deleteProduct);

export default router;
