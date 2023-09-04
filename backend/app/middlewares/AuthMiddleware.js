const config=require("../../config/config")
const jwt=require("jsonwebtoken")
function customAuthMiddleware(req, res, next){
    if(req.path==="/api/user/login"||req.path==="/api/user/logup"||req.path.includes("/api/video")||req.path.includes("/api/image")){
        return next();
    }
    const requestToken = req.headers.token;
    console.log("1",requestToken)
    jwt.verify(requestToken,config.development.privateKey,(err,decoded)=>{
        if(err){
            res.send({
                code:"500",
                msg:"token格式错误"
            })
        }
        else{
            console.log(decoded);
            if(decoded.username&&decoded.username===req.headers.username&&decoded.exp&&decoded.exp<Date.now()){
                console.log("tag");
                next();
            }
            else{
                res.send({
                    code:"500",
                    msg:"token用户名不对或者token超时"
                })
            }
        }
    })
    next();
}

module.exports=customAuthMiddleware;