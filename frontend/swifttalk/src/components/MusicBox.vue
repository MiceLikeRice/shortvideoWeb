<template>
    <div class="music-box">
        <img class="music-img" :src=avatarPath />
        <div class="music-info">
            <div class="song-title">
                <div @click="play()" class="play-button" style="cursor: pointer;">
                    <img v-if="pause" src="../assets/icon/play.svg">
                    <img v-if="!pause" src="../assets/icon/pause.svg">
                </div>
                <div class="msc-info">
                    <div style="display: flex;">
                        <div
                            style="overflow: hidden;width:60%;font-size:13px; display:inline-block;white-space:nowrap;text-overflow:ellipsis;color: #7c7c7c;">
                            {{ uploader }}</div>
                        <span style="margin-left:auto;margin-right:10px;color: #7c7c7c;font-size:13px;">
                            {{ timeAgo }}
                        </span>
                    </div>
                    <div style="display: flex;">
                        <div
                            style="overflow: hidden;width:60%;font-size:15px;display:inline-block;white-space:nowrap;text-overflow:ellipsis">
                            {{ musicName }}</div>
                        <span
                            style="font-size:15px;margin-left:auto;margin-right:10px;border:1px solid #8e8e8e;border-radius:5px;padding: 0 5px; background-color: #333; color: #fff;">
                            {{ tags }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="music-progress">
                <div class="progress-bar" @click="seek($event)">
                    <div class="progress" :style="{ width: progress + '%' }">
                        <div class="progress-ball"></div>
                    </div>
                    
                </div>
                <div v-if="!pause" class="music-time">
                    <div class="current-time">{{ formatTime(musicProgress) }}</div>
                    <div class="duration">{{ formatTime(musicLength) }}</div>
                </div>
            </div>
            <div class="others-buttons">
                <div @click="addlike">
                    <img src="../assets/icon/heart.svg">
                </div>
                <div>
                    <img src="../assets/icon/plus.svg" alt="">
                </div>
                <div @click="download">
                    <img src="../assets/icon/download.svg" alt="">
                </div>
                <div style="float: right;  display: flex; align-items: center; ">
                    <img src="../assets/icon/listening.svg" alt="">
                    <span style="line-height: 22px;margin:0 3px;"> {{ listenCount }} </span>
                </div>
                <div style="float: right;  display: flex;align-items: center;">
                    <img src="../assets/icon/heart.svg" alt="">
                    <span style="line-height: 22px;margin:0 3px; "> {{ likeCount }} </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import request from '@/utils/request';
export default {
    props: {
        musicId: Number,
        musicName: String,
        listenCount: Number,
        likeCount: Number,
        progress: Number,
        singer: String,
        tags: String,
        avatarPath: String,
        uploadTime: String,
        musicPath: String,
        uploader: String,
        pause:Boolean,
        index:Number,
        currentIndex:Number,
        musicProgress:{
            type:Number,
            default:0,
        },
        musicLength:{
            type:Number,
            default:0,
        }
    },
    data() {
        return {
            timeAgo: '',
        }
    },
    mounted() {
        this.timeAgo = this.getTimeAgoString(this.uploadTime);
    },
    methods: {
        
        formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const remainderSeconds = Math.floor(seconds % 60);
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
            const formattedSeconds = remainderSeconds < 10 ? `0${remainderSeconds}` : remainderSeconds;

            return `${formattedMinutes}:${formattedSeconds}`;
        },
        download(){
            const downloadLink=document.createElement("a");
            downloadLink.href=process.env.BASE_URL+ this.musicPath;
            downloadLink.download = this.musicPath;
            downloadLink.click();
        },
        addlike(){
            request.post("/api/music/addMusicLikeCount/"+this.musicId)
                .then((response)=>{
                    if(response.data.success){
                        this.$emit("incLike",this.index);
                    }
                })
                .catch(error=>error);
        }, 
        seek(event) {
            const progressBar = document.querySelector(".progress-bar"); // 获取进度条元素
            const clickPosition = event.clientX - progressBar.getBoundingClientRect().left; // 鼠标点击的位置相对于进度条的位置
            const progressBarWidth = progressBar.offsetWidth; // 进度条的宽度
            const newProgress = (clickPosition / progressBarWidth) * 100; // 计算新的播放进度百分比
            this.$emit("musicProgressUpdate",newProgress);
        },
        async play() {
            let precur=this.currentIndex;
            let preindex=this.index;
            if (this.pasue) {
                await this.$emit("musicClick", {
                    musicId: this.musicId,
                    musicName: this.musicName,
                    listenCount: this.listenCount,
                    likeCount: this.likeCount,
                    singer: this.singer,
                    tags: this.tags,
                    avatarPath: this.avatarPath,
                    uploadTime: this.uploadTime,
                    musicPath: this.musicPath,
                    uploader: this.uploader,
                    pause:this.pause,
                    index:this.index,
                    currentIndex:this.index,
                });
            }
            else {
                await this.$emit("musicClick", {
                    musicId: this.musicId,
                    musicName: this.musicName,
                    listenCount: this.listenCount,
                    likeCount: this.likeCount,
                    singer: this.singer,
                    tags: this.tags,
                    avatarPath: this.avatarPath,
                    uploadTime: this.uploadTime,
                    musicPath: this.musicPath,
                    uploader: this.uploader,
                    pause:this.pause,
                    index:this.index,
                    currentIndex:this.index,
                });
            }
            if((precur===undefined)||(preindex===precur)){
                this.$emit("play",true);
            }
            else{
                this.$emit("play",false)
            }
        },

        getTimeAgoString(dateString) {
            const now = new Date();
            const date = new Date(dateString);
            const timeDifference = now - date;
            if (timeDifference < 60000) { // 小于一分钟
                return Math.floor(timeDifference / 1000) + '秒前';
            } else if (timeDifference < 3600000) { // 小于一小时
                return Math.floor(timeDifference / 60000) + '分钟前';
            } else if (timeDifference < 86400000) { // 小于一天
                return Math.floor(timeDifference / 3600000) + '小时前';
            } else if (timeDifference < 2592000000) { // 小于一个月
                return Math.floor(timeDifference / 86400000) + '天前';
            } else if (timeDifference < 31536000000) { // 小于一年
                return Math.floor(timeDifference / 2592000000) + '个月前';
            } else {
                return Math.floor(timeDifference / 31536000000) + '年前';
            }
        }
    }
}
</script>
<style>
.progress-ball{
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #719eb4;
    position: absolute;
    right: 0px;
    z-index: 10;
}
.music-time{    

}
.music-time>div:nth-of-type(1){
    float: left;
    font-size: 10px;
}
.music-time>div:nth-of-type(2){
    float: right;
    font-size: 10px;
}
.song-title {
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(100% - 70px);
    margin-top: 10px;
}

