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

router.post("/search", async(req, res) => {
    console.log(req.body);
    let params=[];
    let query="";
    if(req.body.video_id){
        params.push(req.body.video_id);
        query="select * from videocomment where video_id = ?";
    }
    else if(req.body.comment_id){
        params.push(req.body.comment_id);
        query="select * from videocomment where parent_comment_id = ?";
    }else{
        res.send([]);
    }
    if(!query||!params) return
    let [row]=await mysql.query(query,params);
    row=camelCase.convertToCamelCase(row);
    console.log(row);
    res.send({
        code:200,
        row,
    })
});

module.exports = router;