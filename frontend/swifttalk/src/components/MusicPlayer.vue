<template>
    <div class="player-contanier" style="width:100%;height:100%;display:flex;align-items:center;">
        <div class="player-left">
            <img @click="skipPre" src="../assets/icon/skip-back.svg">
            <img @click="play" v-if="!pause" src="../assets/icon/pause-circle.svg">
            <img @click="play" v-if="pause" src="../assets/icon/play-circle.svg">
            <img @click="skipNext" src="../assets/icon/skip-forward.svg">
            <img @click="reload" style="width: 27px;" src="../assets/icon/refresh-cw.svg">
        </div>
        <div class="player-center">
            <div class="play-content">
                <span>{{ formatTime(musicProgress) }}</span>
                <div class="player-progress-bar">
                    <div style="border-radius:5px;overflow:hidden;width:100%;height:100%;position: relative;" @click="seek($event)">
                        <div class="player-progress" :style="{ width: (musicProgress / musicLength) * 100 + '%' }">
                        </div>
                    </div>
                </div>
                <span>{{ formatTime(musicLength) }}</span>
            </div>
            <div class="volume">
                <img src="../assets/icon/volume-2.svg" />
                <div class="volume-bar" @click="updateVolume">
                    <div class="volume-progress" :style="{width:volume*100+'%'}">
                    </div>
                </div>
            </div>
        </div>
        <div class="player-right" style="color: #cccccc;">
            <img style="height:40px;margin-left:10px" :src="avatarPath" alt="img">
            <div class="music-info" style="margin-left: 10px;">
                <div>{{ musicName }}</div>
                <div> {{ singer }} </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    props: {
        musicLength: {
            type: Number,
            default: 0 // 设置默认音乐长度
        },
        musicProgress: {
            type: Number,
            default: 0 // 设置默认音乐进度
        },
        volume: {
            type: Number,
            default: 0 // 设置默认音量
        },
        avatarPath: {
            type: String,
            default: 'titleicon.png' // 设置默认头像路径
        },
        singer: {
            type: String,
            default: '未知' // 设置默认歌手名
        },
        musicName: {
            type: String,
            default: '未知' // 设置默认歌曲名
        },
        pause: {
            type: Boolean,
            default: false // 设置默认播放状态
        }
    },
    methods: {
        skipPre(){
            this.$emit("skipPre");
        },
        skipNext(){
            this.$emit("skipNext");
        },
        reload(){
            this.$emit("reload");
        },
        formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const remainderSeconds = Math.floor(seconds % 60);

            // 使用三元表达式来确保秒数和分钟数都有两位
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
            const formattedSeconds = remainderSeconds < 10 ? `0${remainderSeconds}` : remainderSeconds;

            return `${formattedMinutes}:${formattedSeconds}`;
        },
        seek(event) {
            const progressBar = document.querySelector(".player-progress-bar"); // 获取进度条元素
            const progressBarRect = progressBar.getBoundingClientRect();
            const clickPosition = event.clientX - progressBarRect.left; // 鼠标点击相对于进度条的位置
            const progressBarWidth = progressBar.offsetWidth; // 进度条的宽度
            const newProgress = (clickPosition / progressBarWidth) * 100; // 计算新的播放进度百分比
            this.$emit("musicProgressUpdate", newProgress);
        },
        updateVolume(){
            const progressBar = document.querySelector(".volume-bar"); // 获取进度条元素
            const progressBarRect = progressBar.getBoundingClientRect();
            const clickPosition = event.clientX - progressBarRect.left; // 鼠标点击相对于进度条的位置
            const progressBarWidth = progressBar.offsetWidth; // 进度条的宽度
            const newProgress = (clickPosition / progressBarWidth) * 100; // 计算新的播放进度百分比
            console.log(newProgress);
            this.$emit("volumeProgressUpdate", newProgress);
        },
        play(){
            console.log(this.pause);
            this.$emit("play",true);
        }
    }
}
</script>

<style>
.player-contanier{
    background-color:#222222;
    box-shadow: -1px 0px 6px gray;
}
@media (max-width:1000px) {
    .player-left img:nth-of-type(4) {
        display: none;
    }
}

@media (max-width:800px) {
    .player-left img:nth-of-type(4) {
        display: inline-block;
    }
}

.music-info {
    width: 100%;
}

.music-info>div {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.volume {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 20%;
}

.volume-bar {
    height: 10px;
    width: calc(100% - 50px);
    background-color: aliceblue;
    margin-left: 10px;
}
.volume-progress {
    height: 100%;
    background-color: rgba(79, 147, 105, 0.501);
}

.player-progress-bar {
    background-color: rgba(255, 255, 255, 0.481);
    height: 10px;
    margin: 0 10px;
    width: 100%;
    border-radius:5px;
}

.player-progress {
    background-color: rgb(88, 179, 123);
    height: 10px;
    float: left;
}

@media (min-width: 800px) {
    .player-right {
        display: flex;
        align-items: center;
        width: 15%;
    }

    .player-center {
        display: flex;
        align-items: center;
        width: 70%;
        padding: 0% 5px;
    }

    .player-left {
        height: 60px;
        width: 15%;
        display: flex;
        align-items: center;
        margin-left: 20px;
    }
    .play-content span{
        color: #ffffff;
    }
}

@media (max-width: 800px) {
    .player-right {
        display: flex;
        align-items: center;
        width: 50%;
    }

    .player-center {
        position:fixed;
        left: 10%;
        bottom:100px;
        width:80%;
        display: flex;
        background-color: rgba(255, 255, 255, 0.574);
        border-radius: 10px;
        padding: 0% 5px;
        box-shadow:2px 2px 4px grey;
    }
    .player-center span{
        color: rgb(79, 79, 79);
        font-size: smaller;
        line-height:20px;
        text-shadow: 1px 1px 1px rgb(184, 184, 184);
    }
    .volume{
        display: none;
    }
    .play-content{
        width: 100%  !important;
    }
    .player-left {
        height: 60px;
        width: 50%;
        display: flex;
        align-items: center;
        margin-left: 20px;
    }
}

.last {
    height: 40px;
    width: 40px;
}

.player-left>img {
    height: 30px;
    width: 30px;
    margin: 0 5px;
}

.play-content {
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>






