<template>
  <nav>
    <img
      src="@/assets/images/square-math-visualizer-1.png"
      alt="Math visualizer logo"
      class="logo"
    />
    <div class="nav-content">
      <router-link to="/" class="home-link" v-if="$route.path !== '/'"
        >Home</router-link
      >
    </div>
  </nav>
  <div class="container">
    <router-view />
  </div>
</template>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
}

body {
  min-height: 100%;
  background-color: #f9f9f9;
  font-size: x-large;
  line-height: 1.5;
  font-family: "Cabin", sans-serif;
}

@media (max-width: 768px) {
  body {
    font-size: medium;
  }
}

html {
  overflow-y: scroll;
  height: 100%;
}

nav {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.home-link {
  margin: 0.75em 0 0 9.5em;
  font-size: xxx-large;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-bottom: 5em;
  background-size: 100%;
  background-image: linear-gradient(
      45deg,
      rgba(193, 133, 253, 0.5) 0%,
      rgba(249, 249, 249, 0.5) 100%
    ),
    url("./assets/images/landing-page-background.jpg");
}

.logo {
  width: 8em;
  height: 8em;
}
</style>
