const express=require("express");
const router=express.Router();
router.use("/user",require("./user"));
router.use("/video",require("./video"));
router.use("/music",require("./music"));
router.use("/image",require("./image"));
router.use("/shortvideo",require("./shortvideo"));
router.use("/videocomment",require("./videocomment"));

module.exports=router;
