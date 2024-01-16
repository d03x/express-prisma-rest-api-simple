const express = require('express');
const db = require('../../src/db');
const { getProductsService, createProductService, deleteProductService } = require('./service');

const router = express.Router();


router.get('/', async function (req, res) {
    const products = await getProductsService();
    res.json(products);
});

router.post('/', async function (req, res) {
    const data = {
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        categoryId: req.body.categoryId,
        stok: req.body.stok
    };
    const dataInsert = await createProductService(data);
    return res.json(dataInsert);
});


router.delete('/:id', async function (req, res) {
    const productId = req.params.id;
    const product = await deleteProductService(productId)
    try {

        res.json(product)
    } catch (error) {
        res.json(error)

    }
});

router.get('/:id', async function (req, res) {
    try {
        const data = await db.product.findFirstOrThrow({ where: { id: parseInt(req.params.id) } });
        res.json(data);
    } catch (error) {
        res.json(error)
    }
});


module.exports = router;
