<template>
  <div class="body d-flex align-items-center">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1 class="mb-3">Welcome to the Blog Platform</h1>
          <h5>Create Your Blog Now</h5>
          <button class="btn btn-primary w-25">Create</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeBody",
  props: {},
};
</script>


<style scoped lang="scss">
.body {
  background-image: url("../assets/img/hero-bg.png");
  height: 90vh;
}
</style>
