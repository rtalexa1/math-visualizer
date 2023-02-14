import { createStore } from "vuex";

export default createStore({
  state: {
    divisorArray: undefined,
    dividendArray: undefined,
    quotientSpans: undefined,
    dividendSpans: undefined,
    dividing: false,
    subDividend: undefined,
    dividendIndex: 0,
    expectedQuotient: undefined,
  },
  getters: {
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
    setSubDividend(state, subDividend) {
      state.subDividend = subDividend;
    },
    incrementDividendIndex(state) {
      state.dividendIndex++;
    },
    resetDividendIndex(state) {
      state.dividendIndex = 0;
    },
    setExpectedQuotient(state, quotient) {
      state.expectedQuotient = quotient;
    },
  },
  actions: {},
  modules: {},
});
