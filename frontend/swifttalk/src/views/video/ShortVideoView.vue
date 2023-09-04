<template>
    <div>
        <video-box v-for="(video,index) in videoList"
        @video-click="play(index)" 
        :videoCover="'http://192.168.101.2:50000/api/image/download/'+video.videoCoverPath" 
        :playCount="video.videoPlayCount" 
        :videoLength="video.videoLength" 
        :messageCount="video.videoCommentsCount"
        :videoDescription="video.videoDescription" 
        :uploader="video.videoUploader" 
        :videoPath="'http://localhost:50000/api/video/download/'+video.videoPath" :key="video.videoId"/>
    </div>
</template>

<script>
import VideoBox from '@/components/video/VideoBox'
import request from '@/utils/request.js'
export default {
    components: {
        VideoBox,
    },
    data() {
        return {
            videoList:[],
        }
    },
    mounted(){
        request.post("api/shortvideo/searchshortvideo")
        .then((response)=>{
            this.videoList=response.data.row;
        })
        .catch((error)=>{
            console.log(error)
        })
    },
    created() { },
    methods: {
        play(index) {
            this.$router.push({
                path: "/playvideo",
                query: {
                    index,
                    videoList:this.videoList
                }
            })
        }
    }
}

</script>

<style></style>
