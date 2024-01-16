const db = require("../../src/db");
const { getProductsRepository, createProductRepository, deleteProductRepository } = require("./repository");

const getProductsService = async () => {
    try {
        return await getProductsRepository();
    } catch (error) {
        throw error;
    }
}

const createProductService = async (data) => {
    return await createProductRepository(data)
}

const deleteProductService = async (productId) => {
    try {
        //kita akan cek dulu apakah id nya ada?
        await db.product.findFirstOrThrow({ where: { id: parseInt(productId) } })
        return await deleteProductRepository(parseFloat(productId));
    } catch (error) {
        return error;
    }
}

module.exports = {
    getProductsService,
    createProductService,
    deleteProductService
}
