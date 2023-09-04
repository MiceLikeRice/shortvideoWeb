const MusicModel = require("../models/MusicModels");

class MusicController {
  constructor() {
    this.musicModel = new MusicModel();
  }

  async getFilteredMusic(req, res) {
    try {
      const musics = await this.musicModel.getFilteredMusic(req.body);
      if (!musics) {
        return res.status(404).json({ error: "Music not found" });
      }
      res.json(musics);
    } catch (error) {
      console.error("Error in music controller:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  }

  async addMusicPlayCount(req, res) {
    const musicId = req.params.id;
    console.log(musicId);
    try {
      await this.musicModel.addMusicPlayCount(musicId); // 调用音乐控制器中的方法来增加播放量
      res.json({ success: true, message: "Play count increased successfully" });
    } catch (error) {
      console.error("Error increasing play count:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to increase play count" });
    }
  }

  async addMusicLikeCount(req, res) {
    const musicId = req.params.id;
    console.log(musicId);
    try {
      await this.musicModel.addMusicLikeCount(musicId); 
      res.json({ success: true, message: "Like count increased successfully" });
    } catch (error) {
      console.error("Error increasing play count:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to increase play count" });
    }
  }
}

module.exports = MusicController;
