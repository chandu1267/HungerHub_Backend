const express = require("express");
const productController = require("../controllers/productController");
const Product = require("../models/Product");

const router = express.Router();
router.post("/add-product/:firmId",productController.addProduct);
router.get("/:firmId/products",productController.getProductByFirm);
router.delete("/:productId",productController.deleteProductId);

router.get("/uploads/:imageName",(req,res)=>{
    const imageName = req.params.imageName;
    res.headersSent('Content-Type','image/jpg');
    res.sendFile(path.join(__dirname,'..','uploads',imageName));
});



module.exports = router;