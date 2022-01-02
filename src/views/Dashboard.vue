<template>
  <div id="myBlogs" class="pt-5 pb-3">
    <div class="container">
      <MyBlogs v-if="!createBlog" @goToCreateBlog="goToCreateBlog"/>
      <CreateBlog v-else @cancelBlog="cancelBlog" />
    </div>
  </div>
</template>


<script>
import MyBlogs from "@/components/MyBlogs.vue";
import CreateBlog from "@/components/CreateBlog.vue";
import { mapGetters } from "vuex";
export default {
  name: "Dashboard",
  components: {
    MyBlogs,
    CreateBlog,
  },
  computed: {
    ...mapGetters(["createBlog"]),
  },
  methods: {
    goToCreateBlog() {
      this.$store.state.createBlog = true;
    },
    cancelBlog(){
      this.$store.state.createBlog = false;
    }
  },
};
</script>

<style>
</style>