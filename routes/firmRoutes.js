const express = require("express");
const firmController = require("../controllers/firmController");
const verifyToken = require("../middlewares/verifyToken");



const router = express.Router();
router.post("/add-firm",verifyToken,firmController.addFirm);
router.delete("/:firmId",firmController.firmdelete);

router.get("/uploads/:imageName",(req,res)=>{
    const imageName = req.params.imageName;
    res.headersSent('Content-Type','image/jpg');
    res.sendFile(path.join(__dirname,"..",'uploads',imageName));
})

module.exports = router;