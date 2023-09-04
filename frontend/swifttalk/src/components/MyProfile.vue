<template>
    <div class="profile-container">
        <img src="../../public/profile-bg.png" class="profile-bg"/>
        <div class="profile-info">
            <div class="profile-info-head">
                <img src="../../public/favicon.png">
                <div class="name-and-id">
                    <span style="font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;font-weight:bolder">丁真</span>
                    <span>id: stack-overflow</span>
                </div>
                <div class="prise">
                    <img src="../assets/icon/thumbs-up.svg"/>
                    <span style="font-size: 12px;font-weight:bolder">114</span>
                </div>
            </div>
            <div class="profile-level">
                <div class="level-in">12</div>
                <span style="font-size:13px; font-style:normal;margin-left:10px">☀️☀️🌙🌙⭐⭐</span>
                <img style="display: inline; width:20px; position:absolute; right:10px" src="../assets/icon/chevron-right.svg"/>
            </div>
            <div class="profile-tagline">
                <div style="width:90%">这是一个在线中国传统颜色网站，里面的颜色都有它的中国传统叫法 ：暗玉紫、牡丹粉红、香叶红、玉红、合欢红、鹅冠红、云峰白……点击每一个颜色，网站的背景会随之变成相应的颜色。😎
                </div>
                <img style="display: block; width:20px; position:absolute; right:10px" src="../assets/icon/edit.svg"/>
            </div>
            <div class="profile-complate">
                <img style="display: inline; width:20px;margin-left:10px" src="../assets/icon/file-text.svg"/>
                <span style="font-size:17pxpx; font-style:normal;margin-left:10px">资料完成度 20%</span>
                <img style="display: inline; width:20px; position:absolute; right:10px" src="../assets/icon/chevron-right.svg"/>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name:"MyProfile"
}
</script>

<style>
.profile-complate{
    height: 50px;
    width: 100%;
    background-color: aliceblue;
    display: flex;
    align-items: center;
}
.profile-tagline{
    min-height: 50px;
    width: 100;
    background-color:azure;
    display: flex;
    align-items: center;
    padding: 10px;
    word-wrap: break-word;
    font-size: 15px;
    position: relative;
    box-shadow: 0 1px 1px beige;
}
.level-in{
    height: 16px;
    background-color: rgb(79, 79, 57);
    line-height: 16px;
    padding: 0 8px 0 7px;
    margin-left: 20px;
    border-radius: 5px;
}
.profile-level{
    background-color: aliceblue;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    color: aliceblue;
    font-style: italic;
    position: relative;
}
.prise{
    justify-self: flex-end;
    position: absolute;
    right: 10px;
}   
.profile-info-head{
    width: 100%;
    background-color: rgb(255, 255, 255);
    display: flex;
    align-items: center;
    position: relative;
}
.profile-info-head>img{
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin-left: 15px;
    margin-top: 10px;
    margin-bottom: 10px;
    display: inline-block;
}
.name-and-id{
    display: inline-block;
    margin-left: 10px;
}
.profile-info-head span{
    display: block;
}
.profile-info-head span:nth-of-type(1){
    font-size: 15px;
    margin-bottom: 5px;
}
.profile-info-head span:nth-of-type(2){
    font-size: 10px;
}
.profile-info{
    width: 100%;
}
.profile-bg{
    width: 100%;
    position: relative;
    top:0;
}
.profile-container{
    position: relative;
    width: 100%;
    padding: 0;
}
*{
    margin: 0px;
    padding: 0px;
    border-width: 0px;
}
</style>
