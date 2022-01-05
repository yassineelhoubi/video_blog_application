<template>
  <div class="container">
    <div class="row justify-content-center mb-5">
      <div class="col-md-8">
        <div class="contaienr">
          <div class="row mb-4">
            <img :src="coverImgUrl" class="col-12" alt="" />
          </div>
          <div class="row">
            <div class="col-12 text-start">
              <h4><span class="fw-bold">Title :</span>{{title}}</h4>
            </div>
            <div class="col-12 text-start">
              <h4 class="fw-bold">Description :</h4>
              <p>{{blogBody}}</p>
            </div>
            <div class="col-12 text-start">
              <div class="container mt-3">
                <div class="row row-cols-1 row-cols-md-2 g-4">
                  <div class="col" v-for="(vedio,index) in videosUrl" :key="index">
                    <div class="card">
                      <video autoplay controls class="card-img-top">
                        <source
                          src="@/assets/img/VID-20220101-WA0008.mp4"
                          type="video/mp4"
                          alt="..."
                        />
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
  name: "CreateBlog",
  computed: {},
  data() {
    return {

      videosUrl: [],
      title: null,
      blogBody: null,
      coverImgUrl: null,
    };
  },
  async beforeCreate() {
    await this.$store
      .dispatch("getBlog")
      .then((res) => {
        console.log(res);
        this.blogBody = res.blogBody;
        this.title = res.title;
        this.videosUrl = res.videosUrl;
        this.coverImgUrl = res.coverImgUrl;
      })
      .catch(() => {
        console.log("No such document!");
      });
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