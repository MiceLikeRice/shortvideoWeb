const express=require("express");
const MusicController=require("../controllers/MusicController")

const router=express.Router();
const musicController=new MusicController();
router.post("/getFilteredMusic",(req,res)=>{
    console.log(req.body);
    musicController.getFilteredMusic(req,res)
});
router.post("/addMusicPlayCount/:id",(req,res)=>{
    musicController.addMusicPlayCount(req,res)
});
router.post("/addMusicLikeCount/:id",(req,res)=>{
    musicController.addMusicLikeCount(req,res)
});

module.exports=router;