<template>
  <div id="myBlogs" class="pt-5 pb-3">
    <h1>Hello to Your Dashboard</h1>
    <div class="container mb-5 d-flex justify-content-center">
      <button class="btn btn-primary">Create New Blog</button>
    </div>
    <div class="container">
      <MyBlogs />
    </div>
  </div>
</template>


<script>
import MyBlogs from "@/components/MyBlogs.vue";
export default {
  name: "Dashboard",
  components: {
    MyBlogs,
  },
};
</script>

<style>
</style>