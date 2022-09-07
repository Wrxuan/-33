<template>
  <div>
    <!-- <router-view></router-view> -->
    <h1>{{ count }}</h1>
    <h1>count的十倍:{{ bigNum }}</h1>
    <button @click="SET_COUNT(10)">点击+1</button>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
export default {
  methods: {
    // increment() {
    //   this.$store.commit('SET_COUNT', 10)
    // }
    ...mapMutations(['SET_COUNT'])
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['bigNum'])
  }
}
</script>

<style scoped>
.login {
  width: 2rem;
  height: 2rem;
  background-color: red;
}
</style>
