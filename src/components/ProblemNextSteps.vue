<template>
  <div class="next-steps-container">
    <div class="next-step-line">
      <span
        v-for="(digit, index) in $store.state.dividendArray"
        :key="index"
        class="dividend-digit"
        ref="extraStepsLineOne"
        >{{ digit }}</span
      >
    </div>
    <div class="next-step-line">
      <span
        v-for="(digit, index) in $store.state.dividendArray"
        :key="index"
        class="dividend-digit"
        ref="extraStepsLineOne"
        >{{ digit }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "ProblemNextSteps",
};
</script>

<style>
.next-step-line {
  padding: 0 0 0 37px;
}
</style>
