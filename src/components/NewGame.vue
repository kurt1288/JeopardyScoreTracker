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
    <div class="wrapper">
        <header class="game-header">
            <h1>JEOPARDY! <span class="thin">SCORECARD</span></h1>
        </header>

        <div class="main-layout">
            <section class="controls">
                <div class="input-container">
                    <input
                        type="text"
                        v-model="player"
                        placeholder="Enter player name..."
                        @keyup.enter="addPlayer"
                    />
                    <button @click="addPlayer" class="add-link">ADD +</button>
                </div>
            </section>

            <section class="roster">
                <div class="roster-header">
                    <span>CURRENT PLAYERS</span>
                    <span>{{ gameStore.state.players.length }}</span>
                </div>

                <div class="roster-list">
                    <transition-group name="slide">
                        <div
                            class="roster-row"
                            v-for="player in gameStore.state.players"
                            :key="player.id"
                        >
                            <span class="player-name">{{ player.name }}</span>
                        </div>
                    </transition-group>
                </div>
            </section>
        </div>

        <footer class="game-footer">
            <button
                class="btn-start"
                @click="gameStore.nextRound()"
                :disabled="gameStore.state.players.length === 0"
            >
                PLAY JEOPARDY!
            </button>
        </footer>
    </div>
</template>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #ffffff;
    color: #1a1a1a;
}

.game-header {
    background-color: #060ce9;
    color: #f8d90e;
    padding: 1.5rem;
    text-align: center;
}

.thin {
    font-weight: 400;
    color: white;
}

.main-layout {
    flex: 1;
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
    padding: 0 2rem;
    box-sizing: border-box;
}

.controls {
    padding: 3rem 0;
    border-bottom: 2px solid #f0f0f0;
}

.input-container {
    display: flex;
    align-items: center;
    border-bottom: 2px solid #060ce9;
    padding: 0.5rem 0;
}

input {
    flex: 1;
    border: none;
    font-size: 2rem;
    font-family: 'Saira Extra Condensed', sans-serif;
    outline: none;
    background: transparent;
    text-transform: uppercase;
}

.add-link {
    background: none;
    border: none;
    color: #060ce9;
    font-weight: 900;
    cursor: pointer;
    font-size: 1.4rem;
    letter-spacing: 1px;
}

.roster-header {
    display: flex;
    justify-content: space-between;
    padding: 2rem 0 1rem;
    font-family: 'Saira Extra Condensed', sans-serif;
    font-size: 1.4rem;
    color: #999;
    letter-spacing: 2px;
}

.roster-row {
    display: flex;
    align-items: center;
    padding: 2rem 0;
    border-bottom: 1px solid #f0f0f0;
}

.player-num {
    font-family: 'Saira Extra Condensed', sans-serif;
    font-size: 1.4rem;
    color: #060ce9;
    margin-right: 2rem;
    opacity: 0.6;
}

.player-name {
    font-size: 2.4rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: -0.5px;
}

.empty-state {
    padding: 5rem 0;
    text-align: center;
    color: #ccc;
    font-style: italic;
    font-size: 1.6rem;
}

.game-footer {
    padding: 2rem;
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

/* Animations */
.slide-enter-active {
    transition: all 0.4s ease;
}
.slide-enter-from {
    opacity: 0;
    transform: translateX(30px);
}
</style>
