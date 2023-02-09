<template>
  <div class="container">
    <h2>Click a link to visualize and practice a skill</h2>
    <div class="nav-links">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/long_division">Long Division</router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeView",
};
</script>

<style></style>
