<template>
  <div id="app">
    <div id="nav">
      <Navbar />
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
#body {
  background-color: rgb(242, 249, 255);
  height: 85vh;
}
</style>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  components: {
    Navbar,
    Footer,
  },
  beforeCreate() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      console.log(user)
      if (user) {
        this.$store.state.isLoggedIn = true;
        this.$store.state.user = user 
      }
    });
  },
  methods:{

  }

};
</script>