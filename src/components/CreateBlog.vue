<template>
  <div class="container">
    <div class="row mb-5">
      <h1>Hello to Your Dashboard</h1>
      <div class="">
        <button class="btn btn-secondary" @click="cancelBlog">Cancel</button>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-6">
        create new blog
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateBlog",
  methods: {
    cancelBlog() {
      this.$emit("cancelBlog");
    },
  },
};
</script>

<style>
</style>