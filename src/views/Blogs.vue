<template>
  <div id="blogs" class="container pt-5 pb-5">
    <Blogs v-if="!blogSingle" @readBlog="readBlog" />
    <ReadBlog v-else @readBlog="readBlog" />
  </div>
</template>
  <script>
import Blogs from "@/components/Blogs.vue";
import ReadBlog from "@/components/ReadBlog.vue";

export default {
  components: {
    Blogs,
    ReadBlog
  },
  data() {
    return {
      blogSingle: false,
    };
  },
  methods: {
    readBlog(id){
      this.blogSingle = !this.blogSingle;
      this.$store.state.idBlog = id;
    }
  },
};
</script>
<style lang="scss">
#blogs {
  min-height: 85vh;
}
</style>
