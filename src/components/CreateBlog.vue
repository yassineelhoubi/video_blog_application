<template>
  <div class="container">
    <div class="row mb-5">
      <h1>Hello to Your Dashboard</h1>
      <div class="">
        <button class="btn btn-secondary" @click="cancelBlog">Cancel</button>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <form>
          <div class="form-group pt-3 pb-3">
            <label for="title ">Blog Title</label>
            <input
              type="text"
              class="form-control"
              id="title"
              name="title"
              placeholder="Title"
              v-model="title"
            />
          </div>
          <div class="form-group pb-3">
            <label for="coverImg">Cover Image</label>
            <input
              type="file"
              class="form-control"
              id="coverImg"
              name="coverImg"
              @change="processCoverImg"
            />
          </div>
          <div class="form-group pb-3">
            <label for="exampleFormControlTextarea1">Blog Body</label>
            <textarea
              class="form-control"
              id="blogBody"
              name="blogBody"
              rows="3"
              v-model="blogBody"
            ></textarea>
          </div>
          <div class="form-group pb-3">
            <label for="coverImg">Add Videos For Your Blog </label>
            <input
              type="file"
              class="form-control"
              id="blogVds"
              name="blogVds"
              multiple
              @change="processVds"
            />
          </div>
          <div></div>
          <div class="form-group pb-3">
            <button
              class="btn btn-primary"
              type="submit"
              @click.prevent="submit"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateBlog",
  data() {
    return {
      videos: [],
      videosUrl: [],
      title: null,
      blogBody: null,
      coverImg: null,
      vdsCounter: 1,
    };
  },
  methods: {
    cancelBlog() {
      this.$emit("cancelBlog");
    },
    goToCreateBlogStep2() {
      this.$emit("goToCreateBlogStep2");
    },
    processCoverImg(event) {
      this.coverImg = event.target.files[0];
    },
    processVds(e) {
      console.log(e.target.files);
      for (let i = 0; i < e.target.files.length; i++) {
        this.videos.push(e.target.files[i]);
      }
    },
    submit() {
      this.$store.state.loader = true;
      if (this.vdsCounter <= this.videos.length) {
        let indexOf = this.vdsCounter;
        this.uploadVds(this.videos[indexOf - 1]);
      } else {
        this.uploadCoverImg();
      }
    },
    uploadVds(video) {
      this.$store
        .dispatch("uploadVds", video)
        .then((url) => {
          this.vdsCounter++;
          this.videosUrl.push(url);
          this.submit();
        })
        .catch((err) => {
          console.log(err);
          this.$store.state.loader = false;
        });
    },
    uploadCoverImg() {
      this.$store
        .dispatch("uploadCoverImg", this.coverImg)
        .then((url) => {
          this.coverImgUrl = url;
          this.createBlogStep1();
        })
        .catch((err) => {
          console.log(err);
          this.$store.state.loader = false;
        });
    },

    createBlogStep1() {
      const data = {
        title: this.title,
        blogBody: this.blogBody,
        coverImgUrl: this.coverImgUrl,
        videosUrl: this.videosUrl,
        isProvisional: true,
        idAuthor: this.$store.state.user.uid,
        createdAt: new Date().getTime(),
      };

      this.$store
        .dispatch("createBlogStep1", data)
        .then((res) => {
          this.$store.state.idBlog = res.id;
          this.$store.state.loader = false;
          this.goToCreateBlogStep2();
        })
        .catch((err) => {
          console.log(err);
          this.$store.state.loader = false;
        });
    },
  },
};
</script>

<style>
</style>