<template>
  <div class="home">
    <HomeBody />
  </div>
</template>

<script>
// @ is an alias to /src
import HomeBody from "@/components/HomeBody.vue";

export default {
  name: "Home",
  components: {
    HomeBody,
  },
};
</script>
