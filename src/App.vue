<template>
  <nav>
    <router-link to="/"
      ><img
        src="@/assets/images/square-math-visualizer-1.png"
        alt="Math visualizer logo"
        class="logo"
    /></router-link>
  </nav>
  <div class="container">
    <router-view />
  </div>
  <footer>
    <span>Copyright 2023 RT Alexander</span> |
    <span>Contact: rtalexa1@gmail.com</span>
  </footer>
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
  overflow: scroll;
  min-height: 100%;
  background-color: #f9f9f9;
  font-size: x-large;
  line-height: 1.5;
  font-family: "Cabin", sans-serif;
}

html {
  overflow-y: scroll;
  height: 100%;
}

nav {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  max-height: 5em;
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
}

.logo {
  width: 5em;
  height: 5em;
}

footer {
  padding: 2px 10px;
  background: #f9f9f9;
  font-size: medium;
  text-align: center;
}

@media (max-width: 768px) {
  body {
    font-size: medium;
  }

  footer {
    font-size: small;
  }
}
</style>
