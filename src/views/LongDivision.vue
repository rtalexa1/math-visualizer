<template>
  <div class="visualization-container">
    <h1>Long Division</h1>
    <div class="problem">
      <form @submit.prevent>
        <div class="numbers-form">
          <div class="labels">
            <label for="divisor">Enter number of divisor digits</label>
            <label for="dividend">Enter number of divident digits</label>
          </div>
          <div class="inputs">
            <input
              type="number"
              id="divisor"
              v-model="divisorDigits"
              class="number-input"
            />
            <input
              type="number"
              id="dividend"
              v-model="dividendDigits"
              class="number-input"
            />
          </div>
        </div>
        <div class="button-container">
          <button @click="generateProblem" class="purp-btn">
            Generate a problem
          </button>
        </div>
      </form>
    </div>
  </div>
  <div class="current-step">Visualize the current step here</div>
</template>

<script>
export default {
  name: "LongDivision",
  data() {
    return {
      divisorDigits: undefined,
      dividendDigits: undefined,
      divisor: undefined,
      dividend: undefined,
    };
  },
  methods: {
    generateProblem() {
      this.generateDivisor();
      this.generateDividend();
      console.log(this.divisor);
      console.log(this.dividend);
    },
    generateDivisor() {
      let numString = "" + this.randomNumber(1, 9).toString();
      for (let i = 1; i < this.divisorDigits; i++) {
        numString += Math.floor(Math.random() * 9).toString();
      }
      this.divisor = parseInt(numString);
    },
    generateDividend() {
      let numString = "" + this.randomNumber(1, 9).toString();
      for (let i = 1; i < this.dividendDigits; i++) {
        numString += Math.floor(Math.random() * 9).toString();
      }
      this.dividend = parseInt(numString);
    },
    randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
  },
};
</script>

<style>
.visualization-container {
  border: solid 2px #c185fd;
  border-radius: 15px 15px 0 0;
  width: 25em;
  height: 10em;
  padding: 1em;
}

.problem {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.numbers-form {
  display: flex;
  justify-content: center;
}

.labels {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 0.7em;
}

.inputs {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.number-input {
  width: 3em;
  height: 2em;
  font: inherit;
  font-size: medium;
}

.button-container {
  display: flex;
  flex-direction: column;
}

.purp-btn {
  margin-top: 3px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  border: solid 2px #c185fd;
  border-radius: 5px;
  padding: 0.4em;
  color: #000000;
  cursor: pointer;
  font-family: inherit;
}

.current-step {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: solid 2px #c185fd;
  border-top: 0;
  border-radius: 0 0 15px 15px;
  width: 25em;
  height: 5em;
}
</style>