.msc-info {
    width: calc(100% - 45px);
    height: 100%;
    display: block;
    align-items: center;
}

.msc-info>div {
    margin-left: 10px;
    display: block;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.play-button>img {
    width: 100%;
}
.others-buttons div{
    background-color: #444444;
    border-radius: 3px;
    border: 1px solid #cfd9d9;
    margin-bottom: 3px;
    text-align: center;
}
.others-buttons div span{
    line-height: 22px;
}
.others-buttons img {
    height: 18px;
    margin: 4px;
}

.music-box {
    width: 100%;
    display: flex;
    border: 1px solid #000000;
    border-top: none;
    border-left: none;
    border-right: none;
    color:#dddddd;
}

.music-img {
    height: 65px;
    width: 65px;
    margin-top: 10px;
    margin-left: 5px;
    border-radius: 5px;
    box-shadow: #d4d4d4 0px 0px 8px;
}

.music-info {
    width: calc(100% - 80px);
    height: 100%;
    padding: 0 5px;
}


.play-button {
    width: 35px;
    height: 35px;
    display: inline-block;
    float: left;
}

.music-progress {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 5px;
}

.progress-bar {
    width: 100%;
    height: 5px;
    background-color: #cccccc;
    position: relative;
    margin: 0 auto;
    border-radius: 2px;
    overflow: visible;
}

.others-buttons>div {
    height: 26px;
    display: inline-block;
    margin-right: 10px;
}

.progress {
    height: 5%;
    border-radius: 5px;
    background-color: #343434;
    position: relative;
}

.others-buttons {
    height: auto;
    width: 70%;
    margin: 0 auto;
}
</style>