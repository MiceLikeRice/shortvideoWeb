<template>
    <div class="logup-board">
        <div class="head">
            <img class="log-back" @click="back" src="../../assets/icon/clear.svg" alt="">
            账号注册
        </div>
        <div class="logup-bg">
            <img src="../../assets/logbg.gif" alt="">
        </div>
        <div class="logup-form">
            <div class="logup-item">账号注册</div>
            <div class="bare-line"></div>
            <div class="logup-item">
                <div>用户名</div>
                <input id="username" type="text" placeholder="请输入用户名"/>
            </div>
            <div class="bare-line"></div>
            <div class="logup-item">
                <div>密码</div>
                <input id="password" type="password" placeholder="请输入密码" @input="validatePassword">
                <span style="color: rgb(183, 39, 39); font-size:10px">{{ passwordMsg }}</span>
            </div>
            <div class="bare-line"></div>
            <div class="logup-item">
                <div>密码验证</div>
                <input id="password" type="password" placeholder="请再次输入密码" @input="validatePassword">
                <span style="color: rgb(183, 39, 39); font-size:10px">{{ passwordMsg }}</span>
            </div>
            <div class="bare-line"></div>
            <div class="logup-item">
                <div>手机号</div>
                <input type="text" placeholder="请输入手机号码"/>
                <div class="vertical-line"></div>
                <button>获取验证码</button>
            </div>
        </div>
        <div class="submit-button" >  
            <button @click="passwordSubmit">
                验证登录
            </button>
        </div>
        <div class="logup-bottom">
            <span>欢迎登录</span>
        </div>
    </div>
</template>

<script>
import request from '@/utils/request';
import Cookies from "cookies-js"
export default{
    data(){
        return{
            passwordMsg:""
        }
    },
    methods:{
        validatePassword(){
            var password = document.getElementById("password");
            if (password.value.length < 8) {
                this.passwordMsg = "至少需要8个字符";
                return false;
            } else {
                this.passwordMsg = ""; // 清除错误消息
                return true;
            }
        },
        passwordSubmit(){
            const username =document.querySelector("#username");
            const password =document.querySelector("#password");
            request.post("/api/user/logup",{
                username: username.value,
                password: password.value
            }).then((response)=>{
                console.log(response)
                if(response.data.code==="200"){
                    alert("登录成功")
                    Cookies.set("token",response.data.token);
                    this.$store.dispatch("logup",response.data.userInfo);
                    console.log(this.$store.state.user);
                    this.$router.go(-1);
                }
                return response;
            })
        },
        toggleCodeOrPassword(){
            this.codeORpassword=this.codeORpassword==="验证码登录"?"账号密码登录":"验证码登录"
        },
        back(){
            this.$router.go(-1);
        }
    }
}
</script>

<style>
.log-back{
    height: 20px;
    width: 20px;
    position: absolute;
    left: 15px;
}
.logup-bottom{
    color: #626262;
    padding-left: 10%;
    font-size: 12px;
}
.submit-button{
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.submit-button button{
    height: 40px;
    width: 80%;
    margin: 0 auto;
    border-radius: 5px;
    background-color: #fff900;
    color: rgb(71, 71, 71);
    font-size: 16px;
    border: 0px;
    box-shadow: 2px 2px 5px rgba(255, 247, 0, 0.618);
}
.vertical-line{
    height: 40%;
    background-color: rgb(97, 97, 97);
    width: 1px !important;
}
.logup-form>div>button{
    background-color: transparent;
    border: 0px;
    color: rgb(146, 146, 146);
    position: absolute;
    right: 10px;
}
.logup-form>div>input{
    height: 100%;
    width: calc(100% - 180px);
    background-color: transparent !important;
    border: 0px;
    color: rgb(217, 217, 217);
    font-size: small;
}
.logup-form>div>input:focus{
    outline: none;
}
.bare-line{
    width: 100%;
    height: 1px;
    background-color: rgb(73, 73, 73);
}
.logup-item{
    height:20%;
    margin-left: 15px;
    color: rgb(217, 217, 217);
    display: flex;
    align-items: center;
    font-size: small;
    position: relative;
}
.logup-form>div>div{
    width: 75px;
}
.logup-form{
    background-color: rgb(33, 33, 33);
    width: 100%;
    height: 250px;
}
.logup-bg{
    width: 100%;
    height: 120px;
    overflow: hidden;
    display: flex;
    align-items: center;
}
.head-right{
    color: white;
    position: absolute;
    right: 10px;
    font-size: 12px;
    color: #fff900;
    border-radius: 10px;
    background-color: transparent;
    border: 0px ;
}
.head{
    width: 100%;
    height: 50px;
    background-color: rgb(33, 33, 33);
    color: aliceblue;
    display: flex;
    justify-content:center;
    align-items: center;
    font-size: large;
    font-weight: bolder;
}
.logup-board{
    position: relative;
}
</style>