<template>
  <div class="next-steps-container">
    <div class="next-step-line">
      <!-- <span id="placeholder"></span> -->
      <span
        v-for="span in $store.state.nextStepsIndex"
        :key="span"
        ref="extraStepsLineOne"
        class="border-span"
      ></span>
    </div>
    <div class="next-step-line">
      <span
        v-for="span in $store.state.nextStepsIndex"
        :key="span"
        ref="extraStepsLineTwo"
        class="border-span"
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
      margin: undefined,
    };
  },
  emits: ["resetQuotient", "displayAnswer"],
  methods: {
    populateLineOneSpans() {
      this.setMargin();
      const index = this.$store.state.dividendIndex;
      let productSpan;
      if (index > 0) {
        this.lineOneSpans[index - 1].innerText = "-";
        this.lineOneSpans[index].style.borderBottom = "solid 2px";
        productSpan = this.lineOneSpans[index];
      } else {
        this.lineOneSpans[index].innerText = "-";
        this.lineOneSpans[index + 1].style.borderBottom = "solid 2px";
        productSpan = this.lineOneSpans[index + 1];
      }
      productSpan.innerHTML = `<input type="number" class="quotient-digit" min="0" id="product-input-${this.$store.state.dividendIndex}" />`;
      const productInput = document.getElementById(`product-input-${index}`);
      productInput.focus();
      productInput.addEventListener("keyup", this.checkProduct);
      if (this.$store.state.dividendIndex > 0 && window.innerWidth >= 768) {
        productSpan.style.width = "74px";
        productInput.style.width = "60px";
      } else if (
        this.$store.state.dividendIndex > 0 &&
        window.innerWidth < 768
      ) {
        productSpan.style.width = "50px";
        // productSpan.style.border = "solid 2px red";
        productInput.style.width = "44px";
      }
    },
    checkProduct(e) {
      if (
        e.keyCode === 13 &&
        e.target.value == this.$store.state.expectedProduct
      ) {
        const productInput = document.getElementById(
          `product-input-${this.$store.state.dividendIndex}`
        );
        productInput.setAttribute("disabled", "");
        productInput.style.backgroundColor = "";
        productInput.style.border = "2px solid #19bf16";
        productInput.style.borderRadius = "0px";
        productInput.style.padding = "1px";
        productInput.style.textAlign = "right";
        this.$store.commit("setStep", "subtract");
        this.$store.dispatch("calculateExpectedDifference");
        this.populateLineTwoSpans();
      } else if (
        e.keyCode === 13 &&
        e.target.value != this.$store.state.expectedProduct
      ) {
        const productInput = document.getElementById(
          `product-input-${this.$store.state.dividendIndex}`
        );
        productInput.style.backgroundColor = "orange";
        productInput.style.border = "solid 1px red";
        productInput.style.borderRadius = "5px";
        productInput.classList.add("wiggle");
      }
    },
    populateLineTwoSpans() {
      const index = this.$store.state.dividendIndex;
      this.lineTwoSpans[
        index + 1
      ].innerHTML = `<input type="number" class="quotient-digit" min="0" id="difference-input-${index}" />`;
      const differenceInput = document.getElementById(
        `difference-input-${index}`
      );
      differenceInput.focus();
      differenceInput.addEventListener("keyup", this.checkDifference);
    },
    checkDifference(e) {
      if (
        e.keyCode === 13 &&
        e.target.value == this.$store.state.expectedDifference &&
        this.$store.getters.finalDigit
      ) {
        this.wrapProblem();
      } else if (
        e.keyCode === 13 &&
        e.target.value == this.$store.state.expectedDifference
      ) {
        const index = this.$store.state.dividendIndex;
        const differenceInputSpan = this.lineTwoSpans[index + 1];
        differenceInputSpan.innerText = `${this.$store.state.expectedDifference}`;
        differenceInputSpan.style.backgroundColor = "";
        differenceInputSpan.style.border = "";
        this.$store.commit("setStep", "bringDown");
        this.bringDown();
      } else if (
        e.keyCode === 13 &&
        e.target.value != this.$store.state.expectedDifference
      ) {
        const index = this.$store.state.dividendIndex;
        const differenceInput = document.getElementById(
          `difference-input-${index}`
        );
        differenceInput.style.backgroundColor = "orange";
        differenceInput.style.border = "solid 1px red";
        differenceInput.style.borderRadius = "5px";
        differenceInput.classList.add("wiggle");
      }
    },
    bringDown() {
      const productInput = document.getElementById(
        `product-input-${this.$store.state.dividendIndex}`
      );
      productInput.style.border = "";
      this.$store.commit("removeHighlights");
      this.$store.commit("removeSpanHighlights");
      const index = this.$store.state.dividendIndex;
      const newDigitSpan = this.lineTwoSpans[index + 2];
      newDigitSpan.innerText = `${this.$store.state.dividendArray[index + 1]}`;
      newDigitSpan.classList.add("bring-down");
      this.highlightNewDividend();
      this.setSubDividend();
      this.setExpectedQuotient();
      this.$store.commit("incrementDividendIndex");
      // this.$store.commit("incrementNextStepsIndex");
      const quotientInput = document.getElementById(
        `${this.$store.state.dividendIndex}`
      );
      window.setTimeout(function () {
        quotientInput.focus();
      }, 0);
      this.$emit("resetQuotient");
      setTimeout(() => {
        this.$store.commit("setStep", "divide");
      }, 1000);
    },
    highlightNewDividend() {
      const index = this.$store.state.dividendIndex;
      const differenceInputSpan = this.lineTwoSpans[index + 1];
      const newDigitSpan = this.lineTwoSpans[index + 2];
      differenceInputSpan.style.color = "#c185fd";
      newDigitSpan.style.color = "#c185fd";
      const spans = [differenceInputSpan, newDigitSpan];
      this.$store.commit("setHighlightedSpans", spans);
    },
    setSubDividend() {
      const index = this.$store.state.dividendIndex;
      const dividend =
        this.lineTwoSpans[index + 1].innerText.toString() +
        this.lineTwoSpans[index + 2].innerText.toString();
      this.$store.commit("setSubDividend", dividend);
    },
    setExpectedQuotient() {
      const divisor = this.$store.getters.divisor;
      const quotient = Math.floor(this.$store.state.subDividend / divisor);
      this.$store.commit("setExpectedQuotient", quotient);
    },
    wrapProblem() {
      const productInput = document.getElementById(
        `product-input-${this.$store.state.dividendIndex}`
      );
      productInput.style.border = "";
      this.$store.commit("removeHighlights");
      this.$store.commit("removeSpanHighlights");
      const index = this.$store.state.dividendIndex;
      const differenceInputSpan = this.lineTwoSpans[index + 1];
      differenceInputSpan.innerText = `${this.$store.state.expectedDifference}`;
      differenceInputSpan.style.color = "#19bf16";
      this.$store.commit("setStep", "remainder");
      this.$emit("displayAnswer");
    },
    calculateFullSizedMargin() {
      switch (this.$store.state.divisorArray.length) {
        case 1:
          this.calculateFullSizedOneDigitMargin();
          break;
        case 2:
          this.calculateFullSizedTwoDigitMargin();
          break;
        case 3:
          this.calculateFullSizedThreeDigitMargin();
          break;
      }
    },
    calculateFullSizedOneDigitMargin() {
      switch (this.$store.getters.digitColumnCount) {
        case 2:
          this.margin = "73px";
          break;
        case 3:
          this.margin = "38px";
          break;
        case 4:
          this.margin = "0px";
          break;
        case 5:
          this.margin = "-38px";
          break;
        case 6:
          this.margin = "-73px";
          break;
        case 7:
          this.margin = "-109px";
          break;
        case 8:
          this.margin = "-147px";
          break;
        case 9:
          this.margin = "-186px";
          break;
        case 10:
          this.margin = "-221px";
          break;
      }
    },
    calculateFullSizedTwoDigitMargin() {
      switch (this.$store.getters.digitColumnCount) {
        case 4:
          this.margin = "73px";
          break;
        case 5:
          this.margin = "38px";
          break;
        case 6:
          this.margin = "0px";
          break;
        case 7:
          this.margin = "-38px";
          break;
        case 8:
          this.margin = "-73px";
          break;
        case 9:
          this.margin = "-109px";
          break;
        case 10:
          this.margin = "-147px";
          break;
        case 11:
          this.margin = "-186px";
          break;
      }
    },
    calculateFullSizedThreeDigitMargin() {
      switch (this.$store.getters.digitColumnCount) {
        case 6:
          this.margin = "73px";
          break;
        case 7:
          this.margin = "38px";
          break;
        case 8:
          this.margin = "0px";
          break;
        case 9:
          this.margin = "-38px";
          break;
        case 10:
          this.margin = "-73px";
          break;
        case 11:
          this.margin = "-109px";
          break;
        case 12:
          this.margin = "-147px";
          break;
      }
    },
    calculateMinimizedMargin() {
      switch (this.$store.state.divisorArray.length) {
        case 1:
          this.calculateMinimizedOneDigitMargin();
          break;
        case 2:
          this.calculateMinimizedTwoDigitMargin();
          break;
        case 3:
          this.calculateMinimizedThreeDigitMargin();
          break;
      }
    },
    calculateMinimizedOneDigitMargin() {
      switch (this.$store.getters.digitColumnCount) {
        case 2:
          this.margin = "99px";
          break;
        case 3:
          this.margin = "75px";
          break;
        case 4:
          this.margin = "51px";
          break;
        case 5:
          this.margin = "27px";
          break;
        case 6:
          this.margin = "3px";
          break;
        case 7:
          this.margin = "-21px";
          break;
        case 8:
          this.margin = "-45px";
          break;
        case 9:
          this.margin = "-69px";
          break;
        case 10:
          this.margin = "-93px";
          break;
      }
    },
    calculateMinimizedTwoDigitMargin() {
      switch (this.$store.getters.digitColumnCount) {
        case 4:
          this.margin = "99px";
          break;
        case 5:
          this.margin = "75px";
          break;
        case 6:
          this.margin = "51px";
          break;
        case 7:
          this.margin = "27px";
          break;
        case 8:
          this.margin = "3px";
          break;
        case 9:
          this.margin = "-21px";
          break;
        case 10:
          this.margin = "-45px";
          break;
        case 11:
          this.margin = "-69px";
          break;
      }
    },
    calculateMinimizedThreeDigitMargin() {
      switch (this.$store.getters.digitColumnCount) {
        case 6:
          this.margin = "99px";
          break;
        case 7:
          this.margin = "75px";
          break;
        case 8:
          this.margin = "51px";
          break;
        case 9:
          this.margin = "27px";
          break;
        case 10:
          this.margin = "3px";
          break;
        case 11:
          this.margin = "-21px";
          break;
        case 12:
          this.margin = "-45px";
          break;
      }
    },
    setMargin() {
      const nextStepsContainers = document.getElementsByClassName(
        "next-steps-container"
      );

      for (let i = 0; i < nextStepsContainers.length; i++) {
        nextStepsContainers[i].style.marginLeft = this.margin;
      }
    },
  },
  mounted() {
    this.lineOneSpans = toRaw(this.$refs.extraStepsLineOne);
    this.lineTwoSpans = toRaw(this.$refs.extraStepsLineTwo);
    if (window.innerWidth > 768) {
      this.calculateFullSizedMargin();
    } else {
      this.calculateMinimizedMargin();
    }
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
  margin-left: 73px;
  width: 160px;
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
  display: flex;
  width: 20em;
  padding: 0 0 0 7px;
}

.bring-down {
  animation-name: bringdown;
  animation-duration: 1000ms;
}

@keyframes bringdown {
  from {
    transform: translateY(-70px);
    opacity: 30%;
  }

  to {
    transform: translateY(0px);
    opacity: 100%;
  }
}

@media (max-width: 768px) {
  span {
    margin: 1px;
    width: 22px;
  }
}
</style>
