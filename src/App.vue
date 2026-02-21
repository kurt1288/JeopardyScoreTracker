<script setup lang="ts">
import NewGame from './components/NewGame.vue';
import GameBoard from './components/GameBoard.vue';

import { gameStore } from './store';
</script>

<template>
    <NewGame v-if="gameStore.state.currentRound === 0" />
    <GameBoard v-else />
    <div id="newGameContainer" v-if="gameStore.state.currentRound === 3">
        <button type="button" id="newGame" @click="gameStore.resetGame">
            New Game
        </button>
    </div>
</template>

<style scoped>
#newGameContainer {
    position: absolute;
    bottom: 0;
    width: 100%;
}

#newGame {
    padding: 2rem;
    font-size: 2rem;
    background-color: green;
    color: white;
    width: 100%;
}
</style>
