import { createStore } from 'vuex'

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import router from '../router';
export default createStore({
  state: {
    userRegistred: false,
    user: "",
    isLoggedIn: false,
  },
  getters: {
    userRegistred: state => state.userRegistred,
    isLoggedIn: state => state.isLoggedIn,
  },
  mutations: {
    isRegistred: state => state.userRegistred = true,
    isLoggedIn: state => state.isLoggedIn = true,
    isLogout: state => {
      state.isLoggedIn = false
      state.user = ""
    },

  },
  actions: {
    login({ commit }, data) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          // Signed in 
          this.user = userCredential.user;
          commit('isLoggedIn')
          router.push('/dashboard');
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("e", errorCode, errorMessage);
        });

    },
    logout({ commit }) {

      const auth = getAuth();
      signOut(auth).then(() => {
        // Sign-out successful.
        commit('isLogout')
        router.push('/')
      }).catch((error) => {
        console.log(error)
        // An error happened.
      });
    },
    register({ commit }, data) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          // Signed in
          this.user = userCredential.user;
          commit("isRegistred")

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("e", errorCode, errorMessage);
          // ..
        });
    },
    createUser({ commit }, data) {
      return new Promise((resolve, reject) => {

        const storage = getStorage();
        const storageRef = ref(storage, 'users/profileImg/' + this.user.uid + '/' + data.imgName);

        // 'file' comes from  File input
        uploadBytes(storageRef, data.img).then((snapshot) => {

        }).catch((error) => {
          return error
        });
        // Delete img from the data so that it is not sent to collection user
        delete data.img;

        const db = getFirestore();

        setDoc(doc(db, "users", this.user.uid), data)
          .then(
            response => {
              resolve(response)
            }
          )
          .catch(
            error => reject(error)
          );

      })
    }

  },
  modules: {
  }
})
