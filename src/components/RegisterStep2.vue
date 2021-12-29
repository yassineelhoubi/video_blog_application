<template>
  <h5 class="card-title">Complete You Registration</h5>
  <div class="card">
    <div class="card-body form-group">
      <label for="img" class="mt-2">Profil Image</label>
      <input
        type="file"
        class="form-control mt-2"
        @change="processFile($event)"
      />
      <label for="fName" class="mt-2">First Name :</label>
      <input
        type="text"
        class="form-control form-control-lg mt-2"
        placeholder="First Name"
        v-model="fName"
      />

      <label for="lName" class="mt-2">Last Name :</label>
      <input
        type="text"
        class="form-control form-control-lg mt-2"
        placeholder="Last Name"
        v-model="lName"
      />
      <label for="nbrPhone" class="mt-2">Number Phone</label>
      <input
        type="number"
        class="form-control form-control-lg mt-2"
        placeholder="Number Phone"
        v-model="nbrPhone"
      />
      <button
        class="btn btn-primary mt-2 text-white"
        @click.prevent="createUser"
      >
        Register
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "RegisterStep2",
  data() {
    return {
      lName: "",
      fName: "",
      nbrPhone: "",
      img: "",
    };
  },
  methods: {
    processFile(event) {
      this.img = event.target.files[0];
    },
    createUser() {
      const data = {
        lName: this.lName,
        fName: this.fName,
        nbrPhone: this.nbrPhone,
        img: this.img,
        imgPath: this.img.name,
      };

      this.$store.dispatch("createUser", data);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>