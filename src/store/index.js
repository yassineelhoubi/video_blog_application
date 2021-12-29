import { createStore } from 'vuex'

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

export default createStore({
  state: {
    userRegistred: false,
    user: "",
  },
  getters: {
    userRegistred: state => state.userRegistred
  },
  mutations: {
    isRegistred: state => state.userRegistred = true,

  },
  actions: {
    login({ commit }, data) {
      commit("commit")
      const auth = getAuth();
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          // Signed in 
          this.user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("e", errorCode, errorMessage);
        });
     
    },
    register({ commit }, data) {
      commit("commit")
      console.log(data)
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
    async createUser({ commit }, data) {
      commit("commit")

      const storage = getStorage();
      const storageRef = ref(storage, 'users/profileImg/' + this.user.uid + '/' + data.imgPath);

      // 'file' comes from  File input
      uploadBytes(storageRef, data.img).then((snapshot) => {
        console.log('Uploaded a blob or file!', snapshot);
      });
      // Delete img from the data so that it is not sent to collection user
      delete data.img;

      const db = getFirestore();

      await setDoc(doc(db, "users", this.user.uid), data);

    },

  },
  modules: {
  }
})
