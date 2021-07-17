const express = require('express');
const Product = require('../models/product');

var router = express.Router();

router.get('/', (req, res, next) => {
  Product.find()
    .then(products => {
      res.status(200).json(products);
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});

router.post('/', (req, res, next) => {
  Product.findOne()
    .sort('-id')
    .then(previousProduct => {
      let nextId = 1;
      if (previousProduct) nextId = previousProduct.id + 1;

      const product = new Product({
        id: nextId,
        name: req.body.name,
        category: req.body.category,
        included: req.body.included
      });

      product.save()
        .then(createdProduct => {
          res.status(201).json({
            message: 'Product added successfully.',
            product: createdProduct
          });
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({
            message: 'An error occurred.',
            error: error
          });
        });

    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error finding previous product ID.',
        error: { product: 'Error finding previous product ID.'}
      });
    });

});

router.put('/:id', (req, res, next) => {
  Product.findOne({ id: req.params.id })
    .then(product => {
      product.name = req.body.name;
      product.category = req.body.category;
      product.included = req.body.included;

      Product.updateOne({ id: req.params.id }, product)
        .then(result => {
          res.status(204).json({
            message: 'Product updated successfully.'
          })
        })
        .catch(error => {
          res.status(500).json({
          message: 'An error occurred.',
          error: error
        });
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Product not found.',
        error: { product: 'Product not found.'}
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Product.findOne({ id: req.params.id })
    .then(product => {
      Product.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Product deleted successfully."
          });
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({
          message: 'An error occurred.',
          error: error
        });
      })
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Product not found.',
        error: { product: 'Product not found.'}
      });
    });
});

module.exports = router;
