<script setup lang="ts">
import { gameStore } from '../store';
</script>

<template>
    <div v-if="gameStore.state.pendingPoints !== null" class="modal-overlay">
        <div class="modal-content">
            <header>
                <h3>{{ gameStore.state.pendingPoints }}</h3>
            </header>

            <div class="player-list">
                <div
                    v-for="(player, index) in gameStore.state.players"
                    :key="player.id"
                    class="player-row"
                >
                    <button
                        class="zone minus"
                        @click="gameStore.awardPoints(index, false)"
                    >
                        <span>−</span>
                    </button>

                    <div class="player-info">
                        <span class="name">{{ player.name }}</span>
                    </div>

                    <button
                        class="zone plus"
                        @click="gameStore.awardPoints(index, true)"
                    >
                        <span>+</span>
                    </button>
                </div>
            </div>

            <button class="cancel-btn" @click="gameStore.closeModal()">
                Cancel
            </button>
        </div>
    </div>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
}

.modal-content {
    width: 90%;
    max-width: 600px;
    background: #1a1a1a;
    border-radius: 16px;
    overflow: hidden;
    color: white;
}

header {
    text-align: center;
}

.player-row {
    display: flex;
    height: 80px;
    border-bottom: 1px solid #333;
    align-items: stretch;
}

.zone {
    border: none;
    flex: 1;
    font-size: 2rem;
    font-weight: bold;
    cursor: pointer;
    transition: opacity 0.1s;
    color: white;
}

.minus {
    background-color: #d32f2f;
}
.plus {
    background-color: #388e3c;
}

.player-info {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #222;
    min-width: 120px;
}

.name {
    font-weight: bold;
    font-size: 2rem;
}

.cancel-btn {
    width: 100%;
    padding: 20px;
    background: transparent;
    color: #888;
    border: none;
    cursor: pointer;
}

.zone:active {
    opacity: 0.7;
}
</style>
