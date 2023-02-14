<template>
  <p style="padding-bottom: 5px">
    Type your answer into the quotient box and press 'Enter'. If you get stuck,
    you can look in the box below for help.
  </p>
  <div class="input-line">
    <span
      v-for="digit in $store.state.divisorArray"
      :key="digit.index"
      class="divisor-placeholder"
      >{{ digit }}</span
    >
    <span class="quotient"
      ><span v-for="(digit, index) in $store.state.dividendArray" :key="index"
        ><input
          :disabled="
            $store.state.dividendIndex != index || !$store.state.dividing
          "
          type="number"
          class="quotient-digit"
          ref="quotientDigits"
          min="0"
          max="9"
          @keyup.enter="checkQuotient" /></span
    ></span>
  </div>
  <div class="problem-line">
    <span class="divisor" :class="{ highlighted: $store.state.dividing }">
      <span
        v-for="(digit, index) in $store.state.divisorArray"
        :key="index"
        class="divisor-digit"
        >{{ digit }}</span
      >
    </span>
    <span class="dividend"
      ><span
        v-for="(digit, index) in $store.state.dividendArray"
        :key="index"
        class="dividend-digit"
        ref="dividendDigits"
        >{{ digit }}</span
      ></span
    >
    <span class="placeholder"></span>
  </div>
  <ProblemNextSteps v-if="$store.state.dividendIndex >= 1" />
  <ProblemNextSteps v-if="$store.state.dividendIndex >= 2" />
  <ProblemNextSteps v-if="$store.state.dividendIndex >= 3" />
  <ProblemNextSteps v-if="$store.state.dividendIndex >= 4" />
  <ProblemNextSteps v-if="$store.state.dividendIndex >= 5" />
  <ProblemNextSteps v-if="$store.state.dividendIndex >= 6" />
  <ProblemNextSteps v-if="$store.state.dividendIndex >= 7" />
  <ProblemNextSteps v-if="$store.state.dividendIndex >= 8" />
  <ProblemNextSteps v-if="$store.state.dividendIndex >= 9" />
  <ProblemNextSteps v-if="$store.state.dividendIndex >= 10" />
  <div class="prompt-buttons">
    <button
      v-if="!$store.state.dividing"
      class="purp-btn"
      style="margin-bottom: 5px"
      @click="divide"
    >
      Start dividing
    </button>
    <button
      v-if="!$store.state.dividing"
      class="purp-btn"
      @click="$emit('startOver')"
    >
      Start over
    </button>
  </div>
</template>

<script>
import ProblemNextSteps from "./ProblemNextSteps.vue";
import { toRaw } from "vue";

export default {
  name: "ProblemDisplay",
  components: {
    ProblemNextSteps,
  },
  data() {
    return {
      quotientInput: undefined,
    };
  },
  emits: ["startOver"],
  methods: {
    divide() {
      if (!this.$store.state.dividing) {
        this.$store.commit("startDividing");
      }

      const divisor = this.$store.getters.divisor;
      const currentDividend =
        this.$store.state.dividendArray[this.$store.state.dividendIndex];
      this.$store.commit("setSubDividend", currentDividend);
      const quotient = Math.floor(this.$store.state.subDividend / divisor);
      this.$store.commit("setExpectedQuotient", quotient);
      this.highlightSpan();
    },
    highlightSpan() {
      this.$store.commit("highlightCurrentSpan");
    },
    removeHighlights() {
      this.$store.commit("removeHighlights");
    },
    checkQuotient(e) {
      if (
        e.target.value == this.$store.state.expectedQuotient &&
        e.target.value == 0
      ) {
        this.expandSubDividend();
      } else if (e.target.value == this.$store.state.expectedQuotient) {
        this.advanceDigit();
      } else {
        console.log("Wrong");
      }
    },
    advanceDigit() {
      this.removeHighlights();
      this.$store.commit("incrementDividendIndex");
      this.divide();
    },
    expandSubDividend() {
      this.$store.commit("incrementDividendIndex");
      const divisor = this.$store.getters.divisor;
      const currentDividend = (this.$store.state.subDividend +=
        this.$store.state.dividendArray[this.$store.state.dividendIndex]);
      this.$store.commit("setSubDividend", currentDividend);
      const quotient = Math.floor(this.$store.state.subDividend / divisor);
      this.$store.commit("setExpectedQuotient", quotient);
      this.highlightSpan();
    },
  },
  mounted() {
    this.$store.commit("setQuotientSpans", toRaw(this.$refs.quotientDigits));
    this.$store.commit("setDividendSpans", toRaw(this.$refs.dividendDigits));
  },
};
</script>

<style>
p {
  font-size: large;
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

/* .divisor {
  margin-right: 7px;
} */

.highlighted {
  color: #19bf16;
}

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

.prompt-buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1em;
  width: 10em;
}
</style>
