<script setup lang="ts">
import { ref } from 'vue';
import { gameStore } from '../store';

const player = ref('');

const addPlayer = () => {
    if (!player.value.trim()) return;

    gameStore.addPlayer(player.value);
    player.value = '';
};
</script>

<template>
    <h1>Jeopardy Scorecard</h1>
    <h2>Players</h2>
    <div>
        <p
            id="playerName"
            v-for="player in gameStore.state.players"
            :key="player.id"
        >
            {{ player.name }}
        </p>
    </div>
    <input
        type="text"
        id="newPlayerName"
        placeholder="Player's name"
        v-model="player"
        @keyup.enter="addPlayer"
    />
    <button
        type="button"
        id="startGame"
        @click="gameStore.nextRound()"
        :disabled="gameStore.state.players.length === 0"
    >
        PLAY JEOPARDY!
    </button>
</template>

<style scoped></style>
