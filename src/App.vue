<template>
  <div class="container">
    <div>Bootiq</div>
    <Sliders />
    <OfferDetails />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Sliders from "@/components/Sliders.vue";
import OfferDetails from "@/components/Offer.vue";

@Component({
  components: {
    Sliders,
    OfferDetails,
  },
})
export default class App extends Vue {
  created() {
    this.$store.dispatch("loadConstraints");
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
