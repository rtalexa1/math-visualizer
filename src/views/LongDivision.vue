<template>
  <div class="visualization-container">
    <h1>Long Division</h1>
    <br />
    <form v-if="gettingNumberInput" @submit.prevent>
      <div class="numbers-form">
        <div class="labels">
          <label for="divisor"
            >Enter number of divisor digits
            <span style="font-size: small">(max 5)</span></label
          >
          <label for="dividend"
            >Enter number of divident digits
            <span style="font-size: small">(max 10)</span></label
          >
        </div>
        <div class="inputs">
          <input
            type="number"
            id="divisor"
            v-model="divisorDigitCount"
            class="number-input"
            min="1"
            max="5"
          />
          <input
            type="number"
            id="dividend"
            v-model="dividendDigitCount"
            class="number-input"
            min="1"
            max="10"
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
      <div class="input-line">
        <span
          v-for="digit in divisorArray"
          :key="digit.index"
          class="divisor-placeholder"
          >{{ digit }}</span
        >
        <span class="quotient"
          ><span v-for="index in dividendArray" :key="index"
            ><input
              type="number"
              class="quotient-digit"
              ref="quotientDigits" /></span
        ></span>
      </div>
      <div class="problem-line">
        <span class="divisor">
          <span
            v-for="(digit, index) in divisorArray"
            :key="index"
            class="divisor-digit"
            >{{ digit }}</span
          >
        </span>
        <span class="dividend"
          ><span
            v-for="(digit, index) in dividendArray"
            :key="index"
            class="dividend-digit"
            ref="dividendDigits"
            >{{ digit }}</span
          ></span
        >
        <span class="placeholder"></span>
      </div>
    </div>
  </div>
  <div class="current-step">Visualize the current step here</div>
</template>

<script>
import { toRaw } from "vue";

export default {
  name: "LongDivision",
  data() {
    return {
      divisorDigitCount: 1,
      dividendDigitCount: 1,
      divisorArray: undefined,
      dividendArray: undefined,
      quotient: undefined,
      remainder: undefined,
      gettingNumberInput: true,
      currentStepText: "",
      currentDividendDigit: undefined,
      dividendDigits: [],
      quotientDigits: [],
    };
  },
  methods: {
    generateProblem() {
      this.generateDivisor();
      this.generateDividend();
      this.quotient = this.computeQuotient;
      this.remainder = this.computeRemainder;
      this.gettingNumberInput = false;
    },
    generateDivisor() {
      let numString = "" + this.randomNumber(1, 9).toString();
      for (let i = 1; i < this.divisorDigitCount; i++) {
        numString += Math.floor(Math.random() * 9).toString();
      }
      this.divisorArray = Array.from(numString);
    },
    generateDividend() {
      let numString = "" + this.randomNumber(1, 9).toString();
      for (let i = 1; i < this.dividendDigitCount; i++) {
        numString += Math.floor(Math.random() * 9).toString();
      }
      this.dividendArray = Array.from(numString);
    },
    randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    divide() {
      toRaw(this.dividendDigits)[0].style.border = "1px solid red";
      // this.$refs.dividendDigits[0].style.border = "1px solid red";
      // this.$refs.quotientDigits[0].style.border = "1px solid red";
      // for (let i = 0; i < this.dividendDigitCount.length; i++) {
      //   this.$refs.dividendDigits[i].style.border = "1px solid red";
      //   this.$refs.quotientDigits[i].style.border = "1px solid red";
      // }
    },
  },
  computed: {
    computeQuotient: function () {
      return Math.floor(
        this.dividendArray.join("") / this.divisorArray.join("")
      );
    },
    computeRemainder: function () {
      return (
        this.dividendArray.join("") - this.divisorArray.join("") * this.quotient
      );
    },
  },
  updated() {
    this.dividendDigits = this.$refs.dividendDigits;
    this.quotientDigits = this.$refs.quotientDigits;
    this.divide();
  },
};
</script>

<style lang="scss">
.visualization-container {
  border: solid 2px #c185fd;
  border-radius: 15px 15px 0 0;
  width: 25em;
  height: 15em;
  padding: 1em;
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

.input-line {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.divisor-placeholder {
  opacity: 0;
  display: inline-block;
  margin: 3.5px;
  width: 30px;
  text-align: center;
}

.quotient {
  padding-left: 5px;
}

.quotient-digit {
  display: inline-block;
  margin: 3.5px;
  width: 30px;
  height: 1.5em;
  font: inherit;
  font-size: large;
}

.problem-line {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

// .divisor {
//   margin-right: 7px;
// }

.divisor-digit {
  display: inline-block;
  margin: 3.5px;
  width: 30px;
  text-align: center;
}

.dividend {
  border-top: solid 2px;
  border-left: solid 2px;
  padding-left: 5px;
}

.dividend-digit {
  display: inline-block;
  margin: 3.5px;
  width: 30px;
  text-align: center;
}

.placeholder {
  border-top: 2px solid;
  width: 5px;
  height: 50px;
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
