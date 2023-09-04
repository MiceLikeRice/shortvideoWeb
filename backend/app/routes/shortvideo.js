const console = require("console");
const express = require("express");
const mysql=require("../../config/db")
const camelCase = require("../utils/camelcase");

const router = express.Router();

router.post("/insertshortvideo",  async(req, res) => {
    console.log(req.body);
    let query="insert into shortvideo set ?"
    mysql.query(query,req.body);
    res.send({
        code:200,
        msg:"视频成功发布"
    })
});

router.post("/searchshortvideo",  async(req, res) => {
    console.log(req.body);
    let query="select * from shortvideo"
    let [row]=await mysql.query(query);
    row=camelCase.convertToCamelCase(row);
    console.log(row);
    res.send({
        code:200,
        row,
    })
});

module.exports = router;
