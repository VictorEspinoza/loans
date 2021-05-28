<template>
  <div>
    <div class="my_container">
      <code>{{ JSON.stringify(this.offer) }}</code>
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
