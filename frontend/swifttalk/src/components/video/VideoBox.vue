<template>
    <div class="video-box" @click="videoClick">
        <div class="video-cover">
            <div class="aspect-ratio-box">
                <img :src="videoCover" alt="cover">
            </div>
            <div class="video-info">
                <div>
                    <i><img src="./icon/video.svg" alt=""></i>
                    <span>{{ playCount }}</span>
                </div>
                <div>
                    <i><img src="./icon/message.svg" alt=""></i>
                    <span>{{ messageCount }}</span>
                </div>
                <div style="margin-left: auto;">
                    <span>{{ formatTime(videoLength) }}</span>
                </div>
            </div>
        </div>
        <div class="description-box">
            {{ videoDescription }}
        </div>
        <div class="uploader-box">
            <img src="./icon/uploader.svg">
            <span>{{ uploader }}</span>
            <img style="margin:0 10px 0 auto;" src="./icon/more.svg">
        </div>
    </div>
</template>

<script>
export default {
    props: {
        videoCover: {
            type: String,
            default: "",
        },
        playCount: {
            type: Number,
            default: 0,
        },
        videoLength: {
            type: Number,
            default: 0,
        },
        messageCount: {
            type: Number,
            default: 0,
        },
        videoDescription: {
            type: String,
            default: "",
        },
        uploader: {
            type: String,
            default: "未知",
        },
        videoPath: {
            type: String,
            default: "",
        },
    },
    created(){
        this.wardBreak();
    },
    methods: {
        videoClick(){
            this.$emit("video-click",this.videoPath);
        },
        formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const remainderSeconds = Math.floor(seconds % 60);
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
            const formattedSeconds = remainderSeconds < 10 ? `0${remainderSeconds}` : remainderSeconds;

            return `${formattedMinutes}:${formattedSeconds}`;
        },
        wardBreak() {
            window.addEventListener('DOMContentLoaded', () => {
                const descriptionBoxes = document.querySelectorAll('.description-box');

                descriptionBoxes.forEach(box => {
                    const content = box.textContent;
                    const maxHeight = parseInt(getComputedStyle(box).getPropertyValue('height'));
                    const lineHeight = parseInt(getComputedStyle(box).getPropertyValue('line-height'));

                    const lineCount = Math.floor(maxHeight / lineHeight);
                    const lines = content.split('\n');

                    if (lines.length > lineCount) {
                        const truncatedLines = lines.slice(0, lineCount);
                        const truncatedContent = truncatedLines.join('\n');
                        const truncatedContentWithEllipsis = truncatedContent + '...';
                        box.textContent = truncatedContentWithEllipsis;
                    }
                });
            });
        }
    }

}
</script>

<style>
.uploader-box span {
    margin-left: 5px;
}

.uploader-box img {
    height: 20px;
    margin-left: 10px;
}

.uploader-box {
    height: 25px;
    width: 100%;
    background-color: rgb(28, 28, 28);
    color: rgb(195, 195, 195);
    display: flex;
    align-items: center;
    font-size: 12px;
}

.description-box {
    height: 33px;
    padding: 7px;
    width: calc(100% - 14px);
    display: -webkit-box !important;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    background-color: rgb(28, 28, 28);
    color: aliceblue;
    font-size: 14px;
}

.video-info div {
    display: flex;
    align-items: center;
    margin: 0 5px;
}

.video-info img {
    height: 17px;
}

.video-info {
    height: 30px;
    position: absolute;
    bottom: 0px;
    width: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.719), transparent);
    display: flex;
    align-items: center;
    color: aliceblue;
    font-size: 10px;
}

.video-box {
    display: inline-block;
    width: calc(50% - 4px);
    margin: 2px;
    border-radius: 7px;
    overflow: hidden;
}

.video-cover {
    position: relative;
}

.aspect-ratio-box {
    position: relative;
    width: 100%;
    padding-bottom: 75%;
    /* 4:3 比例的容器高度 */
    overflow: hidden;
}

.aspect-ratio-box img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
