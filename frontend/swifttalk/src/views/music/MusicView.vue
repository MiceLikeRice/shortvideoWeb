<template>
    <div class="music">
        <div class="music-container">
            <div class="music-list">
                <div class="music-tag">
                    <span style="
                    line-height:40px;
                    margin-left:10px;
                    font-size: 14px;
                    color: #c3c3c3;
                    font-weight: bold;
                    ">发现-梁静茹</span>
                </div>
                <music-box v-for="(music, index) in musicList" :key="music.musicId" :musicId=music.musicId
                    :musicName=music.musicName :listenCount=music.listenCount :likeCount=music.likeCount
                    :singer=music.singer :tags=music.tags :avatarPath=music.avatarPath :uploadTime=music.uploadTime
                    :musicPath=music.musicPath :uploader=music.uploader
                    :progress="currentMusic && currentMusic.musicId === music.musicId ? progress : 0"
                    :pause="currentMusic && currentMusic.musicId !== music.musicId || !isplay" :index="index"
                    :currentIndex="currentIndex" :musicLength="musicLength ? musicLength : undefined"
                    :musicProgress="$refs.audio ? $refs.audio.currentTime : undefined" @refesh="getMusicListBySearching()"
                    @musicClick="acceptMusicBox" @musicProgressUpdate="updateProgressFixed" @play="play"
                    @incLike="()=>musicList[index].likeCount++" />
                <div @click="loadMore" class="load-more">
                    <div>
                        加载更多
                    </div>
                </div>
            </div>
            <div class="other-container">
                <div class="tags">
                    <span>类别</span>
                    <div>最新音乐</div>
                    <div>流行音乐</div>
                    <div>喜欢音乐</div>
                    <div>asmr</div>
                    <div>中文音声</div>
                    <div>助眠</div>
                </div>
            </div>
            <div class="music-footer">
                <footer class="footer">
                    <div class="container">
                        <div class="footer-content">
                            <p style="color: #131313;">copyright ©2023 exploreAsmr.top. </p>
                            <p style="color: #1a1a1a;">Contact: asmr554@gmail.com</p>
                            <p style="color: #909090;">All rights reserved.</p> 
                        </div>
                    </div>
                </footer>
            </div>
        </div>
        <div class="music-player">
            <audio v-if="playNewSong" ref="audio" @timeupdate="updateProgress" @ended="songEnded">
                <source :src="this.musicUrl" type="audio/mpeg">
            </audio>
            <music-player :musicLength="this.musicLength ? musicLength : undefined"
                :musicProgress="$refs.audio ? $refs.audio.currentTime : undefined"
                :volume="$refs.audio ? $refs.audio.volume : undefined" :avatarPath="currentMusic.avatarPath"
                :singer="currentMusic.singer" :musicName="currentMusic.musicName" :pause="!isplay"
                @musicProgressUpdate="updateProgressFixed" @volumeProgressUpdate="updateVolume" @play="play"
                @skipPre="skipPre" @skipNext="skipNext" @reload="reload" />
        </div>
    </div>
</template>

