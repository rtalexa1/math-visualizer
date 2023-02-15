<template>
  <div class="current-step-container">
    <div v-if="$store.state.dividing && $store.state.step === 'divide'">
      <h2>1. Divide</h2>
      <p>
        Can
        <span class="divisor-counters"
          ><u>{{ $store.getters.divisor }}</u></span
        >
        go into
        <u
          ><span class="dividend-counters"
            ><u>{{ $store.state.subDividend }}</u></span
          ></u
        >?
      </p>
      <div class="counters-container">
        <span class="counters divisor-counters">
          <font-awesome-icon
            icon="fa-solid fa-circle"
            v-for="unit in $store.getters.divisor"
            :key="unit"
            class="counter"
          />
        </span>
        <span class="less-than-equal-icon">
          <font-awesome-icon icon="fa-solid fa-less-than-equal" />
        </span>
        <span class="counters dividend-counters">
          <font-awesome-icon
            icon="fa-solid fa-circle"
            v-for="unit in parseInt($store.state.subDividend)"
            :key="unit"
            class="counter"
          />
        </span>
      </div>
      <div class="yes-no-buttons">
        <button class="purp-btn" style="width: 4em; margin-right: 5px">
          Yes
        </button>
        <button class="purp-btn" style="width: 4em; margin-left: 5px">
          No
        </button>
      </div>
    </div>
    <div v-else-if="$store.state.step === 'multiply'">
      <h2>2. Multiply</h2>
      <p>Multiply the quotient digit by the divisor.</p>
      <p>
        <span class="dividend-counters"
          ><u>{{ $store.state.expectedQuotient }}</u></span
        >
        x
        <span class="divisor-counters"
          ><u>{{ $store.getters.divisor }}</u></span
        >
      </p>
    </div>
    <div v-else-if="$store.state.step === 'subtract'">
      <h2>3. Subtract</h2>
    </div>
    <div v-else-if="$store.state.step === 'bringDown'">
      <h2>4. Bring down</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "CurrentStep",
};
</script>

<style>
.current-step-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: solid 2px #c185fd;
  border-top: 0;
  border-radius: 0 0 15px 15px;
  width: 25em;
  min-height: 5em;
  padding: 20px;
  text-align: center;
}

p {
  font-size: x-large;
}

.divisor-counters {
  color: #19bf16;
}

.dividend-counters {
  color: #c185fd;
}

/* small {
  font-size: medium;
} */

.counters-container {
  display: flex;
  margin: 0.5em 0;
}

.counters {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border: 2px solid black;
  border-radius: 15px;
  width: 5em;
  height: auto;
  padding: 0.5em;
}

.counters-placeholder {
  width: 0.5em;
}

.counter {
  padding: 1px;
}

.less-than-equal-icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.75em;
}

.yes-no-buttons {
  display: flex;
  justify-content: center;
  padding-top: 5px;
}
</style>
