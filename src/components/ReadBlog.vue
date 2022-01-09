<template>
  <div class="container">
    <div class="row mb-5">
      <div class="">
        <button class="btn btn-secondary" @click="backToList">Return</button>
      </div>
    </div>
    <div class="row justify-content-center mb-5">
      <div class="col-md-8">
        <div class="contaienr">
          <div class="row mb-4">
            <img :src="coverImgUrl" class="col-12" alt="" />
          </div>
          <div class="row">
            <div class="mb-3 col-12 text-start">
              <h1>
                <label class="form-label fw-bold">title : </label>
                <span>{{ title }}</span>
              </h1>
            </div>
            <div class="mb-3 col-12 text-start">
              <label class="form-label fw-bold">Description : </label>
              <p>{{ blogBody }}</p>
            </div>
            <div class="col-12 text-start">
              <div class="container mt-3">
                <div class="row row-cols-1 row-cols-md-2 g-4">
                  <div
                    class="col"
                    v-for="(vedio, index) in videosUrl"
                    :key="index"
                  >
                    <div class="card">
                      <video controls class="card-img-top">
                        <source :src="vedio" type="video/mp4" alt="..." />
                      </video>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "ReadBlog",
  computed: {},
  data() {
    return {
      videosUrl: [],
      title: null,
      blogBody: null,
      coverImgUrl: null,
      id: null,
    };
  },
  async beforeCreate() {
    await this.$store
      .dispatch("getBlog")
      .then((res) => {
        this.blogBody = res.blogBody;
        this.title = res.title;
        this.videosUrl = res.videosUrl;
        this.coverImgUrl = res.coverImgUrl;
        this.id = res.id;
      })
      .catch(() => {
        console.log("No such document!");
      });
  },
  methods: {
    backToList() {
      this.$emit("readBlog");
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
}
</style>