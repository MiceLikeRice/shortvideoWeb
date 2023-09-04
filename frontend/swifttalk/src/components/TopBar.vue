<template>
    <div>
        <div class="topbar">
            <div class="topbar-left">
                <div class="menu">
                    <div class="arrow-container">
                        <img src="../assets/icon/arrow-left.svg" alt="left" @click="menuHandler" class="arrow-left">
                    </div>
                </div>
                <img src="../assets/icon/menu.svg" class="menu-icon" @click="menuHandler" alt="menu" />
                <div style="display: flex; algin-items:center;">
                    <input type="text" class="search-input" placeholder="输入查询" />
                    <img class="search-icon"  src="../assets/icon/search.svg" />
                </div>
            </div>
            <div class="topbar-middle" style="color: aliceblue;">
                去码头整点儿薯条
            </div>
            <div class="topbar-right">
                <img class="nav-right" @click="navRight" src="../assets/icon/nav-right.svg" alt="nav">
            </div>
        </div>
        <div class="nav-right-board hiden" id="nav-right-board">
            <div><a href="/chat">私人聊天</a></div>
            <div><a>个人博客</a></div>
            <div><a>其他</a></div>
        </div>
    </div>
</template>
<script>
export default {
    name: "TopBar",
    data() {
        return {
            lastScrollPosition: 0,
        }
    },
    mounted() {
        window.addEventListener("scroll", this.topbarHandler);
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.topbarHandler);
    },
    methods: {
        topbarHandler() {
            const currentScrollPosition = window.scrollY;
            const topbar = document.querySelector(".topbar");
            if ((currentScrollPosition > this.lastScrollPosition)&&window.scrollY>60) {
                console.log("向下滑动");
                topbar.classList.add("hiden");
            } else {
                topbar.classList.remove("hiden");
            }
            this.lastScrollPosition = currentScrollPosition;
        },
        menuHandler() {
            const menu = document.querySelector(".menu");
            menu.classList.toggle("manifest");
            const arrow = document.querySelector(".arrow-left");
            arrow.classList.toggle("rotate");
        },
        navRight() {
            const nav = document.querySelector(".nav-right-board");
            nav.classList.toggle("hiden");
            const navimg=document.querySelector(".topbar-right>img");
            navimg.classList.toggle("active");
        }
    }
}
</script>

<style>
@media (max-width:790px) {
    .topbar-middle{
        display: none;
    }
}
.topbar-middle{
    position: absolute;
    left: calc(50%);
    transform: translateX(-50%);
    font-size: 20px;
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Noto Sans CJK SC,WenQuanYi Micro Hei,Arial,sans-serif;
}
#nav-right-board{

}
#nav-right-board > div{
    height: 40px;
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fdfdfd;
}
.loading {
    animation: rotate 2s linear infinite;
}

@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.nav-right-board {
    position: fixed;
    width: 200px;
    background-color: antiquewhite;
    top: 61px;
    right: 0px;
    z-index: 3;
    transition: top 0.3s ease-in-out;
    border-radius: 0 0 0 10px;
}

.nav-right-board.hiden {
    top: -305px;
    transition: top 0.3s ease-in-out;
}

.topbar-left {
    float: left;
    height: 40px;
    display: flex;
    align-items: center;
}

.topbar-right {
    float: right;
    margin-left: auto;
    margin-right: 20px;
}
.topbar-right>img{
    transition: filter 0.3s ease-in-out;
}
.topbar-right>img.active{
    filter:brightness(1.5);
}
.nav-right {
    width: 35px;
    height: 35px;
}

.arrow-container {
    height: 40px;
    width: 100%;
    display: flex;
    float: right;
    justify-content: flex-end;
    position: relative;
}

.arrow-left {
    padding-right: 10px;
    transition: transform 0.3s ease-in-out;
    transform: rotate(-90deg);
}

.arrow-left.rotate {
    transform: rotate(0deg);
}

.menu {
    height: 100vh;
    width: 300px;
    background-color: rgb(255, 255, 255);
    position: fixed;
    left: -300px;
    top: 0px;
    transition: left 0.3s ease-in-out;
    z-index: 3;

}

.menu.manifest {
    left: 0px;
    transition: left 0.3s ease-in-out;
}

@media (max-width:390px) {}

.search-icon {
    margin-left: 10px;
}

.search-input {
    margin-left: 30px;
    height: 35px;
    width: 170px;
    border-radius: 19px;
    position: relative;
    border: 0px;
    padding: 0 10px;
    border: 1px solid gray;
}

.search-input:focus {
    outline: none;
}

.topbar:hover .search-input::after {
    content: "Test";
    position: absolute;
    /* 绝对定位 */
    top: 100px;
    /* 定位在输入框下方 */
    left: 0;
    background-color: #f0f0f0;
    padding: 5px;
    border: 1px solid #030303;
    border-top: none;
    width: auto;
    height: 100px;
    box-sizing: border-box;
    z-index: 999;
    overflow: auto
        /* 提示显示在上方 */
}

.menu-icon {
    float: left;
}

.topbar {
    height: 60px;
    width: 100vw;
    background-color:#222222;
    position: fixed;
    top: 0;
    transition: top 0.1s ease-in-out;
    display: flex;
    align-items: center;
    padding-left: 10px;
    min-width: 300px;
    z-index: 100;
    box-shadow:1px 1px 5px rgba(86, 75, 75, 0.625);
}

.topbar.hiden {
    top: -60px;
    transition: top 0.2s ease-in-out;
}
</style>