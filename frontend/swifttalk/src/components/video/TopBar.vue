<template>
    <div class="top-bar">
        <nav>
            <div class="top-nav" style="position: relative;">
                <div @click="activeLeftMenu" class="left-icons">
                    <img class="menu" src="./icon/list.svg" />
                </div>
                <div class="center-icon" style="position: absolute;left:50%;transform:translateX(-50%)">
                    <img class="top-icon" src="./icon/TopBarIcon.svg" />
                </div>
                <div class="right-icons">
                    <img @click="search" src="./icon/search.svg" />
                    <img @click="activeRightMenu" class="user" src="./icon/user.svg" />
                </div>
            </div>
        </nav>
        <aside class="left-menu">
            <div id="top-menu-section">
                <img class="top-icon" src="./icon/TopBarIcon.svg" alt="">
                <img @click="closeLeftMenu" class="close" src="./icon/close.svg" alt="">
            </div>
            <div id="menu-wrapper">
                <div>
                    <div class="menu-link">
                        <i>
                            <img src="./icon/camera.svg">
                        </i>
                        <span style="margin-left: 10px;">学习资料</span>
                        <i style="margin-left: auto;margin-right:10px; height:100%" @click="showResource">
                            <img class="arrow " src="./icon/down.svg" />
                        </i>
                    </div>
                    <div class="child-menu-container">
                        <div class="child-menu">
                            <img src="./icon/globe.svg" alt="">
                            <span style="margin-left: 15px; font-size:10px">语言</span>
                        </div>
                        <div class="child-menu">
                            <img src="./icon/globe.svg" alt="">
                            <span style="margin-left: 15px; font-size:10px">语言</span>
                        </div>
                        <div class="child-menu">
                            <img src="./icon/globe.svg" alt="">
                            <span style="margin-left: 15px; font-size:10px">语言</span>
                        </div>
                    </div>
                </div>
                <div class="menu-link"></div>
                <div class="menu-link"></div>
                <div class="menu-link"></div>
                <div class="menu-link"></div>
                <div class="menu-link"></div>
                <div class="menu-link"></div>
                <div class="menu-link"></div>
                <div class="menu-link"></div>
            </div>
        </aside>

        <aside class="right-menu">
            <div id="right-top-menu-section">
                <img @click="closeRightMenu" class="close" src="./icon/close.svg" alt="">
                <img class="top-icon" src="./icon/TopBarIcon.svg" alt="">
            </div>
            <div id="menu-wrapper">
                <div v-if="!this.$store.state.user" class="head-section">
                    <div @click="gotoUpload">
                        <div><img src="./icon/upload.svg" alt=""></div>
                        <span>上传</span>
                    </div>
                    <div @click="()=>this.$router.push('/login')">
                        <div><img src="./icon/login.svg" alt=""></div>
                        <span>登录</span>
                    </div>
                    <div @click="()=>this.$router.push('/logup')">
                        <div><img src="./icon/logup.svg" alt=""></div>
                        <span>注册</span>
                    </div>
                </div>
                <div v-if="this.$store.state.user" class="head-section-login">
                    <div class="my-avtar">
                        <img 
                        :src="this.$store.state.user.avatarPath?
                        this.$store.state.user.avatarPath:
                        'default_avatar.jpeg'" 
                        alt="avatar"/>
                        <span>{{ this.$store.state.user.username }}</span>
                        <div>
                            <div>
                                <span>1</span>
                                <span>粉丝</span>
                            </div>
                            <div class="vertical-line"></div>
                            <div>
                                <span>5</span>
                                <span>关注</span>
                            </div>
                            <div class="vertical-line"></div>
                            <div>
                                <span>40</span>
                                <span>获赞</span>
                            </div>
                        </div>
                    </div>
                    <div class="function">
                        <div @click="gotoUpload">
                            <div><img src="./icon/upload.svg" alt=""></div>
                            <span>上传</span>
                        </div>
                        <div>
                            <div><img src="./icon/favour.svg" alt=""></div>
                            <span>收藏</span>
                        </div>
                        <div>
                            <div><img src="./icon/edit.svg" alt=""></div>
                            <span>编辑</span>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="menu-link">
                        <i>
                            <img src="./icon/camera.svg">
                        </i>
                        <span style="margin-left: 10px;">学习资料</span>
                        <i style="margin-left: auto;margin-right:10px; height:100%" @click="showResource">
                            <img class="arrow " src="./icon/down.svg" />
                        </i>
                    </div>
                    <div class="child-menu-container">
                        <div class="child-menu">
                            <img src="./icon/globe.svg" alt="">
                            <span style="margin-left: 15px; font-size:10px">语言</span>
                        </div>
                        <div class="child-menu">
                            <img src="./icon/globe.svg" alt="">
                            <span style="margin-left: 15px; font-size:10px">语言</span>
                        </div>
                        <div class="child-menu">
                            <img src="./icon/globe.svg" alt="">
                            <span style="margin-left: 15px; font-size:10px">语言</span>
                        </div>
                    </div>
                </div>
                <div class="menu-link"></div>
                <div class="menu-link"></div>
                <div class="menu-link"></div>
            </div>
        </aside>
        <div class="back-banned" @click="() => { closeLeftMenu(); closeRightMenu(); }"></div>
        <div class="search-filter">
            <div class="seach-header">
                <img class="input-search-icon" src="./icon/search.svg" />
                <img @click="clearInput" class="input-clear-icon" src="./icon/clear.svg" />

                <input class="search-input" />
                <span @click="cancelSearch"
                    style="height:100%;line-height:40px;color: #c6c6c6; font-size:16px;font-weight:700;margin-left:15px;">
                    取消
                </span>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data(){
        return{
            choosed:true
        }
    },
    methods: {
        gotoUpload(){
            this.$router.push("/upload");
        },
        clearInput() {
            const input = document.querySelector(".search-input");
            input.value = "";
        },
        cancelSearch() {
            const searchFilter = document.querySelector(".search-filter");
            searchFilter.classList.remove("active");
        },
        search() {
            const searchFilter = document.querySelector(".search-filter");
            searchFilter.classList.add("active");
        },
        closeRightMenu() {
            const menu = document.querySelector(".right-menu");
            menu.classList.remove("active");
            this.backRefine();
        },
        activeRightMenu() {
            const menu = document.querySelector(".right-menu");
            menu.classList.add("active");
            this.backBanned();
        },
        closeLeftMenu() {
            const menu = document.querySelector(".left-menu");
            menu.classList.remove("active");
            this.backRefine();
        },
        activeLeftMenu() {
            const menu = document.querySelector(".left-menu");
            menu.classList.add("active");
            this.backBanned();
        },
        backBanned() {
            const back = document.querySelector(".back-banned");
            back.style.display = "block";
        },
        backRefine() {
            const back = document.querySelector(".back-banned");
            back.style.display = "none";
        },
        showResource(event) {
            const ml = document.querySelectorAll(".menu-link")[0];
            const mlMore = ml.nextElementSibling;
            mlMore.classList.toggle("active");
            ml.classList.toggle("active");
            const arraw = event.target;
            arraw.classList.toggle("rotate");
        }
    }
}
</script>

