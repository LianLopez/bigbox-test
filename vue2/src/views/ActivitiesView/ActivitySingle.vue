<script>
import getActivityById from "@/utils/getActivityById.js";

import ArrowChevron from "@/components/icons/ArrowChevron.vue";
import SpinnerLoading from "@/components/SpinnerLoading.vue";

export default {
  data() {
    return {
      activityData: null,
      loading: false,
    };
  },
  components: { ArrowChevron, SpinnerLoading },
  async mounted() {
    this.loading = true;
    this.activityData = await getActivityById(this.$route.params.id);
    console.log(this.activityData);
    this.loading = false;
  },
};
</script>

<script>
import VueSlickCarousel from "vue-slick-carousel";

import "vue-slick-carousel/dist/vue-slick-carousel.css";
export default {
  components: {
    VueSlickCarousel,
  },
};
</script>
<template>
  <div>
    <SpinnerLoading v-if="loading"></SpinnerLoading>
    <div v-if="!loading && activityData">
      <div class="mb-6">
        <ArrowChevron></ArrowChevron>
      </div>
      <div class="grid grid-cols-12 gap-y-6">
        <div class="col-span-12 md:col-span-6">
          <VueSlickCarousel :arrows="true" :dots="true">
            <div>algo</div>
            <div>algo 2</div>
          </VueSlickCarousel>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>
