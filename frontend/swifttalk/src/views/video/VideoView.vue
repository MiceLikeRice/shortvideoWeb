<template>
    <div class="video-container">
        <top-bar/>
        <div class="second-nav">
            <div>
                <router-link to="/shortvideo">短视频</router-link>
            </div>
            <div>
                <router-link to="/recommend">推荐</router-link>
            </div>
            <div>
                <router-link to="/hot">热门</router-link>
            </div>
            <div>
                <router-link to="/film">电影</router-link>
            </div>
        </div>
        <router-view/>
    </div> 
</template>

<script>
import TopBar from '@/components/video/TopBar'
export default {
    components: {
        TopBar,
    }
}
</script>

<style>
.second-nav a {
    text-decoration: none;
    color: #c6c6c6;
}

.second-nav a.router-link-active {
    color: rgb(232, 127, 0);
}

.second-nav a.router-link-active::after {
    display: block;
}

.second-nav a::after {
    position: absolute;
    bottom: 0px;
    content: "";
    height: 3px;
    border-radius: 1.5px;
    background-color: rgb(232, 127, 0);
    width: 100%;
    right: 50%;
    transform: translateX(50%);
    display: none;
}

.second-nav {
    width: 100%;
    display: flex;
    justify-content: space-around;
    background-color: rgb(14, 14, 14);
    color: #c6c6c6;
    margin-top: 1px;
    box-shadow: 0px 2px 2px rgba(128, 128, 128, 0.252);
}

.second-nav div {
    height: 30px;
    text-align: center;
    display: flex;
    align-items: center;
    position: relative;
}

.video-container {
    
}
</style>