<script>
import MusicPlayer from '@/components/MusicPlayer.vue';
import MusicBox from '@/components/MusicBox.vue';
import request  from '../../utils/request';
export default {

    components: {
        MusicPlayer,
        MusicBox,
    },
    data() {
        return {
            musicList: [],
            currentMusic: {},
            progress: 0,
            isplay: false,
            musicUrl: "",
            playNewSong: false,
            musicLength: undefined,
            currentIndex: undefined,
            pageSize:10,
            pageIndex:1,
        }
    },
    mounted() {
        this.getMusicListBySearching();
    },
    methods: {
        async loadMore() {
            try {
                this.pageIndex+=1;
                const response = await request.post("/api/music/getFilteredMusic", {
                    musicName: "",
                    tags: "",
                    orderBy: "music_name",
                    sequence: "desc",
                    page: this.pageIndex,
                    pageSize: this.pageSize
                });
                response.data.forEach(element => {
                    this.musicList.push(element);
                });
            } catch (error) {
                console.log(error);
            }

        },
        skipPre() {
            if (this.currentIndex > 0) {
                this.currentIndex--;
                this.currentMusic = this.musicList[this.currentIndex];
                this.musicUrl = this.currentMusic.musicPath;
                this.$refs.audio.load();
                this.$refs.audio.play();
            }
        },
        skipNext() {
            if (this.currentIndex < this.musicLength - 1) {
                this.currentIndex++;
                this.currentMusic = this.musicList[this.currentIndex];
                this.musicUrl = this.currentMusic.musicPath;
                this.$refs.audio.load();
                this.$refs.audio.play();
            }
        },
        reload() {
            this.musicUrl = this.currentMusic.musicPath;
            this.$refs.audio.load();
            this.$refs.audio.play();
        },
        songEnded() {
            request.post("/api/music/addMusicPlayCount/" + this.currentMusic.musicId)
                .then((response) => {
                    if (response.data.success) {
                        this.getMusicListBySearching();
                    }
                })
                .catch(error => error);
        },
        play(isCurrent) {
            if (isCurrent) {
                if (!this.isplay) {
                    this.isplay = true;
                    this.$refs.audio.play();
                }
                else {
                    this.isplay = false;
                    this.$refs.audio.pause();
                }
            }
            else {
                this.$refs.audio.load();
                this.isplay = true;
                this.$refs.audio.play();
            }
        },
        updateProgressFixed(ratio) {
            const newTime = (ratio / 100) * this.$refs.audio.duration; // 根据百分比计算新的播放时间
            this.progress = ratio; // 更新进度条显示
            this.$refs.audio.currentTime = newTime; // 设置音频的播放时间
        },
        
        acceptMusicBox(musicData) {
            if (this.currentMusic !== musicData) {
                this.currentMusic = musicData;
                this.musicUrl = this.currentMusic.musicPath;
                this.playNewSong = true;
            }
            this.currentIndex = musicData.currentIndex;
        },
        async getMusicListBySearching() {
            try {
                this.pageIndex=1;
                const response = await request.post("/api/music/getFilteredMusic", {
                    musicName: "",
                    tags: "",
                    orderBy: "music_name",
                    sequence: "desc",
                    page: this.pageIndex,
                    pageSize: this.pageSize
                });
                this.musicList=response.data;

            } catch (error) {
                console.log(error);
            }

        },
        updateProgress(event) {
            const audio = event.target;
            const currentTime = audio.currentTime;
            const duration = audio.duration;
            this.progress = (currentTime / duration) * 100;
            this.musicLength = duration;
        },
        updateVolume(volume) {
            this.$refs.audio.volume = volume / 100;
        }
    }
}
</script>

<style>
.load-more{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.load-more div{
    height: 40px;
    width: 100px;
    background-color: #00C9A7;
    margin: 10px 0;
    border-radius: 20px;
    text-align: center;
    line-height: 40px;
}

* {
    font-family: open sans, Tahoma, Arial, sans-serif;
}

.tags>div {
    height: 50px;
    padding-left: 20px;
    display: flex;
    align-items: center;
    border: 1px solid black;
    border-left: none;
    border-right: none;
    border-top: none;
    transition: filter 0.2s ease-in-out;
    color:#ccc;
}

.tags>div:hover {
    filter: brightness(1.5);
    cursor: pointer;
}


.tags>span {
    font-size: 20px;
    font-weight: bold;
    display: block;
    margin-top: 20px;
    margin-left: 20px;
}

body {
    font-family: 'Poppins', sans-serif;
}

.footer {
    padding: 20px 0;
    text-align: center;
    box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.2);
    font-family: 'Helvetica Neue', sans-serif;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
}

.footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.footer p {
    margin: 5px 0;
    font-size: 14px;
    /* 移动设备的默认字体大小 */
    font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
}

@media (min-width: 800px) {
    .footer p {
        font-size: 16px;
        /* 较大的屏幕上的较大字体大小（桌面） */
    }
}


.progress {
    height: 100%;
    background-color: #00aaff;
}

.list {
    width: 100%;
}

.music-tag {
    height: 40px;
    width: 100%;
    line-height: 38px;
    border: 1px solid #00C9A7;
    border-left: none;
    border-right: none;
    border-top: none;
}

@media (max-width: 800px) {
    .other-container {
        display: block;
        height: 500px;
        width: 100%;
        float: left;
    }

    .music-container {
        width: 100%;
    }

    .music-list {
        width: 100%;
        display: block;
        float: left;
        overflow-x: hidden;
        min-height: calc(100vh - 120px);
    }
}

@media (min-width: 800px) {
    .other-container {
        width: 25%;
        min-height: 500px;
        float: right;
        height: calc(100% - 150px);
    }

    .music-list {
        min-height: calc(100% - 150px);
        width: 75%;
        float: left;
        min-width: 350px;
        overflow-x: hidden;
        box-shadow:0px 0px 100px gray;
    }
}

.music-footer {
    height: 150px;
    width: 100%;
    margin: 0 auto;
    display: inline-block;
}

.music {
    width: 100%;
    box-sizing: border-box;
    height: calc(100vh - 120px);
}

.music-container {
    max-width: 1200px;
    background-color: #444444;
    margin: 0 auto;
    overflow-x: hidden;
    height: calc(100vh - 120px);
}

.music-player {
    position: fixed;
    bottom: 0px;
    height: 60px;
    width: 100%;
}
</style>
