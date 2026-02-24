<script setup lang="ts">
import NewGame from './components/NewGame.vue';
import GameBoard from './components/GameBoard.vue';

import { gameStore } from './store';
</script>

<template>
    <NewGame v-if="gameStore.state.currentRound === 0" />
    <GameBoard v-else />
    <div id="newGameContainer" v-if="gameStore.state.currentRound === 3">
        <button type="button" class="btn-start" @click="gameStore.resetGame">
            New Game
        </button>
    </div>
</template>

<style scoped>
#newGameContainer {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 2rem;
    box-sizing: border-box;
}

.btn-start {
    width: 100%;
    background: #00a651;
    color: white;
    border: none;
    padding: 1.8rem;
    font-size: 2rem;
    font-weight: 900;
    font-family: 'Saira Extra Condensed', sans-serif;
    border-radius: 4px;
    cursor: pointer;
    box-shadow: 0 4px 14px 0 rgba(16, 185, 129, 0.39);
    transition: all 0.2s ease;
}

.btn-start:active:not(:disabled) {
    background: #008541;
    transform: translateY(-1px);
}

.btn-start:disabled {
    background: #e5e7eb;
    color: #9ca3af;
    box-shadow: none;
}
</style>
