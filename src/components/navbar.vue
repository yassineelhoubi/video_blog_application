<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand p-0"
        ><img alt="logo" width="60" src="../assets/img/logo.png"
      /></a>
      <div class="collapse navbar-collapse  justify-content-between" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link class="nav-link" to="/">Home</router-link>
          <router-link class="nav-link" to="/blogs">Blogs</router-link>
          <router-link class="nav-link" v-if="!isLoggedIn" to="/authentication">Login</router-link>
          <router-link class="nav-link" v-if="isLoggedIn" to="/dashboard">Dashboard</router-link>
        </div>
        <div class="navbar-nav ">

        <button class="btn btn-primary " v-if="isLoggedIn" @click="logout">logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Navbar",
    computed:{

    ...mapGetters(["isLoggedIn"]),
  },
  methods:{
    logout(){
      this.$store.dispatch('logout')
    }
  },
  props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
