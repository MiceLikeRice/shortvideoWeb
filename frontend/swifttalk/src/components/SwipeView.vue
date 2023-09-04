<template>
    <div class="slide-container">
        <video controls>
            <source src="http://192.168.101.2:50000/api/video/download/1693737333156.mp4">
        </video>
    </div>
</template>

<script>
export default {
    components:{
    },
    data() {
        return {
            ballPosition: { y: 0 },
            isDragging: false,
            startY: 0,
            originalY: 0,
            loading: false,
            offsetA:0,
            offsetB:0,
            status: true, //false a  true b
            transitionTimeA:0.3,
            transitionTimeB:0.3,
        };
    },
    methods: {
        handleTouchStart(event) {
            this.isDragging = true;
            this.startY = event.touches[0].clientY;
            this.originalY = this.ballPosition.y;
        },
        handleTouchMove(event) {
            event.preventDefault();
            if (this.isDragging) {
                const deltaY = event.touches[0].clientY - this.startY;
                const up=true;
                const down=false;
                if(deltaY<0){
                    if(this.load(down)){
                        if(this.status===false){ // a上b下
                            const slideB=document.querySelector(".slide-b");
                            slideB.style.display="block";
                            this.offsetA=0;
                            this.offsetB=slideB.clientHeight;
                        }
                        else if(this.status===true){ //a下b上
                            const slideA=document.querySelector(".slide-a");
                            slideA.style.display="block";
                            this.offsetB=0;
                            this.offsetA=slideA.clientHeight;
                        }
                    }
                    else{
                        console.log("向下加载失败");
                    }
                }
                else{
                    if(this.load(up)){
                        if(this.status===false){ // a上b下
                            const slideB=document.querySelector(".slide-b");
                            slideB.style.display="block";
                            this.offsetA=0;
                            this.offsetB=-slideB.clientHeight;
                        }
                        else if(this.status===true){ //a下b上
                            const slideA=document.querySelector(".slide-a");
                            slideA.style.display="block";
                            this.offsetB=0;
                            this.offsetA=-slideA.clientHeight;
                        }
                    }
                    else{
                        console.log("向下加载失败");
                    }
                }
                if (this.loading) {
                    this.ballPosition.y = this.originalY + deltaY / 3;
                }
                else {
                    this.ballPosition.y = this.originalY + deltaY;
                }
            }
        },
        handleTouchEnd() {
            if (this.isDragging) {
                if (!this.loading && this.ballPosition.y < -this.$el.clientHeight * 0.4) { 
                    //向下移动
                    if(this.status){
                        console.log("a")
                        this.offsetA=0;
                        this.ballPosition.y=0;
                        this.offsetB=-this.$el.clientHeight;
                        this.transitionTimeB=0.3;
                        this.transitionTimeA=0.3;
                    }
                    else{
                        console.log("b")
                        this.offsetB=0;
                        this.ballPosition.y=0;
                        this.offsetA=-this.$el.clientHeight;
                        this.transitionTimeA=0.3;
                        this.transitionTimeB=0.3;
                    }
                    this.status=!this.status;
                } else if (!this.loading && this.ballPosition.y > this.$el.clientHeight * 0.4) {
                    if(this.status){
                        console.log("a")
                        this.offsetA=0;
                        this.ballPosition.y=0;
                        this.offsetB=this.$el.clientHeight;
                        this.transitionTimeB=0.3;
                        this.transitionTimeA=0.3;
                    }
                    else{
                        console.log("b")
                        this.offsetB=0;
                        this.ballPosition.y=0;
                        this.offsetA=this.$el.clientHeight;
                        this.transitionTimeA=0.3;
                        this.transitionTimeB=0.3;
                    }
                    this.status=!this.status;
                } else {
                    this.transitionTimeA=0.3;
                    this.transitionTimeB=0.3;
                    this.ballPosition.y = this.originalY;
                }
                this.isDragging = false;
                console.log(this.statu?"a b":"b a");
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
        scrollUp(){

        },
        scrollDown(){

        }
        ,
        load(direction){
            console.log(direction?"下滑":"上滑");
            setTimeout(()=>{},2000);
            return true;
        }
    },
};
</script>

<style scoped>
.slide-container {
    position: relative;
    width: 100%;
    height: 100vh;
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
</style>
