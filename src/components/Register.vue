<template>
  <h5 class="card-title">Create Your Account</h5>
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
      <button class="btn btn-primary mt-2 text-white" @click.prevent="register">
        Register
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      if (this.email == "" || this.password == "") {
        alert("Please write your email and password");
      } else {
        const data = {
          email: this.email,
          password: this.password,
        };
        this.$store.dispatch("register", data);
      }
    },
  },
  props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>