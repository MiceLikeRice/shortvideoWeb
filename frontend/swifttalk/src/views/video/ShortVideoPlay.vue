<template>
    <div class="slide-container">
        <div class="play-head">
            <div @click="back">
                <img src="../../components/video/icon/back.svg" />
            </div>
            <div @click="search">
                <img src="../../components/video/icon/search.svg" />
            </div>
            <div>
                <img src="../../components/video/icon/more.svg" />
            </div>
        </div>
        <div class="slide-a"
            :style="{ top: `${slidePosition.y + offsetA}px`, transition: isDragging ? 'none' : `top ${transitionTimeA}s ease-in` }"
            @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
            <short-video-player @toggleComment="toggleComment" 
            v-if="loaded"
            :videopath="prefix+this.videoList[videoIndexA].videoPath"
            avatarPath="titleicon.png"
            :description="videoList[videoIndexA].videoDescription"
            :fansCount="0"
            :thumbsupCount="videoList[videoIndexA].videoThumbsupCount"
            :commentCount="videoList[videoIndexA].videoCommentsCount"
            :starCount="0"
            :shareCount="0"
            :uploaderName="videoList[videoIndexA].videoUploader"
            :status="currentVideoIndex"
            :change="videoIndexA"
            :Reload="reloadA"
            :play="playA"
            />
        </div>
        <div class="slide-b"
            :style="{ top: `${slidePosition.y + offsetB}px`, transition: isDragging ? 'none' : `top ${transitionTimeB}s ease-in` }"
            @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
            <short-video-player  @toggleComment="toggleComment" 
            v-if="loaded"
            :videopath="prefix+this.videoList[videoIndexB].videoPath"
            avatarPath="titleicon.png"
            :description="videoList[videoIndexB].videoDescription"
            :fansCount="0"
            :thumbsupCount="videoList[videoIndexB].videoThumbsupCount"
            :commentCount="videoList[videoIndexB].videoCommentsCount"
            :starCount="0"
            :shareCount="0"
            :uploaderName="videoList[videoIndexB].videoUploader"
            :status="currentVideoIndex"
            :change="videoIndexB"
            :Reload="reloadB"
            :play="playB"
            /> 
        </div>
        <div class="video-comment" :style="{ transition: commentIsDragging ? 'none' : 'height 0.3s ease-in-out' }"
            style="touch-action: manipulation;">
            <div class="comment-board-head" @touchstart.prevent="handleCommentStart" @touchmove.prevent="handleCommentMove"
                @touchend="handleCommentEnd">
                <div class="touch-bar"></div>
                <span style="color:rgb(255, 255, 255);font-size:12px;">99 条评论</span>
            </div>
            <div class="comment-container">
                <div class="comment-content" style="touch-action: manipulation;">
                    <div style="height:15px">
                        <span style="float: left; font-size:13px; color:white;">热门评论</span>
                        <span style="float: right; font-size:10px;color:blanchedalmond"> 按热度</span>
                    </div>
                    <video-comment
                    />
                    <video-comment
                    />
                </div>
            </div>
            <div class="comment-input">
                <input id="input" placeholder="发一条友善的评论~"/>
                <img src="../../components/video/icon/emoji-smile.svg" />
                <img @click="sendMessage" src="../../components/video/icon/send.svg" />
            </div>
        </div>
        <div class="full-screen-mask" :class="{ active: isMaskActive }" @click="toggleComment"
            @touchmove="(event) => event.preventDefault()">
        </div>
        <div class="search-filter">
            <div class="seach-header">
                <img class="input-search-icon" src="../../components/video/icon/search.svg"/>
                <img @click="clearInput" class="input-clear-icon" src="../../components/video/icon/clear.svg"/>
                <input class="search-input"/>
                <span @click="cancelSearch" style="height:100%;line-height:40px;color: #c6c6c6; font-size:16px;font-weight:700;margin-left:15px;">
                取消
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import VideoComment from '@/components/video/VideoComment'
import ShortVideoPlayer from '@/components/video/ShortVideoPlayer.vue';
import request from '@/utils/request.js'
import Cookies from 'cookies-js'
export default {
    components: {
        ShortVideoPlayer,
        VideoComment
    },
    data() {
        return {
            videoList:[
            ],
            prefix : 'http://192.168.101.2:50000/api/video/download/',
            reloadA:false,
            reloadB:false,
            slidePosition: { y: 0 },
            isDragging: false,
            startY: 0,
            originalY: 0,
            loading: false,
            offsetA: 0,
            offsetB: 0,
            status: true, //false a  true b    
            transitionTimeA: 0.3,
            transitionTimeB: 0.3,
            commentBoardY: 0,
            commentBoardStartY: 0,
            commentIsDragging: false,
            isMaskActive: false,
            videoIndexA:0,
            videoIndexB:0,
            currentVideoIndex:0,
            up:true,
            down:false,
            playA:false,
            playB:false,
            loaded:false,

        };
    },
    async created() {
    
        await request.post("api/shortvideo/searchshortvideo")
  .then((response) => {
    this.videoList = response.data.row;
    console.log(this.videoList);
    // 在请求成功后再设置this.currentVideoIndex
    this.currentVideoIndex = parseInt(this.$route.query.index, 10);
    this.videoIndexA=this.currentVideoIndex;
    this.videoIndexB=this.currentVideoIndex;
    console.log(this.currentVideoIndex);
  })
  .catch((error) => {
    console.error(error);
  });

    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
        this.reloadA=!this.reloadA;
        this.reloadB=!this.reloadB;
        setTimeout(()=>{
            this.loaded=true;
            console.log("yes");
        },500);
        const slide=document.querySelector(".slide-container");     
        slide.style.left="0px";
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        sendMessage(){
            const input=document.querySelector("#input");
            console.log(input.value);
            console.log(this.videoList[this.currentVideoIndex]);
            const comment={
                video_id:this.videoList[this.currentVideoIndex].videoId,
                text:input.value,
                poster:Cookies.get("username"),
                created_date:new Date().toISOString().slice(0, 19).replace('T', ' '),
                parent_comment_id:0,
                like_count:0,
                dislike_count:0
            }
            console.log(comment);
            input.value="";
            request.post("/api/videocomment/insert/",comment)
            .then((response)=>{
                console.log(response.data);
            })
            .catch((error)=>{
                console.log(error);
            });
        },
        clearInput(){
            const input=document.querySelector(".search-input");
            input.value="";

        },
        search(){
            const searchFilter=document.querySelector(".search-filter");
            searchFilter.classList.add("active");
        },
        cancelSearch(){
        const searchFilter=document.querySelector(".search-filter");
        searchFilter.classList.remove("active");
        },
        back() {
            this.$router.go(-1);
        },
        handleTouchStart(event) {
            this.isDragging = true;
            this.startY = event.touches[0].clientY;
            this.originalY = this.slidePosition.y;
        },
        handleTouchMove(event) {
            console.log("a,b=",this.videoIndexA,this.videoIndexB)
            event.preventDefault();
            if (this.isDragging) {
                const deltaY = event.touches[0].clientY - this.startY;
                if (deltaY < 0) {
                    if (this.load(this.down)) {
                        if (this.status === false) { // a上b下
                            console.log("1a上b下");
                            const slideB = document.querySelector(".slide-b");
                            this.offsetA = 0;
                            this.offsetB = slideB.clientHeight;
                            this.videoIndexB=this.currentVideoIndex+1;
                        }
                        else if (this.status === true) { //a下b上
                            console.log("2a下b上");
                            const slideA = document.querySelector(".slide-a");
                            this.offsetB = 0;
                            this.offsetA = slideA.clientHeight;
                            this.videoIndexA=this.currentVideoIndex+1;
                        }
                    }
                    else {
                        this.slidePosition.y = this.originalY + deltaY / 3;
                        return
                    }
                }
                else {
                    if (this.load(this.up)) {
                        if (this.status === false) { // a上b下 a b
                            console.log("3a下b上");
                            const slideB = document.querySelector(".slide-b");
                            this.offsetA = 0;
                            this.offsetB = -slideB.clientHeight;
                            this.videoIndexB=this.currentVideoIndex-1;
                        }
                        else if (this.status === true) { //a下b上
                            console.log("4a上b下");
                            const slideA = document.querySelector(".slide-a");
                            this.offsetB = 0;
                            this.offsetA = -slideA.clientHeight;
                            this.videoIndexA=this.currentVideoIndex-1;
                        }
                    }
                    else {
                        this.slidePosition.y = this.originalY + deltaY / 4;
                        return
                    }
                }
                if (this.loading) {
                    this.slidePosition.y = this.originalY + deltaY / 4;
                }
                else {
                    this.slidePosition.y = this.originalY + deltaY;
                }
                this.reloadA=true;
                this.reloadB=true;
            }
        },
        handleTouchEnd() {
            this.reloadA=false;
            this.reloadB=false;
            if (this.isDragging) {
                if (!this.loading && this.slidePosition.y < -this.$el.clientHeight * 0.4) {
                    //向下移动 b
                    if (this.status) { 
                        this.offsetA = 0;
                        this.slidePosition.y = 0;
                        this.offsetB = -this.$el.clientHeight;
                        this.transitionTimeB = 0.2;
                        this.transitionTimeA = 0.2;
                        this.currentVideoIndex=this.currentVideoIndex+1;
                    }//a
                    else {
                        this.offsetB = 0;
                        this.slidePosition.y = 0;
                        this.offsetA = -this.$el.clientHeight;
                        this.transitionTimeA = 0.2;
                        this.transitionTimeB = 0.2;
                        this.currentVideoIndex=this.currentVideoIndex+1;
                    }
                    this.status = !this.status;
                } else if (!this.loading && this.slidePosition.y > this.$el.clientHeight * 0.4) {
                    //b a
                    console.log(this.status);
                    if (this.status) {  
                        this.offsetA = 0;
                        this.slidePosition.y = 0;
                        this.offsetB = this.$el.clientHeight;
                        this.transitionTimeB = 0.2;
                        this.transitionTimeA = 0.2;
                        this.currentVideoIndex=this.currentVideoIndex-1;
                        this.status=false;
                    }
                    //a
                    else {
                        this.offsetB = 0;
                        this.slidePosition.y = 0;
                        this.offsetA = this.$el.clientHeight;
                        this.transitionTimeA = 0.2;
                        this.transitionTimeB = 0.2;
                        this.currentVideoIndex=this.currentVideoIndex-1;
                        this.status=true;

                    }
                } else {
                    this.transitionTimeA = 0.3;
                    this.transitionTimeB = 0.3;
                    this.slidePosition.y = this.originalY;
                }
                this.isDragging = false;
                if(this.status){
                    this.playB=!this.playB;
                }
                else{
                    this.playA=!this.playA;
                }
            }
        },
        handleSlideBTransitionEnd() {
            const slideB = document.querySelector(".slide-b");
            slideB.style.display = "none";
        },
        handleSlideATransitionEnd() {
            const slideA = document.querySelector(".slide-b");
            slideA.style.display = "none";
        },
        scrollUp() {

        },
        scrollDown() {

        }
        ,
        load(direction) {
            if(direction===this.up&&this.currentVideoIndex===0){
                return false
            }
            else if(direction===this.down&&this.currentVideoIndex===(this.videoList.length-1)){
                return false;
            }
            else{
                return true;
            }
        },
        handleCommentStart(event) {
            this.commentIsDragging = true;
            this.commentBoardStartY = event.touches[0].clientY;
        },
        handleCommentMove(event) {
            const deltaY = event.touches[0].clientY - this.commentBoardStartY;
            if (deltaY > 0 && this.commentIsDragging) {
                const commentBoard = document.querySelector(".video-comment");
                commentBoard.style.height = (document.body.clientHeight*0.6) - deltaY + "px";
            }
        },
        handleCommentEnd(event) {
            this.commentIsDragging = false;
            const endY = event.changedTouches[0].clientY;
            const deltaY = endY - this.commentBoardStartY;
            const commentBoard = document.querySelector(".video-comment");
            if (deltaY > 200) {
                commentBoard.style.height = "0px";
                this.isMaskActive = false;
            }
            else {
                commentBoard.style.height = (document.body.clientHeight*0.6) + "px";
            }
        }
        ,
        toggleComment() {
            this.commentIsDragging = false;
            const commentBoard = document.querySelector(".video-comment");
            commentBoard.style.height = this.isMaskActive ? 0 : document.body.clientHeight*0.6 + "px";
            this.isMaskActive = !this.isMaskActive;
        },
    },
};
</script>

