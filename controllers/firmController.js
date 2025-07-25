const Firm = require("../models/Firm.js");
const Vendor = require("../models/Vendor");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // save files in uploads/ folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname( file.originalname)); // unique filename
  },
});
const upload = multer({ storage: storage });

const addFirm = async (req, res) => {
  try {
    const { firmName, area, category, region, offer } = req.body;
    const image = req.file ? req.file.filename : undefined;


    const vendor = await Vendor.findById(req.vendorId);
    if (!vendor) {
      return res.status(404).json({ message: "vendor not found" });
    }

    const firm = new Firm({
      firmName,
      area,
      category,
      region,
      offer,
      image,
      vendor: vendor._id,
    });
    const savedFirm =  await firm.save();
    vendor.firm.push(savedFirm);
    await vendor.save()


    return res.status(200).json({ message: "Firm is success..." });
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error",err);
  }
};

const firmdelete = async(req,res)=>{
  try{
    const firmId = req.params.firmId
    const deletefirm = await Firm.findByIdAndDelete(firmId);

    if(!deletefirm){
      return res.status(404).json("Firm product not found...")
    }
  }catch(err){
    console.log(err)
    res.status(500).json("Internal Server...")
  }
}

module.exports = { addFirm: [upload.single("image"), addFirm],firmdelete };
