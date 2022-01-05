import { createStore } from 'vuex'

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, addDoc, collection, getDoc, updateDoc, deleteDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import router from '../router';
export default createStore({
  state: {
    userRegistred: false,
    user: "",
    isLoggedIn: false,
    createBlog: false,
    loader: false,
    createBlogStep2: false,
    idBlog: null,
  },
  getters: {
    userRegistred: state => state.userRegistred,
    isLoggedIn: state => state.isLoggedIn,
    createBlog: state => state.createBlog,
    loader: state => state.loader,
    idBlog: state => state.idBlog,
    createBlogStep2: state => state.createBlogStep2,
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
      return new Promise((resolve, reject) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, data.email, data.password)
          .then((userCredential) => {
            // Signed in 
            this.user = userCredential.user;
            commit('isLoggedIn')
            router.push('/dashboard');
            resolve()
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            reject()

          });
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
      return new Promise((resolve, reject) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, data.email, data.password)
          .then((userCredential) => {
            // Signed in
            this.user = userCredential.user;
            commit("isRegistred")
            resolve()
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            reject()
            // ..
          });
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

        const storage = getStorage();
        const storageVdsRef = ref(storage, 'blogs/vds/' + new Date().getTime() + video.name);

        uploadBytes(storageVdsRef, video)
          .then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            }).catch(error => {
              reject(error);
            })
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    uploadCoverImg({ commit }, CoverImg) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const storageVdsRef = ref(storage, 'blogs/CoverImg/' + new Date().getTime() + CoverImg.name);

        uploadBytes(storageVdsRef, CoverImg).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          }).catch(error => {
            reject(error);
          })
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
          .then(async (res) => {

            await updateDoc(doc(db, "blogs", res.id), {
              id: res.id
            })
            resolve(res)

          }).catch((error) => {
            reject(error)

          });

      })


    },
    getBlog() {
      return new Promise(async (resolve, reject) => {
        const id = this.state.idBlog
        const db = getFirestore();
        const docRef = doc(db, "blogs", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          resolve(docSnap.data())
        } else {
          reject()
        }
      })

    },
    validateBlog({ commit }, data) {
      return new Promise(async (resolve, reject) => {
        const db = getFirestore();
        await updateDoc(doc(db, "blogs", data.id), data)
          .then((res) => {
            resolve()
          }).catch((err) => {
            console.log(err)
          })
        reject()
      })
    },
    deleteBlog({ commit }, id) {
      return new Promise((resolve, reject) => {
        const db = getFirestore();
        deleteDoc(doc(db, "blogs", id)).then(() => {
          resolve()
        }).catch((err) => {
          reject(err)
        })
      })
    },
    getAllBlog() {
      return new Promise(async (resolve, reject) => {
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, "blogs"));
        if (querySnapshot) {
          resolve(querySnapshot)
        } else {
          reject()
        }
      })
    }

  },
  modules: {
  }
})
