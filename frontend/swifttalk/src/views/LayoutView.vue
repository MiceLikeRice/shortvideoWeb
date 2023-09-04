<template>
    <div style="background-color:#444444;height:100vh;">
    <tool-bar/>
    <top-bar/>
    <router-view style="position:relative;top:60px"/>
    </div>
</template>
<script>

import ToolBar from '@/components/ToolBar.vue'
import TopBar from '@/components/TopBar.vue';
export default{
    name:"LayoutView",
    components:{
        TopBar,ToolBar,
    }
}
</script>