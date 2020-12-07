<template>
  <div class="home">
    home
  </div>
</template>

<script>
export default {
  name: "Home",
  mounted() {
    console.log(this,location,document.body.offsetHeight)
  },
};
</script>
