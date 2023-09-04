const console = require("console");
const express = require("express");
const multer = require("multer");
const path = require("path");
const mysql=require("../../config/db")

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./image/");
  },
  filename: function (req, file, cb) {
    const originalName = file.originalname;
    const ext = path.extname(originalName);
    const timestamp = Date.now();
    const filename = timestamp + ext;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

router.post("/uploadimage", upload.single("file"), async(req, res) => {
  if (req.file) {
    console.log("图片保存成功:", req.file.filename);
    let query="insert into image set ?";
    const currentDatetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let image={
        image_name:req.file.filename,
        image_path:req.file.filename,
        image_uploader:req.headers.username,
        image_upload_time:currentDatetime
    };
    await mysql.query(query,image)
    res.status(200).send({
        msg:"success",
        filename:req.file.filename
    });
  } else {
    console.log("图片保存失败");
    res.status(500).send({msg:"图片保存失败"});
  }
});


router.get("/download/:filename", (req, res) =>{
    const filename = req.params.filename;
    const imageFilePath = path.join(__dirname,"..","..","image", filename);
    console.log(imageFilePath);
    res.download(imageFilePath, (err) => {
      if (err) {
        console.error("图片下载失败:", err);
        res.status(500).send("图片下载失败");
      } else {
        console.log("图片下载成功:", filename);
      }
    });
});

module.exports = router;
