<template>
  <div class="container home-display">
    <h2>Click a link to visualize and practice a skill</h2>
    <div class="nav-links">
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

<style>
.home-display {
  margin-top: 2em;
  margin-left: -27em;
  border: solid 2px #c185fd;
  border-radius: 15px;
  width: 390px;
  height: 580px;
  background: #f9f9f9;
}
</style>
