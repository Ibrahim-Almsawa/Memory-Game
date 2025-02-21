import { ref, computed } from 'vue';
import type { GameState, Card, Score, Difficulty } from '../types/game';
import { useStorage, useIntervalFn } from '@vueuse/core';

export function useGame() {
  const bestScores = useStorage<Score[]>('memory-game-scores', []);
  const gameState = ref<GameState>({
    status: 'idle',
    moves: 0,
    time: 0,
    cards: [],
    flippedCards: [],
  });

  const { pause: pauseTimer, resume: resumeTimer } = useIntervalFn(() => {
    if (gameState.value.status === 'playing') {
      gameState.value.time++;
    }
  }, 1000, { immediate: false });

  const isGameComplete = computed(() => {
    return gameState.value.cards.every(card => card.isMatched);
  });

  function initializeGame(difficulty: Difficulty = '4x4') {
    const gridSizes = {
      '3x4': 6,
      '4x4': 8,
      '5x5': 12,
    };
    const pairs = gridSizes[difficulty];
    const values = Array.from({ length: pairs }, (_, i) => i + 1);
    const duplicatedValues = [...values, ...values];
    const shuffledValues = duplicatedValues.sort(() => Math.random() - 0.5);

    gameState.value = {
      status: 'playing',
      moves: 0,
      time: 0,
      cards: shuffledValues.map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
      })),
      flippedCards: [],
    };

    resumeTimer();
  }

  async function flipCard(card: Card) {
    if (
      card.isMatched ||
      card.isFlipped ||
      gameState.value.flippedCards.length >= 2 ||
      gameState.value.status !== 'playing'
    ) {
      return;
    }

    card.isFlipped = true;
    gameState.value.flippedCards.push(card);

    if (gameState.value.flippedCards.length === 2) {
      gameState.value.moves++;
      const [firstCard, secondCard] = gameState.value.flippedCards;

      if (firstCard.value === secondCard.value) {
        firstCard.isMatched = true;
        secondCard.isMatched = true;
        gameState.value.flippedCards = [];

        if (isGameComplete.value) {
          gameState.value.status = 'completed';
          pauseTimer();
          saveBestScore();
        }
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000));
        firstCard.isFlipped = false;
        secondCard.isFlipped = false;
        gameState.value.flippedCards = [];
      }
    }
  }

  function saveBestScore() {
    const newScore: Score = {
      moves: gameState.value.moves,
      time: gameState.value.time,
      date: new Date().toISOString(),
    };
    bestScores.value = [...bestScores.value, newScore]
      .sort((a, b) => a.moves - b.moves)
      .slice(0, 10);
  }

  function formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  return {
    gameState,
    bestScores,
    initializeGame,
    flipCard,
    formatTime,
    isGameComplete,
  };
}