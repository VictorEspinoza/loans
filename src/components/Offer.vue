<template>
  <div>
    <div v-if="this.offer" class="my_container">
      <div>Monthly payment: {{ this.offer.monthlyPayment }}</div>
      <div>Term: {{ this.offer.term }}</div>
      <div>Total cost of credit: {{ this.offer.totalCostOfCredit }}</div>
      <div>Total principal: {{ this.offer.totalPrincipal }}</div>
      <div>Total repayable amount: {{ this.offer.totalRepayableAmount }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { Offer } from "@/types/types";

@Component({
  computed: {
    ...mapGetters({
      offer: "offer",
    }),
  },
  components: {},
})
export default class OfferDetail extends Vue {
  offer!: Offer;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.my_container {
  margin: 0px auto;
}
</style>
