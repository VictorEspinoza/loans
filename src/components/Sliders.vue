<template>
  <div>
    <div class="my_container">
      <div>
        <h3>Amount Interval</h3>
        <vue-slider
          v-model="values.amount"
          :interval="amountConfiguration.interval"
          :min="amountConfiguration.min"
          :max="amountConfiguration.max"
        />
        <v-select
          v-model="values.amount"
          :options="options.amountOptions"
          :clearable="false"
        />
      </div>
      <div>
        <h3>Term Interval</h3>
        <vue-slider
          v-model="values.term"
          :interval="termConfiguration.interval"
          :min="termConfiguration.min"
          :max="termConfiguration.max"
        />
        <v-select
          v-model="values.term"
          :options="options.termOptions"
          :clearable="false"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
import { mapGetters } from "vuex";
import { Interval } from "@/types/types";
import { debounce as _debounce } from "lodash";

@Component({
  computed: {
    ...mapGetters({
      amountInterval: "amountInterval",
      termInterval: "termInterval",
      options: "options",
      offer: "offer",
    }),
  },
  components: {
    VueSlider,
  },
})
export default class Sliders extends Vue {
  amountInterval!: Interval;
  termInterval!: Interval;
  options!: {
    amountOptions: number[];
    termOptions: number[];
  };

  values = {
    amount: 0,
    term: 0,
  };

  amountConfiguration = {
    min: 0,
    max: 1000000,
    interval: 1,
  };

  termConfiguration = {
    min: 0,
    max: 1000000,
    interval: 1,
  };

  @Watch("amountInterval")
  amountIntervalChanged(newValue: Interval) {
    const { min, max, step, defaultValue } = newValue;

    this.values = Object.assign({}, this.values, { amount: defaultValue });
    this.amountConfiguration = Object.assign({}, this.amountConfiguration, {
      min,
      max,
      interval: step,
    });
  }

  @Watch("termInterval")
  termIntervalChanged(newValue: Interval) {
    const { min, max, step, defaultValue } = newValue;

    this.values = Object.assign({}, this.values, { term: defaultValue });
    this.termConfiguration = Object.assign({}, this.amountConfiguration, {
      min,
      max,
      interval: step,
    });
  }

  @Watch("values", { deep: true })
  valuesChanged = _debounce((newValues: { amount: number; term: number }) => {
    this.$store.dispatch("loadOffer", newValues);
  }, 500);
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.my_container {
  width: 50%;
}
</style>
