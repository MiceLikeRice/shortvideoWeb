<template>
    <div class="toolbar">
        <div v-if="this.toolbar" class="toolbar-github">
            <img src="../assets/icon/github.svg" alt="github"/>
        </div>
        <div v-if="this.toolbar" class="toolbar-music">
            <img src="../assets/icon/headphones.svg" alt="music"/>
        </div>
        <div class="toolbar-more">
            <img @click="moreHandler" src="../assets/icon/more-vertical.svg" alt="more"/>
        </div>
    </div>
</template>

<script>
export default{
    name:"ToolBar",
    data(){
        return{
            toolbar:false,
        }
    },
    methods:{
        moreHandler(){
            this.toolbar=!this.toolbar;
        }
    }
}
</script>
<style>
.toolbar{
    width: 40px;
    height:auto;
    background-color: none;
    position: fixed;
    right: 25px;
    bottom: 150px;
    z-index: 999998;
    border-radius: 10px;
    background-color: #91C8E4;
}
.toolbar>div{
    width: 32px;
    height: 32px;
    margin: 5px auto;
    display: flex;
    justify-content: center;
    background-color:#D0F5BE;
    border-radius: 5px;
    position: relative; /* 添加相对定位 */
    cursor: pointer; /* 添加鼠标指针样式 */
    transition: filter 0.3s ease-in-out; /* 添加过渡效果到所有子元素 */
}
.toolbar>div:hover{
    filter: brightness(1.5); /* 鼠标悬停时修改亮度，增加颜色饱和度 */
}

.toolbar>div:hover::after{
    position: absolute; /* 绝对定位 */
    left:-100%; /* 定位在父元素底部 */
    top: 50%; /* 垂直居中 */
    transform: translateX(-50%) translateY(-50%);; /* 水平居中调整 */
    background-color: rgba(0, 0, 0, 0.8); /* 背景颜色 */
    color: white; /* 文字颜色 */
    padding: 5px; /* 内边距 */
    border-radius: 5px;
    font-size: 14px; /* 文字大小 */
    white-space: nowrap; /* 不换行 */
    z-index: 1; /* 提高层级，确保在顶部显示 */
    opacity: 1; /* 设置透明度，确保可见 */
}
.toolbar-github:hover::after{
    content: "github";
}
.toolbar-music:hover::after{
    content: "music";
}
.toolbar-more:hover::after{
    content:"more";
}

</style>