<style>
.function span {
    color: white;
    display: block;
    text-align: center;
    font-size: 11px;
}

.function>div>div>img {
    height: 60%;
    width: 60%;
}

.function>div>div {
    height: 60px;
    width: 60px;
    background-color: rgb(21, 21, 21);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}

.function {
    display: flex;
    justify-content: space-around;
}

.my-avtar{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
.vertical-line{
    height: 50%;
    width: 1px;
    background-color: aliceblue;
}
.my-avtar>div>div> span:nth-of-type(1){
    display: block;
    font-size: small;
}
.my-avtar>div>div> span:nth-of-type(2){
    display: block;
    font-size: xx-small;
}
.my-avtar>div>div{
    margin: 15px;
    text-align: center;
}
.my-avtar>div{
    color: white;
    display: flex;
    height: 60px;
    align-items: center;
    justify-content: center;
}
.my-avtar span{
    color: #ccc;
    font-size: larger;
    font-weight: bolder;
}
.my-avtar img{
    height:60px;
    width: 60px;
    border-radius: 50%;
    margin: 10px 0;
}
.head-section-login{

}



.video-info-input {
    width: calc(100% - 10px);
    height: 120px;
    padding: 5px 0;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
}

.upload-board.cancel {
    right: -100%;
    transition: right 0.3s ease-in-out;
}

.upload-board {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: black;
    z-index: 1000;
    top: 0px;
    right: 0px;
    transition: right 0.3s ease-in-out;
    overflow: hidden;
}

.center-icon {
    display: flex;
    justify-content: center;
    align-items: center;
}

.left-icons {
    display: flex;
    align-items: center;
    justify-content: center;
}

.input-clear-icon {
    position: absolute;
    width: 25px;
    top: 50%;
    transform: translateY(-50%);
    right: 90px;
}

.input-search-icon {
    position: absolute;
    height: 22px;
    top: 50%;
    transform: translateY(-50%);
    left: 10px;
}

.search-header {
    height: 40px;
}

.search-input {
    height: 40px;
    width: calc(100% - 155px);
    border-radius: 20px;
    padding: 0 30px 0 40px;
    margin: 0;
    font-size: 17px !important;
    background-color: rgb(37, 37, 37);
    border: 0;
    color: white;
}

.seach-header {
    position: relative;
}

.search-input:focus {
    outline: none;
}

.search-filter.active {
    display: block;
}

.search-filter {
    position: fixed;
    background-color: #000000b5;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    padding: 8px 16px;
    display: none;
}

.head-section span {
    color: white;
    display: block;
    text-align: center;
    font-size: 11px;
}

.head-section>div {}

.head-section>div>div {
    height: 60px;
    width: 60px;
    background-color: rgb(21, 21, 21);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}

.head-section {
    display: flex;
    padding-top: 20px;
    justify-content: space-around;
    margin-bottom: 20px;
}

.right-icons img:nth-of-type(1) {
    height: 24px;
    margin-right: 10px;
}

.right-icons img:nth-of-type(2) {
    height: 28px;
    margin-top: 3px;
}

.arrow {
    transform: rotate(0deg);
    transition: transform 0.3s ease-in-out;
}

.arrow.rotate {
    transform: rotate(180deg);
    transition: transform 0.3s ease-in-out;
}

.child-menu {
    height: 52px;
    margin-left: 40px;
    display: flex;
    align-items: center;
    color: #c6c6c6;
}

.child-menu-container.active {
    height: 160px;
    transition: height 0.3s ease-in-out;
}

.menu-link.active {
    border-radius: 10px 10px 0 0;
    background-color: rgb(47, 47, 47);
}

.child-menu-container {
    width: 100%;
    border-radius: 0 0 10px 10px;
    background-color: rgb(21, 21, 21);
    overflow: hidden;
    height: 0px;
    transition: height 0.3s ease-in-out;
    margin: 0px;
}

.back-banned {
    position: fixed;
    background-color: #0000003c;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    display: none;
}

.menu-link.learn-active {
    height: 200px;
}

.menu-link {
    width: 100%;
    height: 52px;
    color: #ccc;
    display: flex;
    font-size: .75rem;
    line-height: 24px;
    margin-top: 10px;
    background-color: rgb(21, 21, 21);
    border-radius: 10px;
    align-items: center;
}

.menu-link i img {
    height: 27px;
}

.menu-link i {
    margin-left: 15px;
    display: flex;
    align-items: center;
}

.close {
    width: 25px;
    margin-top: 0;
}

#top-menu-section {
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 20px;
}

