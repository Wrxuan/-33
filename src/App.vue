<template>
  <transition name="van-slide-left" mode="out-in">
    <router-view></router-view>
  </transition>
</template>

<script>
export default {}
</script>

<style scoped>
.login {
  width: 2rem;
  height: 2rem;
  background-color: red;
}
</style>
