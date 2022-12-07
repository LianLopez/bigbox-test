<template>
  <div class="activity-card">
    <picture class="activity-image">
      <img :src="image.src" :alt="image.alt" />
    </picture>
    <div class="activity-title">
      <h2>{{ title }}</h2>
      <div class="activity-participants">
        <span v-for="n in participants" :key="n" class="-ml-0.5">
          <ParticipantIcon />
        </span>
      </div>
    </div>
    <div class="activity-location">
      <ActivityLocationIcon />
      <span class="location">
        {{ location }}
      </span>
    </div>
    <div class="activity-description">
      {{ description }}
    </div>
    <div class="activity-price">
      {{ price.currency.prefix }}{{ price.amount }}{{ price.currency.suffix }}
    </div>
  </div>
</template>

<script setup>
import { toRefs } from "vue";

import ParticipantIcon from "@/components/icons/ParticipantIcon.vue";
import ActivityLocationIcon from "./icons/ActivityLocationIcon.vue";

const props = defineProps({
  title: String,
  description: String,
  image: {
    alt: String,
    src: String,
  },
  location: String,
  price: {
    amount: Number,
    currency: {
      prefix: String,
      suffix: String,
    },
  },

  participants: Number,
});

const { title, description, image, location, price, participants } =
  toRefs(props);
</script>

<style scoped>
.activity-card {
  @apply flex flex-col;
}

.activity-title {
  @apply flex justify-between items-center text-gray-1 text-lg leading-[22.5px] font-bold mt-3.5 gap-2;
}

.activity-participants {
  @apply flex;
}

.activity-description {
  @apply text-sm leading-[18.5px] font-normal mt-3 text-gray-1 flex-1;
}
.activity-image img {
  @apply w-full h-[203px] object-cover;
}

.activity-location {
  @apply flex items-center mt-3;
}
.activity-location .location {
  @apply text-sm ml-2;
}

.activity-price {
  @apply font-semibold text-lg leading-[22.5px] text-gray-1 mt-6;
}
</style>