<style scoped>
.input-clear-icon{
    position: absolute;
    width: 25px;
    top:50%;
    transform: translateY(-50%);
    right: 90px;
}
.input-search-icon{
    position: absolute;
    height: 22px;
    top:50%;
    transform: translateY(-50%);
    left: 10px;
}
.search-header{
    height: 40px;
}
.search-input{
    height: 40px;
    width: calc(100% - 155px);
    border-radius: 20px;
    padding: 0 30px 0 40px;
    margin: 0;
    font-size: 17px !important;
    background-color: rgb(37,37, 37);
    border: 0;
    color: white;
}
.seach-header{
    position: relative;
}
.search-input:focus{
    outline: none;
}
.search-filter.active{
    display: block;
}
.search-filter {
    position: fixed;
    background-color: #000000b5;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    padding: 8px 16px;
    display: none;
}
.head-section span{
    color: white;
    display: block;
    text-align: center;
    font-size: 11px;
}
body {
    touch-action: none;
}

.comment-content {
    width: calc(100% - 30px);
    margin: 0 15px;
}

.comment-container {
    height: calc(100% - 84px);
    width: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
}
.touch-bar{
    height:5px;
    width:60px;
    border-radius:3.5px;
    background-color:white;
    margin:5px 0;
}
.comment-input input{
    height:40px;
    width:calc(100% - 120px);
    border-radius:20px;
    background-color:rgb(46, 46, 46);
    border:0px;
    color:white;
    padding:0 10px;
}
.comment-input input:focus{
    outline:none;
}
.comment-input img{
    height:30px;
    width:30px;
    margin-left:10px;
}
.comment-input{
    height:50px;
    width:100%;
    background-color:rgb(27, 27, 27);
    display:flex;
    align-items:center;
    justify-content:center;
}
.comment-board-head {
    height: 34px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction:column;
}

.full-screen-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 998;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease-in-out;
}

.full-screen-mask.active {
    opacity: 1;
    pointer-events: auto;
}

.video-comment {
    width: 100%;
    position: fixed;
    background-color: rgb(27, 27, 27);
    left: 0px;
    bottom: 0px;
    z-index: 999;
    overflow: scroll;
    height: 0px;
    border-radius: 10px 10px 0 0;
}

.slide-container {
    position: relative;
    width: 100%;
    height: 100vh;
    position: relative;
    left: -100%;
    transition: left 0.3s ease-in-out;
}

.slide-a {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #282828;
    color: white;
}

.slide-b {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #383838;
    color: white;
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
}</style>
