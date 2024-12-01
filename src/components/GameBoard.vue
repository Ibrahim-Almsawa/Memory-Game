<script setup lang="ts">
import { onMounted } from 'vue';
import GameCard from './GameCard.vue';
import { useGame } from '../composables/useGame';

const { gameState, initializeGame, flipCard, formatTime, isGameComplete } = useGame();

onMounted(() => {
  initializeGame();
});
</script>

<template>
  <div class="max-w-4xl mx-auto p-4">
    <div class="flex justify-between items-center mb-8">
      <div class="text-xl font-bold">
        Moves: {{ gameState.moves }}
      </div>
      <button
        @click="initializeGame()"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        New Game
      </button>
      <div class="text-xl font-bold">
        Time: {{ formatTime(gameState.time) }}
      </div>
    </div>

    <div class="grid grid-cols-4 gap-4 mb-8">
      <GameCard
        v-for="card in gameState.cards"
        :key="card.id"
        :card="card"
        :onFlip="flipCard"
      />
    </div>

    <div v-if="isGameComplete" class="text-center">
      <h2 class="text-2xl font-bold mb-4">Congratulations!</h2>
      <p class="text-lg">
        You completed the game in {{ gameState.moves }} moves and {{ formatTime(gameState.time) }}!
      </p>
    </div>
  </div>
</template>