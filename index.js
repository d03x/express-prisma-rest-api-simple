const express = require('express');
const db = require('./src/db');
const cj = require('circular-json');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.get('/products', async function (req, res) {
    const products = await db.product.findMany({
        // include: {
        //     category: true
        // },
        select: {
            name: true,
            price: true,
            id: true,
            image: true,
            stok: true,
            category: {
                select: {
                    name: true,
                }
            }
        }
    });
    res.json(products);
});


app.post('/products', async function (req, res) {
    const data = {
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        categoryId: req.body.categoryId,
        stok: req.body.stok
    };
    const dataInsert = await db.product.create({
        data: data,
    });
    return res.json(dataInsert);
});


app.delete('/products/:id', async function (req, res) {
    const productId = req.params.id;
    //logikanya
    try {
        //kita akan cek dulu apakah id nya ada?
        await db.product.findFirstOrThrow({ where: { id: parseInt(productId) } })
        const product = await db.product.delete({
            where: {
                id: parseInt(productId),
            }
        });
        res.json(product)
    } catch (error) {
        res.json(error)

    }
});

app.get('/products/:id', async function (req, res) {
    try {
        const data = await db.product.findFirstOrThrow({ where: { id: parseInt(req.params.id) } });
        res.json(data);
    } catch (error) {
        res.json(error)
    }
});

app.listen(8000, function () {
    console.log("Run On port 8000");
});
