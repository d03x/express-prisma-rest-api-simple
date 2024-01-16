const db = require("../../src/db")

const getProductsRepository = async () => {
    try {
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
        return products;
    } catch (error) {
        throw error;
    }
}
const createProductRepository = async (data) => {
    return await db.product.create({
        data: data,
    });
}
const deleteProductRepository = async (productId) => {
    return await db.product.delete({
        where: {
            id: productId,
        }
    });
}
module.exports = {
    getProductsRepository,
    createProductRepository,
    deleteProductRepository,
}
