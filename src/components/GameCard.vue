<script setup lang="ts">
import type { Card } from '../types/game';

defineProps<{
  card: Card;
  onFlip: (card: Card) => void;
}>();
</script>

<template>
  <div
    @click="onFlip(card)"
    class="relative w-24 h-24 cursor-pointer perspective-1000"
    :class="{ 'pointer-events-none': card.isMatched }"
  >
    <div
      class="absolute w-full h-full transition-transform duration-600 transform-style-preserve-3d"
      :class="{ 'rotate-y-180': card.isFlipped }"
    >
      <div class="absolute w-full h-full bg-blue-500 rounded-lg shadow-md backface-hidden flex items-center justify-center text-white text-2xl font-bold">
        ?
      </div>
      <div
        class="absolute w-full h-full bg-green-500 rounded-lg shadow-md backface-hidden rotate-y-180 flex items-center justify-center text-white text-2xl font-bold"
        :class="{ 'bg-green-600': card.isMatched }"
      >
        {{ card.value }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}
.transform-style-preserve-3d {
  transform-style: preserve-3d;
}
.backface-hidden {
  backface-visibility: hidden;
}
.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>