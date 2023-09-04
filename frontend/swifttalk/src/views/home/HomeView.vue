<template>
    <div style="display:flex; justify-content:center;background-color: #ffffff;">
        <div class="home-left"></div>
        <div class="home-main">
            <div class="slide-container">
                <div class="slide-wrapper">
                    <img class="slide manifest move-to-right" src="../../../public/img1.webp" />
                    <img class="slide manifest move-to-middle" src="../../../public/img2.webp" />
                    <img class="slide manifest" src="../../../public/img3.webp" />
                    <img class="slide" src="../../../public/img4.webp" />
                </div>
                <div class="slide-dots">
                    <div v-for="i in [3, 2, 1, 0]" :key="i">
                        <div
                            :style="{ backgroundColor: currentImage === i ? 'yellow' : 'white', display: 'inline-block'}">
                        </div>
                    </div>
                </div>
            </div>
            <div class="auto-type">
                <div class="auto-type-style">
                    I'm{{ this.type.typedText }}
                    <span v-if="this.type.showCursor" class="cursor">|</span>
                </div>
            </div>
        </div>
        <div class="home-right"></div>
    </div>
</template>
<script>
export default {
    name: "HomeView",
    data() {
        return {
            currentImage: 1,
            totalImage: 4,
            intervalId: null,
            type: {
                index:0,
                targetText: [
                    " code composer!",
                    " fantastic boy!",
                    " not the best but good enough!",
                ],
                typedText: "",
                currentIndex: 0,
                typingSpeed: 10,
                showCursor: true,
                forword: true
            }
        }
    },
    methods: {
        slideHandler() {
            console.log(this.currentImage); // 打印保存的索引值
            const allimage = document.querySelectorAll(".slide")
            const preimage = allimage[(this.currentImage - 1 + this.totalImage) % this.totalImage];
            const currentimage = allimage[this.currentImage];
            const nextimage = allimage[(this.currentImage + 1) % this.totalImage];
            const prepimage = allimage[(this.currentImage + 2) % this.totalImage];
            preimage.classList.remove("move-to-right", "manifest");
            currentimage.classList.remove("move-to-middle");
            currentimage.classList.add("move-to-right");
            nextimage.classList.add("move-to-middle");
            prepimage.classList.add("manifest");
            this.nextSlide();
        },
        startSlideShow() {
            this.intervalId = setInterval(() => {
                this.slideHandler();
            }, 5000);
        },
        nextSlide() {
            this.currentImage = (this.currentImage + 1) % this.totalImage;

        },
        startTyping() {
            const typingLoop = () => {
                if (this.type.forword && this.type.currentIndex < this.type.targetText[this.type.index].length) {
                    this.type.typedText += this.type.targetText[this.type.index][this.type.currentIndex];
                    this.type.currentIndex++;
                    if (this.type.currentIndex === this.type.targetText[this.type.index].length) {
                        this.type.forword = false;
                        this.type.currentIndex--;
                    }
                } else {
                    if (this.type.currentIndex >= 0) {
                        this.type.typedText = this.type.typedText.substring(0, this.type.currentIndex);
                        this.type.currentIndex--;
                    } else {
                        this.type.forword = true;
                        this.type.currentIndex++;
                        this.type.index=(this.type.index+1)%this.type.targetText.length;
                    }
                }
                setTimeout(typingLoop, this.type.forword?200:60);
            };
            typingLoop();
        },
        startCursorBlinking() {
            setInterval(() => {
                this.type.showCursor = !this.type.showCursor;
            }, 300); // 控制光标闪烁的时间间隔，单位：毫秒
        }
    },
    created() {
        console.log(this.currentImage);
        this.startSlideShow();
        this.startTyping();
        this.startCursorBlinking();
    },
    beforeDestroy() {
        clearInterval(this.intervalId); // 在组件销毁之前清除定时器
    }
}   
</script>

<style>



.auto-type {
    font-size: 30px;
    font-family: monospace;
    background-color: rgb(255, 255, 255);
    width: 100%;
  }
  
.auto-type-style {
    display: inline-block;
    max-width: 800px;
    word-wrap: break-word;
    box-sizing: border-box;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Noto Sans CJK SC, WenQuanYi Micro Hei, Arial, sans-serif;
  }
  
.cursor {
    font-weight: bold;
    max-width: 100%;
    word-wrap: break-word;
  }

.slide-dots {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;

}

.slide-dots>div>div {
    width: 12px;
    height: 12px;
    margin-left: 5px;
    border-radius: 6px;
    border-width: 0px;
    background-color: rgb(255, 255, 255);
    display: inline-block;
}

.slide-dots>button:hover {
    background-color: #D2E9E9;
}

.slide-wrapper {
    padding-bottom: 50%;
    display: flex;
    justify-content: center;
}

.slide-container {
    width: 100%;
    overflow: hidden;
    background-color: antiquewhite;
    position: relative;
    align-self: center;
    padding-bottom: 30px;
}

.slide {
    width: 100%;
    height: auto;
    position: absolute;
    left: -100%;
    display: none;
    top: 50%;
    /* 移动到容器顶部的一半位置 */
    transform: translateY(-50%);
    /* 平移自身高度的一半来实现垂直居中 */
}

.slide.manifest {
    display: block;
}

.slide.manifest.move-to-middle {
    left: 0;
    transition: left 1s linear;
    opacity: 1;
}

.slide.manifest.move-to-right {
    left: 100%;
    transition: left 1s linear;
    opacity: 1;
}

@media (min-width: 300px) {
    .home-left {
        height: 1000px;
        width: 300px;
        background-color: #ffffff;
        display: inline-block;
    }

    .home-main {
        height: 1000px;
        max-width: 800px;
        width: 100vw;
        background-color: #ffffff;
        display: inline-block;

    }

    .home-right {
        height: 1000px;
        width: 300px;
        background-color: #ffffff;
        display: inline-block;
    }
}

@media (max-width: 1300px) {
    .home-left {
        display: none;
    }
}

@media (max-width: 1000px) {
    .home-right {
        display: none;
    }
}
</style>