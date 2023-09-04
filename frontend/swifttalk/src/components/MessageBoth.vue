<template>
    <div>
        <div v-if="!isMine" class="message">
            <img class="avatar" :src="avatar" alt="Avatar" />
            <div class="message-content">
                <div class="message-head">
                    <div class="level">Lv{{ level }}</div>
                    <span class="name" style="display: inline-block;">{{ name }}</span>
                </div>
                <div class="message-text">
                    {{ message }}
                </div>
            </div>
        </div>
        <div v-if="isMine" class="message-right">
            <img class="avatar" style="float: right;margin-right:10px" :src="avatar" alt="Avatar" />
            <div class="message-content" style="float: right;margin-right:10px">
                <div class="message-head" style="float: right;">
                    <div class="level">Lv{{ level }}</div>
                    <span class="name" style="display: inline-block;">{{ name }}</span>
                </div>
                
                <div style="float: right;width:100%">
                    <div class="message-text" style="float: right;">
                        {{ message }}
                    </div>
                </div>
            </div>
            <div style="clear: both;"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "MessageBoth",
    props: {
        message: String, // 声明一个叫做 message 的属性，类型为字符串
        avatar: String,
        name: String,
        isMine: Boolean,
        level: Number,
        title: String,
    }
}
</script>

<style>
.message-right {
    padding-top: 5px;
    margin-right: 10px;
    width: 100%;
}

.message-text {
    margin-top: 10px;
    margin-left: 10px;
    background-color: aliceblue;
    border-radius: 10px;
    padding: 10px;
    max-width: 100%;
    /* 移除或设置为 none */
    display: inline-block;
}

.name {
    font-size: 14px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    margin-left: 5PX;
}

.message-head {
    margin-left: 10px;
}

.level {
    display: inline-block;
    background-color: rgb(5, 157, 48);
    border-radius: 5px;
    font-size: 12px;
    font-style: italic;
    padding: 0 5px;
    color: white;
}

.message {
    padding-top: 5px;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50px;
}

.message-content {
    display: inline-block;
    width: 70%;
}
</style>