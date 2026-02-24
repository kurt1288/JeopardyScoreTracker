<script setup lang="ts">
import { gameStore } from '../store';
</script>

<template>
    <div
        v-if="gameStore.state.pendingPoints !== null"
        class="modal-overlay"
        @click.self="gameStore.closeModal()"
    >
        <div class="modal-content">
            <header class="modal-header">
                <div class="points-badge">
                    {{ gameStore.state.pendingPoints }}
                </div>
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
                        <span class="symbol">−</span>
                    </button>

                    <div class="player-info">
                        <span class="name">{{ player.name }}</span>
                        <span class="current-total">{{
                            player.totalScore
                        }}</span>
                    </div>

                    <button
                        class="zone plus"
                        @click="gameStore.awardPoints(index, true)"
                    >
                        <span class="symbol">+</span>
                    </button>
                </div>
            </div>

            <button class="cancel-btn" @click="gameStore.closeModal()">
                DISMISS
            </button>
        </div>
    </div>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    padding: 20px;
}

.modal-content {
    width: 100%;
    max-width: 500px;
    background: #121212;
    border-radius: 24px;
    border: 1px solid #333;
    overflow: hidden;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.modal-header {
    padding: 2.5rem 1rem 1.5rem;
    text-align: center;
    background: linear-gradient(to bottom, #1a1a1a, #121212);
}

.points-badge {
    font-family: 'Saira Extra Condensed', sans-serif;
    font-size: 4rem;
    font-weight: 900;
    color: #f8d90e;
    line-height: 1;
    margin-bottom: 0.5rem;
}

.player-row {
    display: flex;
    height: 90px;
    margin: 0 1rem 1rem;
    gap: 8px;
}

.zone {
    border: none;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    cursor: pointer;
    transition: transform 0.1s;
}

.symbol {
    font-size: 2.5rem;
    color: white;
    pointer-events: none;
}

.minus {
    background-color: #b91c1c;
}
.plus {
    background-color: #00a651;
}

.minus:active {
    background-color: #7f1d1d;
    transform: scale(0.96);
}
.plus:active {
    background-color: #008541;
    transform: scale(0.96);
}

.player-info {
    flex: 2.5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #1e1e1e;
    border-radius: 12px;
    border: 1px solid #2a2a2a;
}

.name {
    font-weight: 800;
    font-size: 1.8rem;
    text-transform: uppercase;
    color: #fff;
}

.current-total {
    font-size: 1.2rem;
    color: #666;
    font-family: monospace;
}

.cancel-btn {
    width: 100%;
    padding: 2rem;
    background: transparent;
    color: #555;
    font-weight: bold;
    letter-spacing: 2px;
    border: none;
    border-top: 1px solid #222;
}
</style>
