<script setup lang="ts">
import GameBoard from './components/GameBoard.vue';
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-bold text-center mb-8">Memory Game</h1>
      <GameBoard />
    </div>
  </div>
</template>