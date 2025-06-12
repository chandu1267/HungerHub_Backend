const Vendor = require("../models/Vendor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

const secretKey = process.env.whatisyourName;

const vendorRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const vendorEmail = await Vendor.findOne({ email });
    if (vendorEmail) {
      return res.status(400).json({ message: "Email already exists..." });
    }
    const hasedpassword = await bcrypt.hash(password, 10);

    const newVendor = new Vendor({
      username,
      email,
      password: hasedpassword,
    });

    await newVendor.save();

    res.status(201).json({ message: "Register Success..." });
    console.log("registed");
  } catch (err) {
    console.log(err);
    res.status(500).json("Athentication failed...");
  }
};

const vendorLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const vendor = await Vendor.findOne({ email });
    if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const token = jwt.sign({ vendorId: vendor._id }, secretKey, {
      expiresIn: "1h",
    });

    const vendorId = vendor._id;

    res.status(200).json({ success: "Login successful", token, vendorId });
    console.log(email, "this is token", token);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate("firm");
    res.json({ vendors });
  } catch (err) {
    console.log(err);
    res.status(500).json({message:"Internal Server issue..."});
  }
};


const getVendorId = async(req,res)=>{
  const vendorId = req.params.id;
  try{
    const vendor = await Vendor.findById(vendorId).populate('firm');
    if(!vendor){
      res.status(500).json({error:"Id not found..."})
    }
    res.status(200).json({vendor});
  }catch(err){
    console.log(err)
    res.status(500).json("Something went wrong to find id");
  }
}

module.exports = { vendorRegister, vendorLogin ,getAllVendors,getVendorId};
