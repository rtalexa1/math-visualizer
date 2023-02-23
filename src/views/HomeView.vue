<template>
  <div class="home-background">
    <div class="container home-display">
      <h2>What is Math Visualizer?</h2>
      <p style="margin-bottom: 5px">
        We help you learn math by walking you through each step of the skill you
        want to learn. We'll give you a hand, but the work and the learning are
        yours!
      </p>
      <h2>Click a link to visualize and practice a skill</h2>
      <div class="nav-links">
        <ul>
          <li><router-link to="/long_division">Long Division</router-link></li>
        </ul>
      </div>
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
.home-background {
  width: 100%;
  min-height: 32em;
  background-size: 100%;
  background-image: linear-gradient(
      45deg,
      rgba(193, 133, 253, 0.5) 0%,
      rgba(249, 249, 249, 0.5) 100%
    ),
    url("../assets/images/landing-page-background.jpg");
}

.home-display {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 4em 0 0 4em;
  box-shadow: 12px 12px 0 0 #3e007b;
  border: solid 2px #3e007b;
  border-radius: 15px;
  width: 400px;
  height: 580px;
  padding: 12px;
  background: #f9f9f9;
}

li {
  margin-left: 1em;
}

@media (max-width: 1025px) {
  .home-display {
    margin: 1em;
  }
}

@media (max-width: 768px) {
  .home-background {
    background: #f9f9f9;
  }

  .home-display {
    margin: 0 auto 1em auto;
    box-shadow: 0 0 0 0;
    border: solid 5px #3e007b;
    width: 300px;
    height: 400px;
  }
}

@media (max-width: 300px) {
  .home-display {
    margin: 0 auto 1em auto;
    box-shadow: 0 0 0 0;
    border: solid 5px #3e007b;
    width: 250px;
    height: 400px;
  }
}
</style>
