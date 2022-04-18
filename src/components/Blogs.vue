<template>
  <div class="row row-cols-1 row-cols-md-3 g-4">
    <div class="col" v-for="blog in blogs" :key="blog.id">
      <div class="card" @click="readBlog(blog.id)">
        <img :src="blog.coverImgUrl" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">{{ blog.title }}</h5>
          <p class="card-text">{{ blog.blogBody }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Blogs",
  data() {
    return {
      blogs: [],
    };
  },
  async beforeCreate() {
    await this.$store
      .dispatch("getAllBlog")
      .then((res) => {
        res.forEach((doc) => {
          this.blogs.push(doc.data());
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    readBlog(id) {
      this.$emit("readBlog", id);
    },
  },
};
</script>

<style lang="scss">
.card {
  cursor: pointer;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  }
  .card-img-top {
    height: 200px;
    object-fit: cover;
  }
  .card-body {
    .card-title {
      height: 30px;
      overflow: hidden;
    }
    .card-text {
      height: 110px;
      overflow: hidden;
    }
  }
}
</style>