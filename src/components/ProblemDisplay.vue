<template>
  <p style="padding-bottom: 5px; font-size: large">
    Type your answers into the boxes and press 'Enter'. If you get stuck, you
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
            $store.state.dividendIndex != index ||
            !$store.state.dividing ||
            correctQuotientInput
          "
          type="number"
          class="quotient-digit"
          ref="quotientDigits"
          min="0"
          max="9"
          :id="index"
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
  <ProblemNextSteps
    v-if="stepNumber >= 1"
    @reset-quotient="correctQuotientInput = false"
    @display-answer="displayAnswer = true"
  />
  <ProblemNextSteps
    v-if="stepNumber >= 2"
    @reset-quotient="correctQuotientInput = false"
    @display-answer="displayAnswer = true"
  />
  <ProblemNextSteps
    v-if="stepNumber >= 3"
    @reset-quotient="correctQuotientInput = false"
    @display-answer="displayAnswer = true"
  />
  <ProblemNextSteps
    v-if="stepNumber >= 4"
    @reset-quotient="correctQuotientInput = false"
    @display-answer="displayAnswer = true"
  />
  <ProblemNextSteps
    v-if="stepNumber >= 5"
    @reset-quotient="correctQuotientInput = false"
    @display-answer="displayAnswer = true"
  />
  <ProblemNextSteps
    v-if="stepNumber >= 6"
    @reset-quotient="correctQuotientInput = false"
    @display-answer="displayAnswer = true"
  />
  <ProblemNextSteps
    v-if="stepNumber >= 7"
    @reset-quotient="correctQuotientInput = false"
    @display-answer="displayAnswer = true"
  />
  <ProblemNextSteps
    v-if="stepNumber >= 8"
    @reset-quotient="correctQuotientInput = false"
    @display-answer="displayAnswer = true"
  />
  <ProblemNextSteps
    v-if="stepNumber >= 9"
    @reset-quotient="correctQuotientInput = false"
    @display-answer="displayAnswer = true"
  />
  <ProblemNextSteps
    v-if="stepNumber >= 10"
    @reset-quotient="correctQuotientInput = false"
    @display-answer="displayAnswer = true"
  />
  <div v-if="!$store.state.dividing" class="prompt-buttons">
    <button class="purp-btn" style="margin-bottom: 5px" @click="divide">
      Start dividing
    </button>
    <button class="purp-btn" @click="$emit('startOver')">Start over</button>
  </div>
  <div v-if="displayAnswer" class="wrapped-problem">
    <p style="font-size: xx-large">
      Quotient: {{ $store.getters.quotient }}r {{ $store.getters.remainder }}
    </p>
    <button class="purp-btn" @click="$emit('startOver')">Start over</button>
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
      stepNumber: 0,
      correctQuotientInput: false,
      displayAnswer: false,
    };
  },
  emits: ["startOver"],
  methods: {
    checkQuotient(e) {
      if (e.target.value == this.$store.state.expectedQuotient) {
        const quotientSpan =
          this.$store.state.quotientSpans[this.$store.state.dividendIndex];
        quotientSpan.style.backgroundColor = "";
        quotientSpan.style.border = "solid 1px #19bf16";
        this.correctQuotientInput = true;
        this.startMultiplying();
      } else {
        const quotientSpan =
          this.$store.state.quotientSpans[this.$store.state.dividendIndex];
        quotientSpan.style.backgroundColor = "orange";
        quotientSpan.style.border = "solid 1px red";
        quotientSpan.classList.add("wiggle");
      }
    },
    startMultiplying() {
      this.stepNumber++;
      this.$store.commit("setStep", "multiply");
      this.$store.dispatch("calculateExpectedProduct");
    },
    divide() {
      if (!this.$store.state.dividing) {
        this.$store.commit("startDividing");
        this.$store.commit("setStep", "divide");
      }

      const divisor = this.$store.getters.divisor;
      const currentDividend = this.$store.state.dividendArray[0];
      this.$store.commit("setNextStepsIndex");
      this.$store.commit("setSubDividend", currentDividend);
      const quotient = Math.floor(this.$store.state.subDividend / divisor);
      const quotientInput = document.getElementById(
        `${this.$store.state.dividendIndex}`
      );
      window.setTimeout(function () {
        quotientInput.focus();
      }, 0);
      this.$store.commit("setExpectedQuotient", quotient);
      this.highlightSpan();
    },
    highlightSpan() {
      this.$store.commit("highlightCurrentSpan");
    },
    removeHighlights() {
      this.$store.commit("removeHighlights");
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
  flex-wrap: nowrap;
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

.wiggle {
  animation-name: wiggle;
  animation-duration: 700ms;
}

@keyframes wiggle {
  from {
    margin-right: 0;
  }

  10% {
    margin-right: 15px;
  }

  20% {
    margin-right: 0;
  }

  30% {
    margin-right: 0;
    margin-left: 15px;
  }

  40% {
    margin-right: 0;
    margin-left: 0;
  }

  50% {
    margin-right: 15px;
  }

  60% {
    margin-right: 0;
  }

  70% {
    margin-right: 0;
    margin-left: 15px;
  }

  80% {
    margin-right: 0;
    margin-left: 0;
  }

  to {
    margin-left: 0;
    margin-right: 0;
  }
}

.wrapped-problem {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5px;
}
</style>
