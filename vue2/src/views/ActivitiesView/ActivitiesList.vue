<template>
  <div>
    <div v-if="!activities">Loading</div>
    <SpinnerLoading v-if="loading"></SpinnerLoading>
    <div v-if="activities && activities.length === 0">Activities Not found</div>
    <div v-if="activities">
      <section
        class="flex flex-wrap flex-row w-full max-w-5xl mt-5 gap-2 md:gap-5"
      >
        <ActivityCard
          class="w-[calc(50%_-_4px)] md:w-[calc(33%_-_12px)]"
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
        <p class="text-gray-4 text-right font-light">
          {{ pagination.page }}-{{ pageCount }} de
          {{ activitiesLength }} Resultados
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import getActivities from "@/utils/getActivities.js";

import ActivityCard from "@/components/ActivityCard.vue";
import SpinnerLoading from "@/components/SpinnerLoading.vue";

export default {
  data() {
    return {
      pagination: {
        page: 1,
        limit: 9,
      },
      activities: null,
      activitiesLength: 0,
      loading: false,
    };
  },
  methods: {
    setActivities: async function (page, limit) {
      const res = await getActivities({
        page,
        limit,
      });
      this.activities = res.data;
      this.activitiesLength = res.activitiesLength;
    },
  },
  computed: {
    pageCount: function () {
      return Math.ceil(this.activitiesLength / this.pagination.limit);
    },
  },
  watch: {
    pagination: {
      handler: async function ({ page, limit }) {
        this.loading = true;
        await this.setActivities(page, limit);
        window.scrollTo(0, 0);
        this.loading = false;
      },
      deep: true,
      immediate: true,
    },
  },
  components: {
    SpinnerLoading,
    ActivityCard,
  },
};
</script>
