<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand p-0" ><img alt="logo" width="60" src="../assets/img/logo.png"></a>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">

        <router-link class="nav-link" to="/">Home</router-link>
        <router-link class="nav-link" to="/blogs">Blogs</router-link>
        <router-link class="nav-link" to="/authentication">Login</router-link>

      </div>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  name: 'Navbar',
  props: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
