<template>
  <div class="container">
    <div class="row justify-content-center mb-5">
      <div class="col-md-8">
        <div class="contaienr">
          <div class="row mb-4">
            <img :src="coverImgUrl" class="col-12" alt="" />
          </div>
          <div class="row">
            <div class="mb-3 col-12 text-start">
              <label class="form-label fw-bold">Title : </label>
              <input
                type="text"
                class="form-control"
                placeholder="Title"
                v-model="title"
              />
            </div>
            <div class="mb-3 col-12 text-start">
              <label class="form-label fw-bold">Description : </label>
              <textarea
                class="form-control"
                rows="3"

                v-model="blogBody"
                placeholder="Description"
              ></textarea>
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
        <div class="form-group  pt-3">
<div class="form-label fw-bold">Submit Your Blog To Be Available</div>
              <button class="btn btn-outline-primary me-2 w-25  " @click="submit">Submit</button>
              <button class="btn btn-outline-danger " @click="cancel">Cancel</button>
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
    submit() {
      const data = {
        title: this.title,
        blogBody: this.blogBody,
        isProvisional: false,
        id: this.id,
      };
      this.$store
        .dispatch("validateBlog", data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cancel(){
      this.$store.dispatch("deleteBlog",this.id).then(()=>{
        console.log("deleted")
      }).catch((err) => {
        console.log(err);
      })
    }
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