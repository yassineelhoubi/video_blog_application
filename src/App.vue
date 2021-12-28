<template>
  <div id="app">
    <div id="nav">
      <navbar />
    </div>
    <div id="body">
      <router-view />
    </div>
    <div id="footer">
      <Footer />
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<script>
// @ is an alias to /src
import navbar from "@/components/navbar.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    navbar,
    Footer,
  },
};
</script>