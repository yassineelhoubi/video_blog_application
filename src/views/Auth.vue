<template>
  <div class="pt-5">
    <div class="container" v-if="!userRegistred">
      <div class="row">
        <div class="col-md-6 col-12 mx-auto">
          <div class="card text-center">
            <div class="card-header">
              <ul class="nav nav-tabs card-header-tabs">
                <li class="nav-item">
                  <a
                    class="nav-link"
                    :class="{ active: showLogin }"
                    href="#"
                    @click="goToLogin()"
                    >Login</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    :class="{ active: showSignup }"
                    href="#"
                    @click="goToRegister()"
                    >Register</a
                  >
                </li>
              </ul>
            </div>
            <div class="card-body">
              <Login v-if="showLogin" />
              <Register v-else />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="row">
        <div class="col-md-6 col-12 mx-auto">
          <div class="card text-center">
            <div class="card-header">
              <ul class="nav nav-tabs card-header-tabs">
                <li class="nav-item">
                  <a class="nav-link active" href="#">Register Step 2</a>
                </li>
              </ul>
            </div>
            <div class="card-body">
              <RegisterStep2 />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import RegisterStep2 from "@/components/RegisterStep2.vue";
import {mapGetters} from "vuex";
export default {
  name: "Auth",
  components: {
    Login,
    Register,
    RegisterStep2,
  },
  computed:{
    ...mapGetters(["userRegistred"])
  },
  data() {
    return {
      showLogin: true,
      showSignup: false,
    };
  },
  methods: {
    goToLogin() {
      this.showLogin = true;
      this.showSignup = false;
    },
    goToRegister() {
      this.showLogin = false;
      this.showSignup = true;
    },
  },
};
</script>
