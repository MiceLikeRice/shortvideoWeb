<template>
    <div class="grp">
        <img style="width:50px;margin-left:10px;border-radius:50%;margin-right:10px;" :src="avatar"/>
        <div style="height: 100%;display:flex; align-items:center;width:calc(100% - 80px);">
            <div style="width:100%;display:inline-block">
            <div style="
            display: block;
            font-size:18px;
            width:100%;
            white-space: nowrap; 
            overflow: hidden; 
            text-overflow: ellipsis;"
            > {{ userName }} </div>
            </div> 
        </div>
        <div></div>
    </div>
</template>

<script>
export default{
    props:{
        userName:String,
        avatar:String,
    }
}
</script>

<style>
.grp{
    height: 70px;
    display: flex;
    align-items: center;
}
</style>