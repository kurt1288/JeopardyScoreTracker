<script setup lang="ts">
import { ref } from 'vue';
import { gameStore } from '../store';

const isCorrection = ref(false);

const handleAward = (index: number, isCorrect: boolean) => {
    const keepOpen = isCorrection.value;

    gameStore.awardPoints(index, isCorrect, isCorrection.value);
    isCorrection.value = false;

    if (!keepOpen) gameStore.closeModal();
};

const closeModal = () => {
    isCorrection.value = false;
    gameStore.closeModal();
};
</script>

<template>
    <div
        v-if="gameStore.state.pendingPoints !== null"
        class="modal-overlay"
        @click.self="closeModal()"
    >
        <div
            class="modal-content"
            :class="{ 'correction-mode-active': isCorrection }"
        >
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
                        @click="handleAward(index, false)"
                    >
                        <span class="symbol">{{
                            isCorrection ? '↻' : '−'
                        }}</span>
                    </button>

                    <div class="player-info">
                        <span class="name">{{ player.name }}</span>
                        <span class="current-total">{{
                            player.totalScore
                        }}</span>
                    </div>

                    <button class="zone plus" @click="handleAward(index, true)">
                        <span class="symbol">{{
                            isCorrection ? '↺' : '+'
                        }}</span>
                    </button>
                </div>
            </div>

            <div class="footer-actions">
                <div class="mode-selector">
                    <button
                        class="mode-btn"
                        :class="{ active: !isCorrection }"
                        @click="isCorrection = false"
                    >
                        STANDARD
                    </button>
                    <button
                        class="mode-btn"
                        :class="{ active: isCorrection }"
                        @click="isCorrection = true"
                    >
                        CORRECTION
                    </button>
                </div>

                <button class="cancel-btn" @click="closeModal()">
                    DISMISS
                </button>
            </div>
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
    transition: border-color 0.3s ease;
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

.instruction {
    color: #777;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: color 0.3s;
}

.player-list {
    padding: 0 1rem;
}

.player-row {
    display: flex;
    height: 90px;
    margin-bottom: 8px;
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
    transition:
        transform 0.1s,
        background-color 0.2s;
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
    transition: background 0.3s;
}

.name {
    font-weight: 800;
    font-size: 1.6rem;
    text-transform: uppercase;
    color: #fff;
}

.current-total {
    font-size: 1.1rem;
    color: #666;
    font-family: monospace;
}

.correction-mode-active {
    border-color: #f59e0b;
}

.footer-actions {
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    background: #0a0a0a;
    border-top: 1px solid #222;
    gap: 1rem;
}

.mode-selector {
    display: flex;
    background: #1a1a1a;
    padding: 4px;
    border-radius: 12px;
    border: 1px solid #333;
}

.mode-btn {
    flex: 1;
    border: none;
    padding: 12px 0;
    border-radius: 8px;
    background: transparent;
    color: #555;
    font-weight: 900;
    font-size: 1rem;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-transform: uppercase;
}

.mode-btn.active:first-child {
    background: #333;
    color: #fff;
}

.mode-btn.active:last-child {
    background: #f59e0b;
    color: #000;
}

.cancel-btn {
    width: 100%;
    padding: 1rem;
    background: transparent;
    color: #444;
    font-weight: bold;
    letter-spacing: 1px;
    border: none;
    cursor: pointer;
}

.cancel-btn:active {
    color: #888;
}
</style>
