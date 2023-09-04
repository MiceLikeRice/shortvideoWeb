<template>
    <div class="msg">
        <img style="width:50px;margin-left:5px;border-radius:50%;margin-right:10px;" :src="avatar"/>
        <div style="height: 100%;width:100%;display:flex; align-items:center; display:flex;justify-content:space-between;">
            <div style="width:calc(100%-160px);display:inline-block;margin">
            <div style="
            display: block;
            font-size:18px;
            width:calc(100%-160px);
            white-space: nowrap; 
            overflow: hidden; 
            text-overflow: ellipsis;"
            > {{ userName }} </div>
            <div style="
            display: block;
            font-size:15px;
            width:calc(100%-160px);
            white-space: nowrap; 
            overflow: hidden; 
            text-overflow: ellipsis;
            "> {{ messageContent }} </div>
            </div> 
            <div style="backgroud-color:white; width:100%;margin-left:auto">
                <div style=" float:right;">{{ lastSendTime }}</div>
                <div style="clear:both"></div>
                <div style=" padding:0px 4px;height:20px; border-radius:10px; background-color:red;float:right;color:white">{{ unreadCount }}</div>
            </div> 
        </div>
        <div></div>
    </div>
</template>

<script>
export default{
    name:"MessageBox",
    props:{
        messageContent:String,
        userName:String,
        avatar:String,
        online:Boolean,
        unreadCount:Number,
        lastSendTime:String,
    }
}
</script>

<style>
.msg{
    height: 60px;
    display: flex;
    align-items: center;
    width: 100%;
}
</style>