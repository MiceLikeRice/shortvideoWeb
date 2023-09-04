<template>
  <div id="app">
    <transition name="swip">
      <router-view/>
    </transition>
  </div>
</template>
<script>
export default {
}
</script>

<style>
.swip-enter-active
.swip-leave-active {
  transition: transform .5s;
}

.swip-enter{
  transform: translateX(-100%);
}
.swip-leave-to {
  transform: translateX(100%);
}</style>

