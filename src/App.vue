<template>
  <nav>
    <img
      src="@/assets/images/square-math-visualizer-1.png"
      alt="Math visualizer logo"
      class="logo"
    />
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

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-bottom: 5em;
}

.logo {
  width: 8em;
  height: 8em;
}
</style>
