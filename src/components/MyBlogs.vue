<template>
  <div class="container">
    <div class="row mb-5">
      <h1>Hello to Your Dashboard</h1>
      <div class="">
        <button class="btn btn-primary" @click="goToCreateBlog">
          Create New Blog
        </button>
      </div>
    </div>
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="blog in blogs" :key="blog.id">
        <div class="card">
          <img :src="blog.coverImgUrl" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">{{ blog.title }}</h5>
            <p class="card-text">{{ blog.blogBody }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyBlogs",
  data() {
    return {
      blogs: [],
    };
  },
  beforeCreate() {
    this.$store
      .dispatch("getMyBlogs")
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
    goToCreateBlog() {
      this.$emit("goToCreateBlog");
    },
  },
};
</script>

<style lang="scss">
.card {
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