<template>
    <div class="frd">
        <div class="frd">
            <img style="width:50px;margin-left:5px;border-radius:50%;margin-right:10px;" src="favicon.png"/>
            <div style="height: 100%;display:flex; align-items:center">
                <div style="width: 180px;display:inline-block">
                <div style="
                display: block;
                font-size:18px;
                width:calc(100%-100px);
                white-space: nowrap; 
                overflow: hidden; 
                text-overflow: ellipsis;"
                >{{ userName }}</div>
                <div style="
                display: block;
                font-size:15px;
                width:calc(100%-100px);
                white-space: nowrap; 
                overflow: hidden; 
                text-overflow: ellipsis;
                "><span v-if="online">[在线]🌟</span><span v-if="!online">[离线]🌟</span>{{ info }}</div>
                </div> 
            </div>
            <div></div>
        </div>
    </div>
</template>

<script>
export default{
    props:{
        info:String,
        userName:String,
        avatar:String,
        online:Boolean,
    }
}
</script>

<style>
.frd{
    height: 60px;
    display: flex;
    align-items: center;
}
</style>