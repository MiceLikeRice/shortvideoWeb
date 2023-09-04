<template>
    <div class="upload-board">
        <div @click="back" style="
        height:30px;
        width:30px;
        position:absolute;
        top:10px;
        left:10px;
        ">
            <img id="back" style="height: 23px;width:23px;" src="../../components/video/icon/back.svg" />
        </div>
        <div class="upload-top">
            发布视频
        </div>
        <div class="video-info-input">
            <div class="video-cover">
                <img :src="coverPath" />
                <img class="play" src="../../assets/icon/youtube.svg" />
                <div class="revise-cover" @click="getVideoCover">
                    <img src="../../assets/icon/edit-cover.svg" />
                    <span>自动生成封面</span>
                </div>
            </div>
            <textarea id="subject" placeholder="合适的标题可以吸引更多的人观看~" />
        </div>
        <div class="video-border">
            <span>0/80</span>
        </div>
        <div class="tag">
            <div @click="toggletags">
                <img src="../../components/video/icon/tag.svg" />
                <span>分区和标签</span>
                <img class="arraw-right" src="../../components/video/icon/right.svg" />
            </div>
            <div style="min-height:40px">
                <div>
                    {{ selectedCategory }}-{{ selectedSubcategory }}
                </div>
                <div></div>
                <div class="selected-tags">
                    <div v-for="tag in selectedTags" :key="tag"
                        @click.prevent="() => selectedTags = selectedTags.filter(t => t !== tag)">
                        <img src="../../assets/icon/clear.svg" />
                        <span>
                            {{ tag }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="filter" @click="toggletags" @touchmove="($event) => $event.preventDefault()"></div>
            <div id="tags" @touchmove="($event) => $event.preventDefault()">
                <div class="move-bar"></div>
                <div class="tags-head">
                    <span @click="toggletags" style="font-size:smaller;color:rgb(187, 187, 187)">取消</span>
                    <span>选择分区及标签</span>
                    <span @click="toggletags" style="font-size:medium;color:rgb(234, 234, 234)">确定</span>
                </div>
                <div class="section" @touchmove="($event) => $event.preventDefault()" @click="activeSectionSlide">
                    <span>分区</span>
                    <div>
                        <span>{{ selectedCategory }}-{{ selectedSubcategory }}</span>
                        <img src="../../components/video/icon/right.svg" />
                    </div>
                </div>
                <div class="candidate-tags">
                    <div v-for="(tag, index) in tags" :key="index"
                        @click.prevent="!selectedTags.includes(tag) ? selectTag($event, tag) : cancelTag($event, tag)"
                        :class="selectedTags.includes(tag) ? 'active' : ''">
                        <img src="../../assets/icon/clear.svg" />
                        <span>
                            {{ tag }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div class="border"></div>
        <div class="description">
            <div @click="showDescription">
                <span>简介</span>
                <img class="arraw-right" src="../../components/video/icon/right.svg" />
            </div>
            <textarea id="description" placeholder="快向小伙伴介绍你的视频吧~" class="description-input" />
        </div>
        <div class="border"></div>
        <div class="add-video" @click="uploadFileHandler">
            <img src="../../assets/icon/plus.svg" alt="">
        </div>
        <div class="upload">
            <div class="upload-progress-bar">
                <div class="upload-progress" :style="{ width: percentCompleted + '%' }"> </div>
            </div>
            <span>{{ formatBytes(uploaded) }}/{{ formatBytes(total) }}</span>
        </div>
        <div class="submit">
            <button @click="publish">
                发布
            </button>
        </div>
        <div class="section-slide">
            <div class="section-slide-head" @click="closeSectionSlide">
                <img src="../../components/video/icon/right.svg" />
                <span>分区</span>
            </div>
            <div class="divide"> </div>
            <div class="section-slide-content">
                <div class="section-slide-left">
                    <div class="section-slide-left-box" v-for="(description, category) in section" :key="category"
                        :class="selectedCategory === category ? 'active' : ''" @click="chooseSection(category)">
                        {{ category }}
                    </div>
                </div>
                <div class="section-slide-right">
                    <div class="section-slide-right-box" v-for="(desc, subCategory) in selectedCategoryData"
                        :key="subCategory" :class="selectedSubcategory === subCategory ? 'active' : ''"
                        @click="() => selectedSubcategory = subCategory">
                        <span>{{ subCategory }}</span>
                        <span>{{ desc }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import request from "@/utils/request";
import Cookies from "cookies-js"
export default {
    data() {
        return {
            choosed: true,
            total: 0,
            uploaded: 0,
            percentCompleted: 0,
            coverPath: require("../../assets/default-cover.png"),
            isloading: false,
            videoFile: null,
            selectedTags: [
                "搞笑",
            ],
            tags: [
                "搞笑",
                "创意",
                "怀旧",
                "冒险",
                "音乐",
                "科学",
                "美食",
                "探索",
                "奇幻",
                "恐怖",
                "浪漫",
                "教育",
                "历史",
                "游戏",
                "健康",
                "运动",
                "时尚",
                "纪录片",
                "科技",
                "动画",
                "娱乐",
                "影视",
                "新闻",
                "政治"
            ],
            videoPath: "",
            videoSize: 0,
            videoUploadTime: null,
            videoCoverPath: "",
            videoLength: 0,
            selectedCategory: "游戏",
            selectedSubcategory: "单机游戏",
            section: {
                "游戏": {
                    "单机游戏": "以单机或其联机模式为主要内容的相关视频",
                    "网络游戏": "多人在线游戏为主要内容的相关视频",
                    "游戏攻略": "游戏技巧、教程和攻略视频",
                    "游戏开箱": "游戏硬件和设备的开箱和评测",
                    "游戏新闻": "最新游戏行业新闻和发布信息",
                    "游戏趣闻": "有趣的游戏相关故事和趣闻",
                    "游戏比赛": "电子竞技比赛和赛事的实况转播",
                    "游戏评论": "游戏评测和玩家评价"
                },
                "音乐": {
                    "流行音乐": "流行音乐、歌手和音乐视频",
                    "古典音乐": "古典音乐作品、交响乐团和古典音乐家的表演",
                    "摇滚乐": "摇滚音乐、摇滚乐队和音乐会录影",
                    "流行歌手": "流行歌手的现场演出和音乐作品",
                    "电子音乐": "电子音乐、DJ 表演和电子音乐制作",
                    "嘻哈音乐": "嘻哈音乐、说唱和嘻哈艺术家介绍",
                    "民谣音乐": "民谣音乐、民谣歌手和音乐会现场",
                    "世界音乐": "世界各地的音乐风格和音乐家"
                },
                "电影": {
                    "最新电影": "最新电影预告片、评论和相关内容",
                    "经典电影": "经典电影、影评和电影人物",
                    "科幻电影": "科幻电影作品、特效和幕后制作",
                    "动画电影": "动画电影、卡通角色和动画制作过程",
                    "恐怖电影": "恐怖电影、惊悚片和怪物特效",
                    "爱情电影": "爱情电影、浪漫故事和电影配乐",
                    "纪录片": "纪录片、真实故事和历史事件",
                    "奥斯卡电影": "奥斯卡获奖电影和颁奖典礼"
                },
                "科技": {
                    "科技新闻": "最新的科技新闻、趋势和评论",
                    "科学探索": "科学研究、实验和科学家的介绍",
                    "互联网": "互联网技术、网络安全和创新产品",
                    "智能手机": "智能手机、应用程序和手机评测",
                    "电子设备": "电子设备、家居科技和智能家居",
                    "计算机科学": "计算机编程、算法和计算机科学知识",
                    "人工智能": "人工智能、机器学习和深度学习",
                    "太空探索": "太空探索、宇航员和宇宙科学"
                },
                "旅行": {
                    "旅游景点": "世界各地的旅游景点、旅行故事和景点导览",
                    "冒险旅行": "冒险旅行和探险故事",
                    "城市之旅": "城市旅行、城市风景和文化体验",
                    "自然风光": "自然风光、国家公园和户外探险",
                    "文化探索": "文化探索、当地风俗和文化传统",
                    "美食之旅": "美食旅行、当地美食和美食体验",
                    "海滩度假": "海滩度假、水上活动和度假胜地",
                    "豪华旅行": "豪华旅行、豪华酒店和高端度假"
                },
                "知识": {
                    "科普知识": "科学、技术、医学和自然科学的知识分享",
                    "历史文化": "历史事件、文化传统和古代文明的介绍",
                    "学术讲座": "学术研究、学术论坛和学术演讲",
                    "职业技能": "职业技能培训、教育和职场心得分享",
                    "健康生活": "健康知识、生活方式和健康建议"
                },
                "娱乐": {
                    "综艺节目": "综艺节目、真人秀和明星娱乐",
                    "娱乐新闻": "娱乐圈新闻、八卦和名人八卦",
                    "音乐娱乐": "音乐娱乐、演唱会和音乐活动",
                    "搞笑视频": "搞笑视频、喜剧演出和恶搞剪辑",
                    "美食娱乐": "美食娱乐、美食评测和烹饪秀"
                },
                "影视": {
                    "电视剧": "电视剧剧集、影评和剧情介绍",
                    "影视花絮": "电影和电视花絮、幕后故事和特效制作",
                    "影星专访": "影星专访、演员采访和演技分析",
                    "影视评论": "影片评论、影评和观后感分享",
                    "经典台词": "电影和电视剧的经典台词和对白"
                },
                "动画": {
                    "动画片": "动画影片、卡通剧集和动画片段",
                    "动画创作": "动画制作、动画师介绍和创作过程",
                    "经典动画": "经典动画作品、动画导演和历史回顾",
                    "动画配音": "动画配音演员、幕后花絮和声优介绍",
                    "动画教程": "动画制作教程、动画技巧和教学视频"
                },
            }
        }
    },
    computed: {
        selectedCategoryData() {
            return this.section[this.selectedCategory] || {};
        },
    },
    methods: {
        cancelTag(event, tag) {
            this.selectedTags = this.selectedTags.filter(t => t !== tag)
        },
        selectTag(event, tag) {
            this.selectedTags.push(tag);
        },
        async toggletags() {
            console.log("yes");
            if (document.querySelector(".section-slide").className === "section-slide") {
                this.closeSectionSlide();
                setTimeout(() => {
                    const tags = document.querySelector("#tags");
                    tags.classList.toggle("hidden");
                    const filter = document.querySelector(".filter");
                    filter.classList.toggle("hidden");
                }, 300);
            }
            else {
                const tags = document.querySelector("#tags");
                tags.classList.toggle("hidden");
                const filter = document.querySelector(".filter");
                filter.classList.toggle("hidden");
            }
        },
        activeSectionSlide() {
            const slide = document.querySelector(".section-slide");
            slide.classList.remove("close");
        },
        closeSectionSlide() {
            const slide = document.querySelector(".section-slide");
            slide.classList.add("close");
        },
        chooseSection(category) {
            this.selectedCategory = category;
            this.selectedSubcategory = Object.keys(this.section[category])[0];
        },
        publish() {
            const video_subject = document.querySelector("#subject").value;
            const video_tags = this.selectedTags;
            const video_description = document.querySelector("#description").value;
            const video_uploader = Cookies.get("username");
            const video_info = {
                video_subject: video_subject,
                video_description: video_description,
                video_tags: video_tags.map(tag => `#${tag}`).join(''),
                video_uploader: video_uploader,
                video_path: this.videoPath,
                video_cover_path: this.videoCoverPath,
                video_play_count: 0,
                video_thumbsup_count: 0,
                video_publish_time: new Date().toISOString().slice(0, 19).replace('T', ' '),
                video_size: this.videoSize,
                video_section: this.selectedCategory + "-" + this.selectedSubcategory,
                video_length: this.videoLength
            }
            if (!video_info.video_subject) {
                alert('请输入视频主题');
                return;
            }
            if (!video_info.video_description) {
                alert('请输入视频描述');
                return;
            }
            if (!video_info.video_tags) {
                alert('请输入视频标签');
                return;
            }
            if (!video_info.video_path) {
                alert('请输入视频路径');
                return;
            }
            if (!video_info.video_cover_path) {
                alert('请输入视频封面路径');
                return;
            }
            request.post("/api/shortvideo/insertshortvideo", video_info)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.error(error);
                })
        },
        formatBytes(bytes) {
            if (bytes < 1024) {
                return bytes + " B";
            } else if (bytes < 1024 * 1024) {
                return (bytes / 1024).toFixed(2) + " KB";
            } else if (bytes < 1024 * 1024 * 1024) {
                return (bytes / (1024 * 1024)).toFixed(2) + " MB";
            } else {
                return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
            }
        },
        showDescription() {
            const description = document.querySelector(".description");
            description.classList.toggle("edit");
        },
        back() {
            this.$router.go(-1);
        },
        async uploadImage(imageFile) {
            const formData = new FormData();
            formData.append('file', imageFile);
            await request.post("api/image/uploadimage", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => {
                    console.log(response.data);
                    this.videoCoverPath = response.data.filename;
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },
        getVideoCover() {
            function dataURLtoFile(dataURL, filename) {
                const arr = dataURL.split(',');
                const mime = arr[0].match(/:(.*?);/)[1];
                const bstr = atob(arr[1]);
                let n = bstr.length;
                const u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new File([u8arr], filename, { type: mime });
            }
            const file = this.videoFile;
            if (file) {
                const video = document.createElement('video');
                video.muted = true;
                video.setAttribute('src', URL.createObjectURL(file));
                const self=this;
                video.addEventListener('loadeddata', function () {
                    self.videoLength = video.duration;
                    const canvas = document.createElement('canvas');
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    video.currentTime = 10;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const coverDataURL = canvas.toDataURL('image/jpeg');
                    const imageFile = dataURLtoFile(coverDataURL, Date.now() + ".jpg");
                    self.uploadImage(imageFile);
                    self.coverPath = coverDataURL;
                    const downloadLink = document.createElement('a');
                    downloadLink.href = coverDataURL;
                    downloadLink.download = 'video_cover.jpg'; // 设置下载文件名
                    downloadLink.click(); // 模拟点击下载链接
                });
                video.play();
            }
        },
        uploadFileHandler() {
            const input = document.createElement("input");
            input.type = "file";
            input.id = "videoInput";
            input.accept = "video/*"
            input.click();
            input.addEventListener("change", () => {
                console.log(input.value);
                const file = input.files[0];
                this.videoFile = file;
                console.log(file.name);
                const formData = new FormData();
                formData.append("file", file);
                const progress = document.querySelector(".upload");
                progress.classList.add("active")
                this.isloading = true;
                const config = {
                    onUploadProgress: progressEvent => {
                        this.total = progressEvent.total;
                        this.uploaded = progressEvent.loaded;
                        this.videoSize = progressEvent.total;
                        this.percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        console.log("上传进度：" + this.percentCompleted + "%");
                    },
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                };
                request.post("/api/video/uploadVideo", formData, config)
                    .then((response) => {
                        console.log(response.data);
                        this.videoPath = response.data.filename;
                        this.videoUploadTime = response.data.video_upload_time;
                        progress.classList.remove("active")
                        this.isloading = false;
                    })
                    .catch(error => console.error(error));
            });
        },
        handleFile(event) {
            const input = event.target;
            console.log(input.value);
        },
        toggleLogupBoard() {

        },
        toggleUploadBoard() {
            const uploadBoard = document.querySelector(".upload-board");
            console.log(uploadBoard);
            uploadBoard.classList.toggle("cancel");
        },
        uploadVideo() {

        },
    }
}
</script>

<style scoped>
.move-bar {
    height: 5px !important;
    width: 50px;
    border-radius: 2.5px;
    background-color: #ffffff;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 10px;
}

.tags-head span {
    margin: 10px;
}

.tags-head {
    width: 100%;
    height: 40px !important;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: rgb(206, 206, 206);
}

.filter.hidden {
    display: none;
}

.filter {
    height: 100vh;
    width: 100vw;
    position: fixed;
    left: 0px;
    bottom: 0px;
    background-color: rgba(207, 207, 207, 0.277);
    z-index: 9999;
    pointer-events: stroke;
}

.divide {
    height: 10px;
    background-color: #141414;
}

.section-slide-content {
    height: calc(100% - 45px);
    width: 100%;
    display: flex;
}

.section-slide-left-box.active {
    background-color: rgb(232, 127, 0);
    color: #1c1c1c;
    font-size: large;
}

.section-slide-left-box {
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
}

.section-slide-right-box>span:first-child {
    font-size: 16px;
    color: #ffffff;
    margin-left: 10px;
    line-height: 30px
}

.section-slide-right-box>span:last-child {
    font-size: 13px;
    color: #c0c0c0;
    margin-left: 10px;
    line-height: 24px
}

.section-slide-right-box.active>span:first-child {
    color: #000000;
}

.section-slide-right-box.active>span:last-child {
    color: rgb(48, 48, 48);
}

.section-slide-right-box.active {
    background-color: rgb(232, 127, 0);
}

.section-slide-right-box {
    width: 90%;
    display: flex;
    flex-direction: column;
    background-color: #242424;
    border-radius: 20px;
    margin: 0 auto;
    margin-bottom: 10px;
}

.section-slide-left {
    height: 100%;
    width: 20%;
    background-color: #141414;
    overflow: scroll;
}

.section-slide-right {
    height: 100%;
    width: 80%;
    overflow: scroll;

}

.section-slide-head>img {
    transform: rotate(180deg);
    margin: 10px;
}

.section-slide-head>span {
    color: white;
    font-size: 14px;
}

.section-slide-head {
    height: 40px !important;
    width: 100%;
    position: relative !important;
    top: 0px !important;
    display: flex;
    align-items: center;
}

.section-slide.close {
    left: 100%;
    transition: left 0.2s ease-in-out;
}

.section-slide {
    position: fixed;
    height: calc(60% - 65px) !important;
    background-color: #1c1c1c;
    left: 0px;
    bottom: 0px;
    width: 100%;
    z-index: 99999;
    transition: left 0.2s ease-in-out;
}

.section>div>img {
    margin: 10px;
}

.section>div {
    color: #6f6f6f;
    display: flex;
    align-items: center;
    font-size: 13px;
}

.section>span {
    color: #c6c6c6;
    margin-left: 10px;
    font-size: 14px;
    font-weight: bold;
}

.section {
    height: 50px;
    width: 90%;
    width: 0 auto;
    background-color: #1c1c1c;
    border-radius: 10px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.selected-tags {
    display: flex;
    flex-wrap: wrap;
    padding-left: 10px;
    padding-right: 10px;
    width: calc(100% - 20px);
    margin: 0px !important;
}

.selected-tags div img {
    width: 14px !important;
    height: 14px !important;
    margin-left: 0px !important;
}

.selected-tags div {
    display: flex;
    justify-content: center;
    /* 在水平方向上居中对齐 */
    align-items: center;
    /* 在垂直方向上居中对齐 */
    background-color: rgba(255, 255, 255, 0.6);
    font-size: 14px;
    padding: 5px 10px 5px 5px !important;
    border-radius: 20px;
    margin: 5px 5px;
    color: rgb(51, 51, 51) !important;
    font-weight: bold;
}


.candidate-tags {
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;
    padding-left: 10px;
    padding-right: 10px;
    width: calc(100% - 20px);
}

.candidate-tags div img {
    width: 14px !important;
    height: 14px !important;
    margin-left: 0px !important;
}

.candidate-tags div.active {
    background-color: rgb(232, 127, 0);
    transform: scale(1.1);
}

.candidate-tags div {
    display: flex;
    justify-content: center;
    /* 在水平方向上居中对齐 */
    align-items: center;
    /* 在垂直方向上居中对齐 */
    background-color: rgba(255, 255, 255, 0.534);
    font-size: 14px;
    padding: 5px 10px 5px 5px !important;
    border-radius: 20px;
    margin: 5px 10px;
    color: rgb(51, 51, 51) !important;
    font-weight: bold;
}

#tags.hidden {
    bottom: -60%;
    transition: bottom 0.3s ease-in-out;
}

#tags {
    height: 60%;
    width: 100%;
    position: fixed;
    background-color: #141414;
    bottom: 0px;
    z-index: 99999;
    border-radius: 10px 10px 0 0;
    transition: bottom 0.3s ease-in-out;
}

.upload-progress-bar {
    width: 70%;
    background-color: #6f6f6f;
    height: 100%;
    border-radius: 10px;
    overflow: hidden;
}

.upload-progress {
    height: 100%;
    width: 20%;
    background-color: rgb(232, 127, 0);
}

.upload span {
    color: white;
    margin-left: 10px;
}

.upload {
    height: 20px;
    width: 100%;
    position: fixed;
    bottom: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: scale(0);
}

.upload.active {
    transform: scale(1);
    transition: scale 0.1s ease-in-out;
}

.submit {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 20px;
}

.submit button {
    height: 100%;
    width: 70%;
    border-radius: 20px;
    background-color: rgb(232, 127, 0);
    color: #1c1c1c;
    font-size: medium;
    border: none;
}

.border {
    height: 1px;
    width: 100%;
    background-color: #6f6f6f;
}

.tag {
    width: 100%;
    margin-top: 20px;
}

.tag div:nth-of-type(2) {
    height: calc(100% - 20px);
    display: flex;
    align-items: center;
}

.tag div:nth-of-type(2)>div:first-child {
    margin: 0 10px;
    color: rgb(141, 141, 141);
    font-size: 10px;
    width: 70px;
}

.tag div:nth-of-type(2)>div:nth-of-type(2) {
    width: 1px;
    height: 50%;
    background-color: #c6c6c6;
}

.tag div:first-child {
    height: 20px;
}

.tag div:first-child {
    color: #c6c6c6;
    display: flex;
    align-items: center;
    position: relative;
}

.tag div:first-child span {
    font-size: 14px;
    font-weight: bold;
}

.tag div:first-child img:nth-of-type(1) {
    height: 20px;
    width: 20px;
    margin-left: 10px;
}

.video-border span {
    margin-right: 10px;
    line-height: 20px;
    font-size: x-small;
    color: #c6c6c6;
    margin-left: auto;
}


.arraw-right {
    display: block;
    float: right;
    height: 12px;
    width: 12px;
    position: absolute;
    right: 10px;
}

.description.edit {
    transition: height 0.3s ease-in-out;
    height: 150px;
}

.description.edit textarea {
    display: block;
}

.description textarea {
    display: block;
}

.description {
    height: 40px;
    color: #c6c6c6;
    font-size: 14px;
    transition: height 0.3s ease-in-out;
    overflow: hidden;
}

.description-input {
    height: 110px;
    width: calc(100% - 20px);
    font-size: medium;
    background-color: transparent;
    border: none;
    color: #c6c6c6;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    padding: 10px;
}

.description-input:focus {
    outline: none;
}

.description div {
    height: 40px;
    display: flex;
    align-items: center;
}

.description div span {
    margin-left: 10px;
}

.upload-top {
    height: 40px;
    width: 100%;
    color: #c6c6c6;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: larger;
    font-weight: bolder;
}

.add-video {
    width: 100px;
    height: 100px;
    background-color: #1c1c1c;
    margin-left: 20px;
    margin-top: 40px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
}

.add-video img {
    height: 60px;
    width: 60px;
}

.video-cover img:first-child {
    height: auto;
    width: 100%;
    overflow: hidden;
    border-radius: 10px;
}

.revise-cover img {
    display: block;
    margin-right: 10px;
    height: 25px !important;
    width: 25px !important;
}

.revise-cover span {
    color: #eeeeee;
    font-size: 13px;
}

.revise-cover {
    height: 30px;
    width: 100%;
    background-color: #1c1c1c75;
    position: absolute;
    bottom: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 0px;
}

.video-cover {
    position: relative;
    width: 165px;
    height: 100px;
    overflow: hidden;
}

.play {
    height: 30px;
    width: 30px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.video-info-input textarea {
    margin-left: 20px;
    width: calc(100% - 160px);
    height: 100%;
    border-radius: 10px;
    size-adjust: none;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: small;
    color: aliceblue;
    background-color: transparent;
    resize: none;
    border: 0px;
    padding: 0 10px 5px 0px;
    overflow: hidden;
    float: right;
}

.video-info-input textarea:focus {
    outline: none;
}

.video-border span {
    float: right;
    display: block;
    margin-right: 10px;
    line-height: 100%;
    font-size: x-small;
    color: #c6c6c6;
}

.video-border {
    height: 20px;
    width: 100%;
    border: 1px solid rgb(89, 89, 89);
    border-left: none;
    border-right: none;
    border-top: none;

}

.video-info-input {
    width: calc(100% - 10px);
    height: 100px;
    padding: 5px 0;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
}
</style>