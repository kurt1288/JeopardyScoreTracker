<script setup lang="ts">
import ScoringModal from './ScoringModal.vue';
import PlayerStats from './PlayerStats.vue';
import { gameStore, type ValidPointValue } from '../store';
import { useSwipe } from '../useSwipe';

const { onTouchStart, onTouchEnd } = useSwipe({
    onLeft: () => gameStore.nextRound(),
    onRight: () => gameStore.previousRound(),
    onUp: () => (gameStore.state.isStatsOpen = true),
});

const boards: Record<number, ValidPointValue[]> = {
    1: [200, 400, 600, 800, 1000],
    2: [400, 800, 1200, 1600, 2000],
    3: [5000],
};
</script>

<template>
    <div class="board" @touchstart="onTouchStart" @touchend="onTouchEnd">
        <button
            class="board-square"
            v-for="val in boards[gameStore.state.currentRound]"
            :key="val"
            @click="gameStore.selectPoints(val)"
        >
            <span>{{ val }}</span>
        </button>
    </div>
    <ScoringModal />
    <Transition name="slide-up">
        <div
            v-if="gameStore.state.isStatsOpen"
            class="stats-overlay"
            @touchstart.stop
        >
            <div
                class="close-zone"
                @click="gameStore.state.isStatsOpen = false"
            >
                <span>Tap here to close</span>
            </div>

            <PlayerStats />
        </div>
    </Transition>
</template>

<style scoped>
.board {
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    height: 100vh;
    width: 100vw;
    box-sizing: border-box;
    touch-action: none;
}

.board-square {
    background-color: #060ce9;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 6px solid black;
}

.board-square span {
    font-family: 'Saira Extra Condensed', sans-serif;
    font-weight: 900;
    font-size: 100px;
    color: #f8d90e;
    text-shadow: 4px 4px 0px #000000;
    letter-spacing: -2px;
    line-height: 1;
}

.stats-overlay {
    position: fixed;
    inset: 0;
    background: rgba(10, 10, 10, 0.95);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    z-index: 200;
    display: flex;
    flex-direction: column;
    color: white;
    padding-bottom: 20px;
}

.close-zone {
    width: 100%;
    padding: 15px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(255, 255, 255, 0.05);
    cursor: pointer;
}

.close-zone span {
    font-size: 0.8rem;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 2px;
}

.stats-content-wrapper {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    -webkit-overflow-scrolling: touch;
}

/* Vue Transition Classes */
.slide-up-enter-active,
.slide-up-leave-active {
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
    transform: translateY(100%);
}

.slide-up-enter-to,
.slide-up-leave-from {
    transform: translateY(0);
}
</style>
