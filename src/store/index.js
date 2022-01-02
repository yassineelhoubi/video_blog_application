import { createStore } from 'vuex'

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, addDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import router from '../router';
export default createStore({
  state: {
    userRegistred: false,
    user: "",
    isLoggedIn: false,
    createBlog: false,
  },
  getters: {
    userRegistred: state => state.userRegistred,
    isLoggedIn: state => state.isLoggedIn,
    createBlog: state => state.createBlog
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
    },
    uploadVds({ commit }, video) {
      return new Promise((resolve, reject) => {
        /* get time */
        let today = new Date();
        //Synthesizing a consistent date
        let year = String(today.getFullYear()).padStart(2, "0");
        let mounth = String(today.getMonth() + 1).padStart(2, "0");
        let day = String(today.getDate()).padStart(2, "0");

        let hours = String(today.getHours()).padStart(2, "0");
        let minutes = String(today.getMinutes()).padStart(2, "0");
        let seconds = String(today.getSeconds()).padStart(2, "0");
        // YYYYMMDDHMS
        const dateTime = year + mounth + day + hours + minutes + seconds;
        const storage = getStorage();
        const storageVdsRef = ref(storage, 'blogs/vds/' + dateTime + video.name);

        uploadBytes(storageVdsRef, video).then((snapshot) => {
          resolve(snapshot);
        })
          .catch((error) => {
            reject(error);
          });
      });
    },
    uploadCoverImg({ commit }, CoverImg) {
      return new Promise((resolve, reject) => {
        /* get time */
        let today = new Date();
        //Synthesizing a consistent date
        let year = String(today.getFullYear()).padStart(2, "0");
        let mounth = String(today.getMonth() + 1).padStart(2, "0");
        let day = String(today.getDate()).padStart(2, "0");

        let hours = String(today.getHours()).padStart(2, "0");
        let minutes = String(today.getMinutes()).padStart(2, "0");
        let seconds = String(today.getSeconds()).padStart(2, "0");

        // YYYYMMDDHMS
        const dateTime = year + mounth + day + hours + minutes + seconds;
        const storage = getStorage();
        const storageVdsRef = ref(storage, 'blogs/CoverImg/' + dateTime + CoverImg.name);

        uploadBytes(storageVdsRef, CoverImg).then((snapshot) => {
          resolve(snapshot);
        })
          .catch((error) => {
            reject(error);
          });
      });
    },
    async createBlogStep1({ commit }, data) {

      return new Promise((resolve, reject) => {
        const coverImg = data.coverImg;
        const videos = data.videos;
        delete data.coverImg;
        delete data.videos;

        const db = getFirestore();

        const docRef = addDoc(collection(db, "blogs"), data)
          .then(
            response => {
              resolve(response)

            }).catch((error) => {
              return error
            });

      })


    }

  },
  modules: {
  }
})
