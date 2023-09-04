<template>
    <div class="contact-name">
        <div class="contact-nav">
            <div style="display: flex; align-items:center;height:100%">
            <button  @click="navTo(0)" :style="{ backgroundColor: this.currentIndex === 0 ? '#76B6EA' : '' }">
                <img src="../assets/icon/message.svg" alt="">
                <span style="display: block;">消息</span>
            </button >
            <button  @click="navTo(1)" :style="{ backgroundColor: this.currentIndex === 1 ? '#76B6EA' : '' }">
                <img src="../assets/icon/user.svg" alt="">
                <span style="display: block;">好友</span>
            </button>
            <button  @click="navTo(2)" :style="{ backgroundColor: this.currentIndex === 2 ? '#76B6EA' : '' }">
                <img src="../assets/icon/user-plus.svg" alt="">
                <span style="display: block;">新朋友</span>
            </button >
            <button  @click="navTo(3)" :style="{ backgroundColor: this.currentIndex === 3 ? '#76B6EA' : '' }">
                <img src="../assets/icon/users.svg" alt="">
                <span style="display: block;">群聊</span>
            </button>
            </div>
        </div>
        <div class="contact-main">
            <div class="contact-content" :style="{ left: `calc(-100% * ${currentIndex})` }">
                <div class="contact-page">
                    <div class="messages">
                        <div class="n-frd-top">
                            <input class="n-frd-top-input" placeholder="请输入查询"/>
                            <button>搜索</button>
                        </div>
                        <!-- -->
                        <message-box
                        messageContent="你好"
                        userName="亲爱的"
                        avatar="titleicon.png"
                        :online="true"
                        :unreadCount="12"
                        lastSendTime="5:15"

                        />
                    </div>
                </div>
                <div class="contact-page">
                    <div class="friend">
                        <div class="n-frd-top">
                            <input class="n-frd-top-input" placeholder="请输入查询"/>
                            <button>搜索</button>
                        </div>
                        <!-- -->
                        <friend-box
                        info="今天真开心"
                        userName="小马哥"
                        avatar="titleicon.png"
                        :online="true"
                        />
                    </div>
                </div>
                <div class="contact-page">
                    <div class="new-friend">
                        <div class="n-frd-top">
                            <input class="n-frd-top-input" placeholder="请输入查询"/>
                            <button>搜索</button>
                        </div>
                        <!-- --> 
                        <new-friend-box
                        applyMessage="你在吗，我想加你"
                        userName="吴亦凡"
                        avatar="favicon.ico"
                        status="已同意"
                        :sex="true"
                        source="好友添加"
                        :age="21"
                        />
                    </div>
                </div>
                <div class="contact-page">
                    <div class="groups">
                        <div class="n-frd-top">
                            <input class="n-frd-top-input" placeholder="请输入查询"/>
                            <button>搜索</button>
                        </div>
                        <!---->
                        <groups-box
                        userName="低素质人群"
                        avatar="titleicon.png"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import MessageBox from '@/components/Contact/MessageBox'
import FriendBox from '@/components/Contact/FriendBox'
import NewFriendBox from '@/components/Contact/NewFriendBox'
import GroupsBox from '@/components/Contact/GroupsBox'
export default {
    components:{
        MessageBox,
        FriendBox,
        NewFriendBox,
        GroupsBox,
    },
    data() {
        return {
            displayText: false,
            currentIndex: 1,
        };
    },
    methods: {
        toggleText() {
            this.displayText = !this.displayText;
        },
        navTo(index) {
            if (this.currentIndex != index) {
                this.currentIndex = index;
            }
        }
    },
};
</script>
  
<style>
.n-frd-top-input{
    height: 40px;
    width: 60%;
    margin-left: 10px;
    margin-top: 10px;
    border-radius: 20px;
    padding: 0 10px;
}
.n-frd-top button{
    height: 40px;
    width: 20%;
    margin-left: 10px;
    border-radius: 20px;
    background-color: rgb(196, 205, 209);
}
.n-frd-top-input:focus{
    outline: 0px;
}


.n-frd{
    height: 80px;
    display: flex;
    align-items: center;
}
.contact-name {
    width: 100%;
}

.contact-main {
    width: 100%;
    background-color: #D4E6F1;
    display: flex;
    overflow: hidden;
    position: relative;
    height: calc(100vh - 120px);
}

.contact-content {
    display: flex;
    overflow:hidden;
    width: 400%;
    height: 100%;
    position: absolute;
    left: 0px;
}

.contact-page {
    flex: 0 0 25%;
    box-sizing: border-box;
    background-color: #2396d8;
    flex-shrink: 0;
    height: 100%;
    border: #ffffff 2px solid;
}

.contact-nav {
    height: 60px;
    width: 100%;
    background-color: #F2F2F2;
    overflow-x: hidden;
    color: black;
}

.contact-nav button {
    height: 100%;
    width: 70px;
    padding: 10px;
    background-color: transparent;
}

.contact-nav button:hover {
    cursor: pointer;
    color: #1ea0ec;
}
</style>
  