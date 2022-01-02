<template>
  <div id="app">
    <div id="nav">
      <Navbar />
    </div>
    <div id="body">
<div v-if="loader" class="lds-facebook"><div></div><div></div><div></div></div>
      <router-view />
    </div>
    <div id="footer">
      <Footer />
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { mapGetters } from "vuex";

export default {
  components: {
    Navbar,
    Footer,
  },
    computed: {
    ...mapGetters(["loader"]),
  },
  beforeCreate() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.$store.state.isLoggedIn = true;
        this.$store.state.user = user 
        this.$router.push(window.location.pathname)
      }
    });
  },
  methods:{
  }

};
</script>

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
  // height: 85vh;
}

.lds-facebook {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 16px;
  background: #0d6efd;
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
  left: 56px;
  animation-delay: 0;
}
@keyframes lds-facebook {
  0% {
    top: 8px;
    height: 64px;
  }
  50%, 100% {
    top: 24px;
    height: 32px;
  }
}


</style>

