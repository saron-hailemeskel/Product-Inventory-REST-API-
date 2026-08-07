const products = require("../data/products");


//validation

function validateProduct(body) {
    if (!body || Object.keys(body).length === 0) {
        return "Request body cannot be empty";
    }

    //destructing object 
    const { name, price, quantity, category } = body;

    if (!name) return "Name is required";
    if (price === undefined || price <= 0) return "Price must be a positive number";
    if (quantity === undefined || quantity < 0)
        return "Quantity must be zero or greater";
    if (!category) return "Category is required";

    return null;
}
// get all the products

const getAllProducts = (req, res) => {

    res.status(200).json(products)

}

//get product by id

const getProductById = (req, res) => {
    const id = Number(req.params.id);
    const product = products.find(product => product.id === id);
    if (!product) {
        return res.status(404).json({
            message: "Product not found",
        });
    }
    res.status(200).json(product);
}

//creating

const createProduct = (req, res) => {
    const error = validateProduct(req.body);

    if (error) {
        return res.status(400).json({
            message: "Validation failed",
            error,
        });
    }

    const { name, price, quantity, category } = req.body;

    const newProduct = {
        id: products.length ? products[products.length - 1].id + 1 : 1,
        name,
        price,
        quantity,
        category,
    };

    products.push(newProduct);

    res.status(201).json(newProduct);
}

// updating

const updateProduct = (req, res) => {
    const id = Number(req.params.id);
    const index = products.findIndex(product => product.id === id);
    if (index === -1) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const error = validateProduct(req.body);
    if (error) {
        return res.status(400).json({
            message: "Validation failed",
            error
        });
    }
    products[index] = {
        id,
        ...req.body
    }

    res.status(200).json(products[index]);
}
//============== using find method ============
// const updateProduct = (req, res) => {
//     const id = Number(req.params.id);
//     let product = products.find(product => product.id === id);
//     if (!product) {
//         return res.status(404).json({
//             message: "Product not found"
//         });
//     }

//     const error = validateProduct(req.body);
//     if (error) {
//         return res.status(400).json({
//             message: "Validation failed",
//             error
//         });
//     }
//     Object.assign(product, {
//     id,
//     ...req.body
//    });

//     res.status(200).json(product);
// }

//===========================================

//deletion

const deleteProduct = (req, res) => {

    const id = Number(req.params.id);
    const index = products.findIndex(product => product.id === id);
    if (index === -1) {
        return res.status(404).json({
            message: "Product not found"
        });
    }
    //array.splice(startIndex, numberToDelete)
    products.splice(index, 1);
    res.status(200).json({
        message: "product deleted sucessfully"
    });
}

//searching using filter

const searchProducts = (req, res) => {
    const name = req.query.name;
    const result = products.filter(product =>
        product.name.toLowerCase().includes(name.toLowerCase())
    );
    res.status(200).json(result);
};

//filter by category  using filter


const filterByCategoryQuery = (req, res) => {
    const category = req.query.category;
    const result = products.filter(product =>
        product.category.toLowerCase() === category.toLowerCase()
    );
    res.status(200).json(result);

};

//======= using params===
const filterByCategoryParams = (req, res) => {
    const category = req.params.category;
    const result = products.filter(product =>
        product.category.toLowerCase() === category.toLowerCase()
    );
    res.status(200).json(result);

};
//==================

//Find products below a certain price 

const getProductsUnderPrice = (req, res) => {

    const price = Number(req.params.price);
    const result = products.filter(product =>
        product.price < price
    );
    res.status(200).json(result);

};

//getting low stock products

const getLowStockProducts = (req, res) => {
    const lowStockProducts = products.filter(product =>
        product.quantity < 5
    );
    res.status(200).json(lowStockProducts);
};

//calculate total value

const getInventoryValue = (req, res) => {
    const totalInventoryValue = products.reduce((total, product) => {

        return total + (product.price * product.quantity);

    }, 0);


    res.status(200).json({
        totalInventoryValue
    });

};




module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    filterByCategoryQuery,
    filterByCategoryParams,
    getProductsUnderPrice,
    getLowStockProducts,
    getInventoryValue
};