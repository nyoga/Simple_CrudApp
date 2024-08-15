const express = require("express");
const Product = require('../model/product.model.js');
const router = express.Router();
const {getProducts , getProduct} = require('../controllers/product.contoller.js');

router.get('/', getProducts);

router.get('/:id', getProduct);