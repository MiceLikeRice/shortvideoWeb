const console = require("console");
const express = require("express");
const multer = require("multer");
const path = require("path");
const mysql=require("../../config/db")
const fs=require("fs")
const router = express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./video/");
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

router.post("/uploadvideo", upload.single("file"), async(req, res) => {
  if (req.file) {
    console.log("文件保存成功:", req.file.filename);
    let query="insert into video set ?";
    const currentDatetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let video={
        video_name:req.file.filename,
        video_path:req.file.filename,
        video_uploader:req.headers.username,
        video_upload_time:currentDatetime
    };
    await mysql.query(query,video)
    res.status(200).send({
        msg:"success",
        filename:req.file.filename,
        video_upload_time:currentDatetime
    });
  } else {
    console.log("文件保存失败");
    res.status(500).send({msg:"文件保存失败"});
  }
});


router.get("/download/:filename", (req, res) => {
    const filename = req.params.filename;
    const videoFilePath = path.join(__dirname, "..", "..", "video", filename);
  
    if (!fs.existsSync(videoFilePath)) {
      return res.status(404).send("文件不存在");
    }
  
    const stat = fs.statSync(videoFilePath);
    const fileSize = stat.size;
  
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
  
      const chunkSize = (end - start) + 1;
  
      res.status(206)
        .set({
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunkSize,
          "Content-Type": "video/mp4",
          "Content-Disposition": `attachment; filename="${encodeURIComponent(filename)}"`
        });
  
      const fileStream = fs.createReadStream(videoFilePath, { start, end });
      fileStream.pipe(res);
    } else {
      res.status(200)
        .set({
          "Content-Length": fileSize,
          "Content-Type": "video/mp4",
          "Content-Disposition": `attachment; filename="${encodeURIComponent(filename)}"`
        });
  
      const fileStream = fs.createReadStream(videoFilePath);
      fileStream.pipe(res);
    }
  });
  

module.exports = router;
