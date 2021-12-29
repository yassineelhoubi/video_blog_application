import { createStore } from 'vuex'

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
    test() {
      console.log("zinzinefiuzenf")
    },
    register({commit},data) {
      commit("commit")
      console.log(data)
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("e", errorCode, errorMessage);
          // ..
        });
    }
  },
  modules: {
  }
})
