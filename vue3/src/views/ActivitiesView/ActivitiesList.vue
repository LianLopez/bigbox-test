<template>
  <div v-if="!activities">Loading</div>
  <SpinnerLoading v-if="loading"></SpinnerLoading>
  <div v-if="activities && activities.length === 0">Activities Not found</div>
  <div v-if="activities">
    <section
      class="flex flex-wrap flex-row w-full max-w-5xl mt-5 gap-2 md:gap-5"
    >
      <ActivityCard
        class="w-[calc(50%_-_4px)] md:w-[calc(33%_-_12px)] cursor-pointer"
        v-for="activityDetails in activities"
        v-on:click.left="
          () =>
            $router.push({
              name: 'single',
              params: {
                id: activityDetails.id,
              },
            })
        "
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
    </section>
    <div class="w-min mt-5 m-auto space-y-6">
      <n-pagination v-model:page="page" :page-count="pageCount" />
      <p class="text-gray-4 text-right font-light">
        {{ page }}-{{ pageCount }} de {{ activities.length }} Resultados
      </p>
    </div>
  </div>
</template>

<script setup>
import getActivities from "@/utils/getActivities.js";
import { computed, ref, watchEffect } from "vue";

import { NPagination } from "naive-ui";
import ActivityCard from "../../components/ActivityCard.vue";
import SpinnerLoading from "../../components/SpinnerLoading.vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const page = ref(Number(route.query.page) || 1);
const limit = ref(Number(route.query.limit) || 9);
const activities = ref(null);
const activitiesLength = ref(0);
const loading = ref(false);

const pageCount = computed(() =>
  Math.ceil(activitiesLength.value / limit.value)
);

async function setActivities(page, limit) {
  const res = await getActivities({
    page,
    limit,
  });
  activities.value = res.data;
  activitiesLength.value = res.activitiesLength;
}

watchEffect(async () => {
  loading.value = true;
  router.push({
    query: {
      page: page.value,
      limit: limit.value,
    },
  });
  await setActivities(page.value, limit.value);
  window.scrollTo(0, 0);
  loading.value = false;
});
</script>
