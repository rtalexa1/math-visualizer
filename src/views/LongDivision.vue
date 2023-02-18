<template>
  <div class="visualization-container">
    <h1>Long Division</h1>
    <!-- <p style="font-size: medium">
      Note: Even though it is useful to divide with divisors that are greater
      than their dividends, this tool is made to practice problems in which the
      divisor is less than or equal to the dividend.
    </p> -->
    <form v-if="gettingNumberInput" @submit.prevent>
      <p v-show="errorMessage" class="error">{{ errorMessage }}</p>
      <div class="numbers-form">
        <div class="labels">
          <label for="divisor"
            >Enter number of divisor digits
            <span style="font-size: small">(max 3)</span></label
          >
          <label for="dividend"
            >Enter number of divident digits
            <span style="font-size: small">(max 9)</span></label
          >
        </div>
        <div class="inputs">
          <input
            type="number"
            id="divisor"
            v-model="divisorDigitCount"
            class="number-input"
            min="1"
            max="3"
          />
          <input
            type="number"
            id="dividend"
            v-model="dividendDigitCount"
            class="number-input"
            min="1"
            max="9"
          />
        </div>
      </div>
      <div class="button-container">
        <button @click="generateProblem" class="purp-btn">
          Generate a problem
        </button>
      </div>
    </form>
    <div v-else class="problem">
      <ProblemDisplay @start-over="startOver" />
    </div>
  </div>
  <CurrentStep />
</template>

<script>
import ProblemDisplay from "@/components/ProblemDisplay.vue";
import CurrentStep from "@/components/CurrentStep.vue";

export default {
  name: "LongDivision",
  components: {
    ProblemDisplay,
    CurrentStep,
  },
  data() {
    return {
      divisorDigitCount: 1,
      dividendDigitCount: 1,
      gettingNumberInput: true,
      errorMessage: "",
    };
  },
  methods: {
    generateProblem() {
      if (this.divisorDigitCount > this.dividendDigitCount) {
        this.errorMessage =
          "Number of dividend digits should be greater than or equal to number of divisor digits";
        return;
      }
      this.generateDivisor();
      this.generateDividend();
      this.gettingNumberInput = false;
    },
    generateDivisor() {
      let numString = "" + this.randomNumber(1, 9).toString();
      for (let i = 1; i < this.divisorDigitCount; i++) {
        numString += Math.floor(Math.random() * 9).toString();
      }
      this.$store.commit("setDivisorArray", Array.from(numString));
    },
    generateDividend() {
      let numString = "" + this.randomNumber(1, 9).toString();
      for (let i = 1; i < this.dividendDigitCount; i++) {
        numString += Math.floor(Math.random() * 9).toString();
      }
      this.$store.commit("setDividendArray", Array.from(numString));
    },
    randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    startOver() {
      this.divisorDigitCount = 1;
      this.dividendDigitCount = 1;
      this.gettingNumberInput = true;
      this.$store.commit("resetDivisorArray");
      this.$store.commit("resetDividendArray");
      this.$store.commit("resetQuotientSpans");
      this.$store.commit("resetDividendSpans");
      this.$store.commit("resetDividendIndex");
    },
  },
};
</script>

<style lang="scss">
.visualization-container {
  border: solid 2px #c185fd;
  border-radius: 15px 15px 0 0;
  width: 25em;
  min-height: 15em;
  padding: 1em;
}

.numbers-form {
  display: flex;
  justify-content: center;
  padding-top: 0.5em;
}

.error {
  color: #ff2323;
  font-size: medium;
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
  width: 2em;
  height: 1.5em;
  font: inherit;
  font-size: large;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.5em;
}

.purp-btn {
  margin-top: 3px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  border: solid 2px #ffffff;
  border-radius: 5px;
  width: 60%;
  padding: 0.4em;
  color: #ffffff;
  background: #c185fd;
  cursor: pointer;
  font-family: inherit;
  transition: color 100ms, background-color 100ms;

  &:hover,
  &:focus,
  &:active {
    color: #c185fd;
    background: #ffffff;
  }
}

.problem {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: xx-large;
}
</style>