#right-top-menu-section {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 20px;
}

#menu-wrapper {
    height: 100%;
    width: calc(100% - 40px);
    margin-left: 20px;
    margin-right: 20px;
    overflow: scroll;
}

#top-menu-section img {
    margin-top: 15px;
    margin-right: 20px;
}

.right-menu {
    height: 100vh;
    width: 85vw;
    background-color: rgb(14, 14, 14);
    position: fixed;
    z-index: 1;
    right: -100%;
    top: 0px;
    transition: right 0.3s ease-in-out;
}

.right-menu.active {
    right: 0%;
    transition: right 0.3s ease-in-out;
}

.left-menu {
    height: 100vh;
    width: 85vw;
    background-color: rgb(14, 14, 14);
    position: fixed;
    z-index: 1;
    left: -100%;
    top: 0px;
    transition: left 0.3s ease-in-out;
}

.left-menu.active {
    left: 0%;
    transition: left 0.3s ease-in-out;
}

.menu,
.search,
.user {
    height: 30px;
    margin: 0 10px;
}

.top-icon {
    height: 20px;
}

.top-nav {
    height: 40px;
    width: 100%;
    background-color: rgb(14, 14, 14);
    justify-content: space-between;
    display: flex;
    align-items: center;
}

.top-bar {
    position: relative;
}

body {
    padding: 0;
    font: 1em Arial, "Helvetica Neue", Helvetica, sans-serif;
    line-height: 1.4;
    margin: 0;
    font: 1em Arial, "Helvetica Neue", Helvetica, sans-serif;
    font-style: normal;
    font-variant-caps: normal;
    font-variant-ligatures: normal;
    font-variant-numeric: normal;
    font-variant-east-asian: normal;
    font-weight: normal;
    font-stretch: normal;
    font-size: 1em;
    line-height: normal;
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
    line-height: 1.4;
}</style>