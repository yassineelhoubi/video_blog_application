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
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.$store.state.loader = true;
      if (this.email != "" && this.password != "") {
        const data = {
          email: this.email,
          password: this.password,
        };

        this.$store
          .dispatch("login", data)
          .then(() => (this.$store.state.loader = false))
          .catch(() => (this.$store.state.loader = false));
      } else {
        this.$store.state.loader = false;
        alert("Please write your email and password");
      }
    },
  },
  props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>