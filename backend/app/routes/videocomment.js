const console = require("console");
const express = require("express");
const mysql=require("../../config/db")
const camelCase = require("../utils/camelcase");

const router = express.Router();

router.post("/insert",  async(req, res) => {
    console.log(req.body);
    let query="insert into videocomment set ?"
    mysql.query(query,req.body);
    res.send({
        code:200,
        msg:"评论上传成功"
    })
});

router.post("/searchvideocomment",  async(req, res) => {
    console.log(req.body);
    let query="select * from videocomment"
    let [row]=await mysql.query(query);
    row=camelCase.convertToCamelCase(row);
    console.log(row);
    res.send({
        code:200,
        row,
    })
});

module.exports = router;