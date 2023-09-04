<template>
    <div class="n-frd">
        <img style="width:50px;margin-left:10px;border-radius:50%;margin-right:10px;" src="favicon.png"/>
        <div style="height: 100%;display:flex; align-items:center;width:calc(100% - 80px);">
            <div style="width:calc(100% - 80px);display:inline-block">
            <div style="
            display: block;
            font-size:18px;
            width:100%;
            white-space: nowrap; 
            overflow: hidden; 
            text-overflow: ellipsis;"
            > {{ userName }} </div>
            <div style="
            display: block;
            font-size:15px;
            width:100%;
            white-space: nowrap; 
            overflow: hidden; 
            text-overflow: ellipsis;
            "> <div style="display: inline-block; background-color:rgba(240, 255, 255, 0.5);border-radius:6px"><span style="font-size:medium; text-align:center" v-if="sex">♂️</span> <span style="font-size:medium; text-align:center"  v-if="!sex">♀️</span>  {{ age }} </div> {{ applyMessage }} </div>
            <div style="
            display: block;
            font-size:15px;
            width:100%;
            white-space: nowrap; 
            overflow: hidden; 
            text-overflow: ellipsis;
            "> 来源： {{source}}</div>
            </div> 
            <div style="margin-left:auto;width:auto">
                {{ status }}
            </div> 
        </div>
        <div></div>
    </div>
</template>

<script>
export default{
    props:{
        applyMessage:String,
        userName:String,
        avatar:String,
        status:String,
        sex:Boolean,
        age:Number,
        source:String,
    }
}
</script>

<style>
.n-frd{
    width: 100%;
}
</style>