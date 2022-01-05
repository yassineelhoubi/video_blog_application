<template>
  <div id="blogs" class="container pt-5 pb-5">
    <Blogs/>
  </div>
</template>
  <script>
  import Blogs from "@/components/Blogs.vue";
  export default {
    components: {
    Blogs,
    },
  }
  </script>
<style lang="scss">
#myBlogs {
  min-height: 85vh;
}
</style>
