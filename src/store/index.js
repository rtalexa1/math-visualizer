import { createStore } from "vuex";

export default createStore({
  state: {
    divisorArray: undefined,
    dividendArray: undefined,
    quotientSpans: undefined,
    dividendSpans: undefined,
    dividing: false,
    subDividend: undefined,
    subDividendResolved: false,
    dividendIndex: 0,
    nextStepsIndex: undefined,
    expectedQuotient: undefined,
    step: undefined,
    expectedProduct: undefined,
    expectedDifference: undefined,
    highlightedSpans: [],
  },
  getters: {
    digitColumnCount(state) {
      return state.divisorArray.length + state.dividendArray.length;
    },
    quotient(state) {
      return Math.floor(
        state.dividendArray.join("") / state.divisorArray.join("")
      );
    },
    remainder(state, getters) {
      return (
        state.dividendArray.join("") -
        state.divisorArray.join("") * getters.quotient
      );
    },
    divisor(state) {
      return parseInt(state.divisorArray.join(""));
    },
    currentDividendDigit(state) {
      return state.dividendArray[state.dividendIndex];
    },
    finalDigit(state) {
      return state.dividendIndex == state.dividendArray.length - 1;
    },
  },
  mutations: {
    setDivisorArray(state, array) {
      state.divisorArray = array;
    },
    resetDivisorArray(state) {
      state.divisorArray = undefined;
    },
    setDividendArray(state, array) {
      state.dividendArray = array;
    },
    resetDividendArray(state) {
      state.dividendArray = undefined;
    },
    setQuotientSpans(state, quotientSpans) {
      state.quotientSpans = quotientSpans;
    },
    resetQuotientSpans(state) {
      state.quotientSpans = undefined;
    },
    setDividendSpans(state, dividendSpans) {
      state.dividendSpans = dividendSpans;
    },
    resetDividendSpans(state) {
      state.dividendSpans = undefined;
    },
    startDividing(state) {
      state.dividing = true;
    },
    stopDividing(state) {
      state.dividing = false;
    },
    setStep(state, step) {
      state.step = step;
    },
    setSubDividend(state, subDividend) {
      state.subDividend = subDividend;
    },
    markSubDividendResolved(state) {
      state.subDividendResolved = true;
    },
    resetSubDividendResolved(state) {
      state.subDividendResolved = false;
    },
    incrementDividendIndex(state) {
      state.dividendIndex++;
    },
    resetDividendIndex(state) {
      state.dividendIndex = 0;
    },
    setNextStepsIndex(state) {
      state.nextStepsIndex = state.dividendArray.length + 2;
    },
    // incrementNextStepsIndex(state) {
    //   state.nextStepsIndex++;
    // },
    setExpectedQuotient(state, quotient) {
      state.expectedQuotient = quotient;
    },
    setExpectedProduct(state, product) {
      state.expectedProduct = product;
    },
    setExpectedDifference(state, difference) {
      state.expectedDifference = difference;
    },
    highlightCurrentSpan(state) {
      let span = state.dividendSpans[state.dividendIndex];
      span.style.color = "#c185fd";
    },
    removeHighlights(state) {
      state.dividendSpans.forEach(function (span) {
        span.style.color = "#000000";
      });
    },
    setHighlightedSpans(state, spans) {
      spans.forEach((span) => {
        state.highlightedSpans.push(span);
      });
    },
    removeSpanHighlights(state) {
      state.highlightedSpans.forEach(function (span) {
        span.style.color = "#000000";
      });
    },
    resetAll(state) {
      state.divisorArray = undefined;
      state.dividendArray = undefined;
      state.quotientSpans = undefined;
      state.dividendSpans = undefined;
      state.dividing = false;
      state.subDividend = undefined;
      state.subDividendResolved = false;
      state.dividendIndex = 0;
      state.nextStepsIndex = undefined;
      state.step = undefined;
    },
  },
  actions: {
    calculateExpectedProduct({ commit, state, getters }) {
      const product = state.expectedQuotient * getters.divisor;
      commit("setExpectedProduct", product);
    },
    calculateExpectedDifference({ commit, state }) {
      const difference = state.subDividend - state.expectedProduct;
      commit("setExpectedDifference", difference);
    },
  },
  modules: {},
});
