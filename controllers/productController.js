const Firm = require("../models/Firm");
const Product = require("../models/Product");
const Vendor = require("../models/Vendor");
const multer = require("multer");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // save files in uploads/ folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + Path.extname( file.originalname)); // unique filename
  },
});
const upload = multer({ storage: storage });


const addProduct = async(req,res)=>{
    try{
        const {productName,price,category,bestseller,description} = req.body;
        const image = req.file ? req.file.filename:undefined;

        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);

        if(!firm){
            return res.status(400).json({error:"No firm found..."})
        }
        const product = new Product({
            productName,price,category,bestseller,description,image,firm:firm._id
        })
        const savedProduct = await product.save();
        firm.product.push(savedProduct);

        await firm.save();

        res.status(200).json(savedProduct);
    }catch(err){
        console.log(err);
        res.status(500).json("Data not pushed...")
    }
}


const getProductByFirm = async (req,res)=>{
  try{
    const firmId = req.params.firmId;
    const firm = await Firm.findById(firmId);
    const restarentName = firm.firmName;

    if(!firm){
      res.status(404).json({error:"Product details not Found"})
    }
    const products = await Product.find({firm:firmId});
    res.status(200).json({restarentName,products});

  }catch(err){
    console.log(err);
    res.status(500).json("Internal Server Issue..")
  }
}

const deleteProductId = async(req,res)=>{
    try{
        const productId = req.params.productId;
        const deleteproduct = await Product.findByIdAndDelete(productId);

        if(!deleteProductId){
            return res.status(404).json({Err:"Product not Found"})
        }
    }catch(err){
        console.log(err)
        res.status(500).json("Internal server issue...");
    }
}

module.exports = {addProduct:[upload.single('image'),addProduct],getProductByFirm,deleteProductId};