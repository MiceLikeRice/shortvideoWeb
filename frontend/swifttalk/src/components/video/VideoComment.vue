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
                    <span>{{ this.thisComment.created_date }}</span>
                </div>
            </div>
            <div class="comment-message">
                <span>
                    {{ this.thisComment.text }}
                </span>
            </div>
            <div class="buttons">
                <div class="praise">
                    <img src="./icon/thumbsup.svg" alt="">
                    <span>{{ this.thisComment.like_count }}</span>
                </div>
                <img src="./icon/thumbsdown.svg" alt="">
                <img @click="replay()" src="./icon/chat.svg" alt="">
            </div>
            <div class="replay">
                <div v-for="comment in subComments" :key="comment.comment_id" @click="replay">
                    <span>
                        <span style="font-size:14px;font-weight:bold;color: rgba(0, 149, 255, 0.742);">
                            {{ comment.poster }}:</span>
                        {{ comment.text }}
                    </span>
                </div>
            </div>
        </div>
        <div style="clear: both;"></div>
    </div>
</template> 

<script>
export default {
    data() {
        return {
            thisComment: {
                comment_id: 1,
                text: "而如果要阻止touchmove的默认行为，添加{passive: false}，",
                poster: "小王",
                video_id: 212,
                created_date: "1天前",
                parent_comment_id: 12,
                like_count: 1,
                dislike_count: 1,
            },
            thisPoster:{
                username:"王志安",
                user_avatar_path: "titleicon.png",
                user_level:1,
            },
            subComments: [{
                comment_id: 1,
                text: "而如果要阻止touchmove的默认行为，添加{passive: false}，",
                poster: "小王",
                video_id: 212,
                created_date: 1,
                parent_comment_id: 12,
                like_count: 1,
                dislike_count: 1,
            },
            {
                comment_id: 2,
                text: "而如果要阻止touchmove的默认行为，添加{passive: false}，",
                poster: "小王",
                video_id: 212,
                created_date: 1,
                parent_comment_id: 12,
                like_count: 1,
                dislike_count: 1,
            },
            {
                comment_id: 3,
                text: "而如果要阻止touchmove的默认行为，添加{passive: false}，",
                poster: "小王",
                video_id: 212,
                created_date: 1,
                parent_comment_id: 12,
                like_count: 1,
                dislike_count: 1,
            },
            ],
        }
    },
    methods: {
        replay() {

        }
    }
}
</script>

<style scoped>
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