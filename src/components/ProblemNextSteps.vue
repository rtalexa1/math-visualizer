<template>
  <div class="next-steps-container">
    <div class="next-step-line">
      <!-- <span id="placeholder"></span> -->
      <span
        v-for="(digit, index) in $store.state.dividendArray"
        :key="index"
        ref="extraStepsLineOne"
      ></span>
    </div>
    <div class="next-step-line">
      <span
        v-for="(digit, index) in $store.state.dividendArray"
        :key="index"
        ref="extraStepsLineTwo"
      ></span>
    </div>
  </div>
</template>

<script>
import { toRaw } from "vue";

export default {
  name: "ProblemNextSteps",
  data() {
    return {
      lineOneSpans: undefined,
      lineTwoSpans: undefined,
      expectedProduct: undefined,
    };
  },
  methods: {
    populateLineOneSpans() {
      const index = this.$store.state.dividendIndex;
      this.lineOneSpans[index].innerText = "-";
      this.lineOneSpans[
        index + 1
      ].innerHTML = `<input type="number" class="quotient-digit" min="0" max="9" id="product-input" />`;
      const productInput = document.getElementById("product-input");
      productInput.addEventListener("keyup", this.checkProduct);
      this.lineOneSpans[index + 1].style.borderBottom = "solid 2px";
    },
    checkProduct(e) {
      if (
        e.keyCode === 13 &&
        e.target.value == this.$store.state.expectedProduct
      ) {
        const productInput = document.getElementById("product-input");
        productInput.setAttribute("disabled", "");
        productInput.style.border = "2px solid #19bf16";
        productInput.style.padding = "1px";
        this.$store.commit("setStep", "subtract");
        this.$store.dispatch("calculateExpectedDifference");
        this.populateLineTwoSpans();
      } else if (
        e.keyCode === 13 &&
        e.target.value != this.$store.state.expectedProduct
      ) {
        console.log("Wrong");
      }
    },
    populateLineTwoSpans() {
      const index = this.$store.state.dividendIndex;
      this.lineTwoSpans[
        index + 1
      ].innerHTML = `<input type="number" class="quotient-digit" min="0" max="9" id="difference-input" />`;
      const differenceInput = document.getElementById("difference-input");
      differenceInput.addEventListener("keyup", this.checkDifference);
    },
    checkDifference(e) {
      if (
        e.keyCode === 13 &&
        e.target.value == this.$store.state.expectedDifference
      ) {
        const index = this.$store.state.dividendIndex;
        const differenceInputSpan = this.lineTwoSpans[index + 1];
        differenceInputSpan.innerText = `${this.$store.state.expectedDifference}`;
        this.$store.commit("setStep", "bringDown");
        this.bringDown();
      } else if (
        e.keyCode === 13 &&
        e.target.value != this.$store.state.expectedDifference
      ) {
        console.log("Wrong");
      }
    },
    bringDown() {
      const productInput = document.getElementById("product-input");
      productInput.style.border = "";
      const index = this.$store.state.dividendIndex;
      const newDigitSpan = this.lineTwoSpans[index + 2];
      newDigitSpan.innerText = `${this.$store.state.dividendArray[index + 1]}`;
      // newDigitSpan.setAttribute("animation-name", "bring-down");
      // newDigitSpan.setAttribute("animation-duration", "4s");
    },
  },
  mounted() {
    this.lineOneSpans = toRaw(this.$refs.extraStepsLineOne);
    this.lineTwoSpans = toRaw(this.$refs.extraStepsLineTwo);
    this.populateLineOneSpans();
  },
};
</script>

<style scoped>
.next-steps-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 160px;
}

.next-steps-column {
  width: 30px;
}

span {
  display: inline-block;
  width: 37px;
  text-align: center;
}

.digit-input {
  display: flex;
  flex: column;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid;
}

.next-step-line {
  padding: 0 0 0 7px;
}

@keyframes bring-down {
  from {
    color: white;
  }

  50% {
    color: brown;
  }

  to {
    color: orange;
  }
}

/* .one-digit {

} */

/* .two-digit {

} */

.three-digit {
  width: 37px;
}

/* .four-digit {
  
} */
</style>
