<template v-if="activitiesRelated && activitiesRelated.length > 0">
  <div class="mx-8 relative">
    <n-carousel
      :slides-per-view="activitiesVisible"
      :space-between="20"
      show-arrow
      v-model:current-index="currentSelected"
    >
      <ActivityCard
        class="cursor-pointer h-[470px]"
        v-for="activityDetails in activitiesRelated"
        v-on:click.left="goToActivity(activityDetails.id)"
        :key="activityDetails.id"
        :title="activityDetails.title"
        :description="activityDetails.activity.description"
        :image="{ src: activityDetails.activity.image[0], alt: '' }"
        :location="activityDetails.activity.locations[0].address"
        :price="{
          amount: activityDetails.activity.market_price,
          currency: { suffix: ' Puntos' },
        }"
        :participants="activityDetails.activity.participants"
      />
    </n-carousel>
    <button type="button" class="custom-arrow-left" @click.left="prevActivity">
      <ArrowChevron></ArrowChevron>
    </button>
    <button type="button" class="custom-arrow-right" @click.left="nextActivity">
      <ArrowChevron class="rotate-180"></ArrowChevron>
    </button>
  </div>
</template>

<script setup>
import { NCarousel } from "naive-ui";
import { computed, nextTick, onMounted, onUnmounted, ref, toRefs } from "vue";
import { useRouter } from "vue-router";

import getActivities from "../utils/getActivities";

import ActivityCard from "./ActivityCard.vue";
import ArrowChevron from "./icons/ArrowChevron.vue";

const router = useRouter();

const props = defineProps({
  category: String,
});

const { category } = toRefs(props);

const activitiesRelated = ref(null);
const screenWidth = ref(window.innerWidth);
const currentSelected = ref(0);

function nextActivity() {
  const limit = activitiesRelated.value.length - activitiesVisible.value;
  if (currentSelected.value === limit) return;
  currentSelected.value++;
}

function prevActivity() {
  if (currentSelected.value === 0) return;
  currentSelected.value--;
}

function onResize() {
  screenWidth.value = window.innerWidth;
}

function goToActivity(id) {
  router.push({
    params: {
      id,
    },
  });
}

const activitiesVisible = computed(() => {
  if (screenWidth.value > 1024) return 4;
  if (screenWidth.value > 768) return 3;
  if (screenWidth.value > 600) return 2;
  return 1;
});

onMounted(async () => {
  nextTick(() => {
    window.addEventListener("resize", onResize);
  });
  const activities = await getActivities({
    page: 1,
    limit: 100,
  });
  activitiesRelated.value = activities.data.filter((activity) => {
    return activity.activity.category === category.value;
  });
});

onUnmounted(() => {
  window.removeEventListener("resize", onResize);
});
</script>

<style scoped>
.custom-arrow-left {
  position: absolute;
  left: -38px;
  @apply text-gray-1 top-1/2 -translate-y-1/2 z-20;
}

.custom-arrow-right {
  position: absolute;
  right: -38px;
  @apply text-gray-1 top-1/2 -translate-y-1/2 z-20;
}
</style>
