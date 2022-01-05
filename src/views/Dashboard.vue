<template>
  <div id="myBlogs" class="pt-5 pb-3">
    <div class="container">
      <MyBlogs
        v-if="!createBlog && !createBlogStep2"
        @goToCreateBlog="goToCreateBlog"
      />
      <CreateBlog
        v-else-if="createBlog && !createBlogStep2"
        @cancelBlog="cancelBlog"
        @goToCreateBlogStep2="goToCreateBlogStep2"
      />
      <CreateBlogStep2 v-else @BlogValidatedOrCanceled="BlogValidatedOrCanceled" />
    </div>
  </div>
</template>


<script>
import MyBlogs from "@/components/MyBlogs.vue";
import CreateBlog from "@/components/CreateBlog.vue";
import CreateBlogStep2 from "@/components/CreateBlogStep2.vue";
import { mapGetters } from "vuex";
export default {
  name: "Dashboard",
  components: {
    MyBlogs,
    CreateBlog,
    CreateBlogStep2,
  },
  computed: {
    ...mapGetters(["createBlog", "createBlogStep2"]),
  },
  methods: {
    goToDashboard() {
      this.$store.state.createBlog = false;
      this.$store.state.createBlogStep2 = false;
    },
    goToCreateBlog() {
      this.$store.state.createBlog = true;
      this.$store.state.createBlogStep2 = false;
    },
    cancelBlog() {
      this.goToDashboard();
    },
    goToCreateBlogStep2() {
      this.$store.state.createBlog = false;
      this.$store.state.createBlogStep2 = true;
    },
    BlogValidatedOrCanceled() {
      this.goToDashboard();
    },
  },
};
</script>

<style>
</style>