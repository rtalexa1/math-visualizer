<template>
  <div class="next-steps-container">
    <div class="next-step-line">
      <span
        v-for="(digit, index) in $store.state.dividendArray"
        :key="index"
        class="dividend-digit"
        ref="extraStepsLineOne"
      ></span>
    </div>
    <div class="next-step-line">
      <span
        v-for="(digit, index) in $store.state.dividendArray"
        :key="index"
        class="dividend-digit"
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
      this.lineOneSpans[index + 1].style.bordeBottom = "solid 2px";
    },
    checkProduct(e) {
      if (
        e.keyCode === 13 &&
        e.target.value == this.$store.state.expectedProduct
      ) {
        this.$store.commit("setStep", "subtract");
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
      const productInput = document.getElementById("product-input");
      productInput.addEventListener("keyup", this.checkProduct);
    },
  },
  mounted() {
    this.lineOneSpans = toRaw(this.$refs.extraStepsLineOne);
    this.lineTwoSpans = toRaw(this.$refs.extraStepsLineTwo);
    this.populateLineOneSpans();
  },
};
</script>

<style>
.next-steps-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  max-width: 200px;
}

.digit-input {
  display: flex;
  flex: column;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid;
}
/* .next-step-line {
  padding: 0 0 0 37px;
} */
</style>
