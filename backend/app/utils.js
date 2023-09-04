const fs = require('fs');
const path = require('path');
const jsmediatags = require('jsmediatags');
const folderPath = 'C:/Users/Administrator/Desktop/SwiftTalk/frontend/swifttalk/public'; // 文件夹路径
const mysql = require("../config/db"); // 根据您的实际路径修改引入的数据库配置

(async()=>{
    const [result,field]=await mysql.query("select * from shortvideo")
  console.log(result,field);
})()


