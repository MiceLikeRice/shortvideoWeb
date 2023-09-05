<template>
    <div class="comment-box">
        <div class="comment-avatar">
            <div class="avatar">
                <img :src="thisPoster.user_avatar_path" alt="">
            </div>
        </div>
        <div class="comment-content">
            <div class="info">
                <div class="username">
                    <span>{{ this.thisComment.poster }}</span>
                </div>
                <div class="message-info">
                    <span>{{ this.thisComment.createdDate }}</span>
                </div>
            </div>
            <div class="comment-message">
                <span>
                    {{ this.thisComment.text }}
                </span>
            </div>
            <div class="buttons" @click="toggleButtons">
                <div class="praise">
                    <img src="./icon/thumbsup.svg" alt="">
                    <span>{{ this.thisComment.likeCount }}</span>
                </div>
                <img src="./icon/thumbsdown.svg" alt="">
                <img src="./icon/chat.svg" alt="">
                <img src="./icon/more-vertical.svg" style="margin-left: auto;margin-right:10px;">
            </div>
            <div class="replay" v-if="subComments&&subComments.length!==0">
                <div v-for="comment in subComments" :key="comment.comment_id" @click="reply">
                    <span>
                        <span style="font-size:14px;font-weight:bold;color: rgba(0, 149, 255, 0.742);">
                            {{ comment.poster }}:</span>
                        {{ comment.text }}
                    </span>
                </div>
            </div>
        </div>
        <div style="clear: both;"></div>
        <div class="function-board hidden">
            <div class="touch-bar" @click="toggleButtons"> </div>
            <div class="button" @click="toggleReplay">
                回复
            </div>
            <div class="button">
                赞
            </div>
            <div class="button">
                踩
            </div>
            <div class="button">
                举报
            </div>
        </div>
        <div class="replay-board hidden">
            <textarea/>
            <div>
                <button class="cancel" @click="toggleReplay">取消</button>
                <button class="reply" @click="reply">回复</button>
            </div>
        </div>
        <div class="comment-filter hidden" @click="toggleButtons"></div>
    </div>
</template> 

<script>
import request from '@/utils/request';
import Cookies from "cookies-js"
export default {
    props:{
        thisComment: {},
    },
    data() {
        return {
            thisPoster:{
                username:"王志安",
                user_avatar_path: "titleicon.png",
                user_level:1,
            },
            subComments: [],
        }
    },
    mounted(){
        request.post("api/videocomment/search",{
                    comment_id:this.thisComment.commentId
                })
                .then((response)=>{
                    this.subComments=response.data.row;
                    console.log(this.subComments);
                })
                .catch((err)=>{
                    console.log(err);
            })
    },
    methods: {
        toggleReplay(){
            this.toggleButtons()
            const functionBoard=this.$el.querySelector(".replay-board");
            functionBoard.classList.toggle("hidden");
        },
        toggleButtons(){
            const functionBoard=this.$el.querySelector(".function-board");
            functionBoard.classList.toggle("hidden");
            const filter=this.$el.querySelector(".comment-filter");
            filter.classList.toggle("hidden");
        },
        reply() {  
            if(Cookies.get("username")===undefined){
                alert("请先登录");
                return;
            }
            const input=this.$el.querySelector(".replay-board textarea");
            console.log(input.value);
            const comment={
                video_id:this.thisComment.videoId,
                text:input.value,
                poster:Cookies.get("username"),
                created_date:new Date().toISOString().slice(0, 19).replace('T', ' '),
                parent_comment_id:this.thisComment.commentId,
                like_count:0,
                dislike_count:0
            }
            console.log(comment);
            input.value="";
            request.post("/api/videocomment/insert/",comment)
            .then((response)=>{
                console.log(response.data);
                this.subComments.push(comment);
            })
            .catch((error)=>{
                console.log(error);
            });
            this.toggleReplay()
        }
    }
}
</script>

<style scoped>
.comment-filter.hidden{
    display: none;
}
.comment-filter{
    position:fixed;
    height:100%;
    width:100%;
    background-color:rgba(37, 37, 37, 0.132);
    top:0px;
    left:0px;
    z-index: 1;
}
.cancel{
    color: black;
    background-color:rgb(211, 211, 211) ;
    border-radius: 10px;
    border: 0;
    align-self: self-end;
    height: 26px;
    padding: 0 10px;
}
.reply{
    color: black;
    background-color: rgb(232, 127, 0);
    border-radius: 10px;
    border: 0;
    align-self: self-end;
    height: 26px;
    padding:0 10px ;
    margin-left: 20px;

}
.replay-board textarea:focus{
    outline: none;
}

.replay-board textarea{
    height: 60%;
    width: 90%;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    background-color: rgb(86, 86, 86);
    resize: none;
    padding: 5px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.replay-board.hidden{
    display: none;
}
.replay-board{
    position: fixed;
    width: 70%;
    height: 170px;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) !important;
    background-color: rgb(43, 43, 43);
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 15px;
    z-index: 20;
}
.button{
    display: none;
}
.button{
    height: 56px;
    color: aliceblue;
    display: flex;
    align-items: center;
    padding-left: 20px;
}


.function-board.hidden{
    height:0;
    transition: height 0.3s ease-in-out;
}
.function-board{
    height: 250px;
    background-color: black;
    width: 90%;
    position: fixed;
    bottom: 25px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 12px;
    transition: height 0.3s ease-in-out;
    overflow: hidden;
    z-index: 10;
}
.touch-bar{
    height: 5px;
    width: 50px;
    margin: 10px auto;
    background-color: aliceblue;
    border-radius: 2.5px;
}
.praise {
    display: flex;
    justify-content: center;
    align-items: center;
}

.praise img {
    margin: 0px;
    height: 18px;
    width: 18px;
}

.replay {
    background-color: rgb(14, 14, 14);
    padding: 10px;
    border-radius: 10px;
    width: calc(100% - 20px);
}

.buttons>img {
    height: 18px;
    width: 18px;
    margin: 5px 0px 0 18px;
}

.buttons {
    display: flex;
    height: 30px;
    width: 100%;
}

.comment-content {
    width: calc(100% - 50px);
    float: right;
}

.info {
    height: 45px;
    width: 100%;
    margin-top: 5px;
}

.message-info {
    width: 100%;
    height: 20px;
    display: block;
    white-space: nowrap;
}

.message-info span {
    font-size: 10px;
    display: block;
    color: rgb(160, 160, 160);
}

.username {
    width: 100%;
    height: 20px;
    display: block;
    white-space: nowrap;
}

.username span {
    font-size: 12px;
    display: block;
    color: rgb(195, 195, 195);

}

* {
    color: aliceblue;
}

.avatar {
    float: left;
    margin: 5px 0;
}

.avatar img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
}

.comment-box {
    min-height: 10px;
    width: 100%;
    display: block;
    margin: 10px 0;
    border-bottom: 1px solid white;
    padding-bottom: 10px;
}
</style>