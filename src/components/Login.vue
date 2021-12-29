<template>
<h5 class="card-title">Welcome Back</h5>
  <div class="card">
    <div class="card-body form-group">
      <label for="Reference">Email :</label>
      <input
        type="email"
        class="form-control form-control-lg"
        placeholder="Email"
        v-model="email"
      />

      <label for="Reference">Password :</label>
      <input
        type="password"
        class="form-control form-control-lg"
        placeholder="Password"
        v-model="password"
      />
      <button class="btn btn-primary mt-2 text-white" @click.prevent="login">
        Login
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
    data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      console.log("login");
      this.$store.dispatch("test");
    },
  },
  props: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>