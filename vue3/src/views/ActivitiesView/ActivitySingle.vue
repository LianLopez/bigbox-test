<script setup>
import { useRoute } from "vue-router";
import getActivityById from "@/utils/getActivityById.js";
import { onMounted, onUnmounted, ref } from "vue";

import { NCarousel } from "naive-ui";
import ArrowChevron from "@/components/icons/ArrowChevron.vue";
import SpinnerLoading from "@/components/SpinnerLoading.vue";
import ParticipantIcon from "@/components/icons/ParticipantIcon.vue";
import ActivityLocationIcon from "@/components/icons/ActivityLocationIcon.vue";
import RulesIcon from "@/components/icons/RulesIcon.vue";
import RelatedActivities from "../../components/RelatedActivities.vue";

const route = useRoute();
const activityData = ref(null);
const loading = ref(false);
const activityId = route.params.id;

async function setActivity(id) {
  loading.value = true;
  activityData.value = await getActivityById(id);
  loading.value = false;
}

onMounted(async () => {
  await setActivity(activityId);
});

onUnmounted(() => {
  activityData.value = null;
});
</script>

<template>
  <SpinnerLoading v-if="loading"></SpinnerLoading>
  <div v-if="!loading && activityData">
    <div
      class="mb-6 cursor-pointer"
      @click="
        () =>
          $router.push({
            name: 'activities',
          })
      "
    >
      <ArrowChevron></ArrowChevron>
    </div>
    <div class="grid grid-cols-12 gap-y-6 gap-x-[22px]">
      <div class="col-span-12 md:col-span-6">
        <n-carousel show-arrow>
          <img
            v-for="(image, n) in activityData.activity.image"
            :src="image"
            alt=""
            :key="n"
            class="w-full h-[300px] md:h-[370px] object-cover rounded"
          />
        </n-carousel>
      </div>
      <div class="col-span-12 md:col-span-5 px-2.5">
        <h1 class="text-3xl font-bold text-gray-1">{{ activityData.title }}</h1>
        <p class="text-lg leading-[22px] text-gray-2 mt-5">
          {{ activityData.activity.description }}
        </p>
        <div class="flex flex-row space-x-2 mt-6 items-center">
          <span>
            <ParticipantIcon
              v-for="n in activityData.activity.participants"
              :key="n"
              class="-ml-0.5 inline-block"
            />
          </span>
          <p class="text-base leading-5 text-gray-1">
            Para
            {{ activityData.activity.participants }}
            {{
              activityData.activity.participants > 1 ? "Personas" : "Persona"
            }}
          </p>
        </div>
        <div class="flex flex-row items-center mt-6 space-x-2">
          <ActivityLocationIcon
            class="h-[24px] w-[15px] text-gray-1"
          ></ActivityLocationIcon>
          <p>
            {{ activityData.activity.locations[0].province }}
          </p>
        </div>
        <div class="text-gray-1 text-2xl leading-[30px] mt-10 md:mt-20">
          {{ activityData.points + " puntos" }}
        </div>
      </div>
      <div class="col-span-12 md:col-span-6">
        <p
          class="border-b-[3px] border-primary w-max px-1 pb-2 font-medium text-lg md:text-[22px] md:leading-[27px]"
        >
          ¿Qué incluye?
        </p>
        <hr class="-mt-[1px] h-0 border-t border-[#EAEAEA]" />
        <p
          class="text-gray-1 text-lg leading-[18px] mt-14 space-y-4 font-light"
          v-html="activityData.activity.benefits"
        ></p>
        <template v-if="activityData.activity.small_print">
          <div class="flex flex-row items-center space-x-2 mt-14 font-bold">
            <RulesIcon></RulesIcon>
            <p class="text-gray-1 text-[22px] leading-7">Reglas:</p>
          </div>
          <p class="mt-7 font-light text-lg leading-[22.5px]">
            {{ activityData.activity.small_print }}
          </p>
        </template>
      </div>
      <div class="col-span-12">
        <RelatedActivities
          :category="activityData.activity.category"
        ></RelatedActivities>
      </div>
    </div>
  </div>
</template>

<style>
ul {
  list-style-type: disc;
  @apply pl-6 space-y-4;
}
</style>
