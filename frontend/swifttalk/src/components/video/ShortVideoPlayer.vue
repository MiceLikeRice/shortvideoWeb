<template>
    <div class="video-container">
        <aside class="button-aside">
            <div @touchstart="thumbsstart" @touchend="thumbsend">
                <img class="thumbsup-icon" :class="thumbsup ? 'active' : ''" src="./icon/thumbsup.svg" />
                <span style="color:white">
                    {{ thumbsupCount }}
                </span>
            </div>
            <div @click="toggleComment">
                <img src="./icon/chat.svg" />
                <span style="color:white">
                    {{ commentCount }}
                </span>
            </div>
            <div>
                <img src="./icon/star.svg" />
                <span style="color:white">
                    {{ shareCount }}
                </span>
            </div>
            <div>
                <img src="./icon/share.svg" />
                <span style="color:white">
                    {{ shareCount }}
                </span>
            </div>
        </aside>
        <div class="video-play">
            <div class="play" v-if="!isPlaying" @click="togglePlay"
                style="display: flex; align-items:center;justify-content:center;">
                <img style="height: 80%; width:80%;position:relative;left:3px" src="../../assets/icon/play.svg" />
            </div>
            <video ref="videoElement" @click="togglePlay" id="video" playsinline webkit-playsinline>
                <source :src="videopath" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
        <div class="play-bottom">
            <div class="uploader-info">
                <div class="avatar">
                    <img :src="avatarPath" />
                </div>
                <div class="info">
                    <div><span>{{ uploaderName }}</span>
                        <div class="subs">+ 关注</div>
                    </div>
                    <div>{{ fansCount }}粉丝</div>
                </div>
            </div>
            <div class="video-description">
                {{ description }}
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        videopath: {
            type: String,
            default: ""
        },
        coverPath: {
            type: String,
            default: "titleicon.png"
        },
        avatarPath: {
            type: String,
            default: "titleicon.png"
        },
        description: {
            type: String,
            default: "这是一个简单的演示视频"
        },
        fansCount: {
            type: Number,
            default: 0
        },
        thumbsupCount: {
            type: Number,
            default: 0
        },
        commentCount: {
            type: Number,
            default: 0
        },
        starCount: {
            type: Number,
            default: 0
        },
        shareCount: {
            type: Number,
            default: 0
        },
        uploaderName: {
            type: String,
            default: "小丑"
        },
        status: Number,
        change: Number,
        Reload: Boolean,
        play: Boolean
    },
    watch: {
        Reload(reload) {
            console.log("reload:", reload)
            if (reload) {
                this.reloadVideo(this.videopath);
            }
        },
        change(index) {
            console.log("index=", index);
        },
        videopath(newPath) {
            this.reloadVideo(newPath); // 重新加载视频
            this.play();
        },
    },
    data() {
        return {
            isPlaying: false,
            thumbsup: false,
            currentIndex: 1,
            touchstartY: 0,
            thumbupTag: false,
        }
    },
    created() {
        console.log(this.videopath);
    },
    methods: {

        pause() {
            const videoElement = this.$refs.videoElement;
            videoElement.load();
            videoElement.pause();
        },
        destroyVideo() {
            const videoElement = this.$refs.videoElement;
            videoElement.pause();
            videoElement.removeAttribute("src");
        },
        reloadVideo(newPath) {
            this.destroyVideo();
            const videoElement = this.$refs.videoElement;
            videoElement.querySelector("source").src = newPath;
            videoElement.load();
        },
        thumbsstart() {
            console.log("start")
            this.thumbsupTag = false;
            setTimeout(() => this.thumbsupTag = true, 1000);
            const thumb = document.querySelector(".thumbsup-icon");
            thumb.classList.add("pulse")
            console.log(thumb);
        },
        thumbsend() {
            if (this.thumbsupTag === true) {
                console.log("yes");

            }
        },
        toggleComment() {
            this.$emit("toggleComment");
        },
        handleSwipe(event, direction) {
            if (direction === "up") {
                this.switchToPre();
            } else if (direction === "down") {
                this.switchToNext();
            }
        },
        switchToNext() {
            this.currentIndex++;
        },
        switchToPre() {
            this.currentIndex--;
        },
        onTouchStart(event) {
            this.touchstartY = event.touches[0].clientY;
        },
        onTouchEnd(event) {
            const deltaY = event.changedTouches[0].clientY - this.touchstartY;
            if (deltaY > 100) {
                console.log("上一个视频");
                this.switchToPre();

            } else if (deltaY < -100) {
                console.log("下一个视频");
                this.switchToNext();
            }
        },
        togglePlay() {
            const video = this.$refs.videoElement;
            if (!this.isPlaying) {
                video.play();
            } else {
                video.pause();
            }
            this.isPlaying = !this.isPlaying;
        }

    },
    beforeRouteLeave(to, from, next) {
        document.body.style.overflow = 'auto';
        next();
    },
};
</script>
  
<style scoped>
.thumbsup-icon {}

.thumbsup-icon.pulse {
    animation: pulse 0.3s ease infinite alternate;
    transition: scale(0.1) 0.3s linear;
}

@keyframes pulse {
    0% {
        transform: scale(0.9), rotate(10deg);
    }

    50% {
        transform: scale(1), rotate(0deg);
    }

    100% {
        transform: scale(0.9), rotate(-10deg);
    }
}

.thumbsup-icon.active {}

.video-description {
    height: 20px;
    color: white;
    margin-left: 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.subs {
    display: inline-block;
    background-color: rgb(0, 138, 188);
    border-radius: 10px;
    padding: 0 10px;
    padding-top: 4px;
    float: right;
    text-align: center;
}

.info div {
    height: 25px;
    color: white;
    margin-left: 10px
}

.info {
    width: calc(70% - 52px);
}

.uploader-info {
    margin-left: 10px;
    margin-bottom: 0px;
    display: flex;
}

.avatar img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
}

.play-bottom {
    position: absolute;
    height: 90px;
    width: calc(100% - 60px);
    bottom: 0px;
    left: 0px;
    margin-top: 5px;
}

.button-aside span {
    text-align: center;
    font-family: Roboto;
    font-size: 12px;
}

.button-aside div {
    display: grid;
    align-items: center;
    margin: 10px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: rgba(240, 248, 255, 0.137);
}

.button-aside img {
    margin: 0 auto;
    height: 35px;
}

.button-aside {
    position: absolute;
    right: 0px;
    bottom: 100px;
    width: 70px;
    z-index: 10;

}

#video {
    width: 100%;
    object-fit: cover;
    justify-self:center;
    /* Preserve aspect ratio and cover the container */
}

.play {
    position: absolute;
    height: 60px;
    width: 60px;
    background-color: rgba(255, 255, 255, 0.315);
    border-radius: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
}

.video-play {
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% - 20px);
    height: calc(100% - 110px);
    margin: 10px;
    border-radius: 10px;
    overflow: hidden;
    display:flex;
    align-items:center;
}

.play-head {
    height: 50px;
    display: flex;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 999;
}

.play-head div:nth-of-type(2) {
    margin-left: auto;
}

.play-head>div {
    margin: 0 10px;
    display: flex;
}

.play-head img {
    height: 27px;
    align-self: center;
}

.video-container {
    height: 100%;
    width: 100%;
    overflow: hidden;
    bottom: 0;
    background-color: rgb(14, 14, 14);
    position: relative;
}
</style>
  