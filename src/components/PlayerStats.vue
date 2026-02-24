<script setup lang="ts">
import { gameStore } from '../store';

// Helper to grab count from the playerStats computed object
const getCount = (player: any, round: number, val: number) => {
    const roundKey = round === 1 ? 'round1' : 'round2';
    return player[roundKey].find((s: any) => s.v === val)?.count || 0;
};
</script>

<template>
    <div class="comparison-container">
        <table class="stats-table">
            <thead>
                <tr>
                    <th class="sticky-col header-corner">Points</th>
                    <th
                        v-for="player in gameStore.state.players"
                        :key="player.id"
                    >
                        <div class="player-header">
                            <span class="p-name">{{ player.name }}</span>
                            <span class="p-total">{{
                                player.totalScore.toLocaleString()
                            }}</span>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="section-divider">
                    <td :colspan="gameStore.state.players.length + 1">
                        Round 1
                    </td>
                </tr>
                <tr
                    v-for="val in [200, 400, 600, 800, 1000]"
                    :key="'r1-' + val"
                >
                    <td class="sticky-col board-style-label">{{ val }}</td>
                    <td
                        v-for="player in gameStore.playerStats.value"
                        :key="player.id"
                    >
                        <div
                            class="cell-count"
                            :class="{ active: getCount(player, 1, val) > 0 }"
                        >
                            {{ getCount(player, 1, val) || '—' }}
                        </div>
                    </td>
                </tr>

                <tr class="section-divider">
                    <td :colspan="gameStore.state.players.length + 1">
                        Round 2
                    </td>
                </tr>
                <tr
                    v-for="val in [400, 800, 1200, 1600, 2000]"
                    :key="'r2-' + val"
                >
                    <td class="sticky-col board-style-label">{{ val }}</td>
                    <td
                        v-for="player in gameStore.playerStats.value"
                        :key="player.id"
                    >
                        <div
                            class="cell-count"
                            :class="{ active: getCount(player, 2, val) > 0 }"
                        >
                            {{ getCount(player, 2, val) || '—' }}
                        </div>
                    </td>
                </tr>

                <tr class="section-divider">
                    <td :colspan="gameStore.state.players.length + 1">
                        Final Round
                    </td>
                </tr>
                <tr>
                    <td class="sticky-col board-style-label final-gold">
                        5000
                    </td>
                    <td
                        v-for="player in gameStore.playerStats.value"
                        :key="player.id"
                    >
                        <div
                            class="cell-count"
                            :class="{ active: player.finalRound.count > 0 }"
                        >
                            {{ player.finalRound.count || '—' }}
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.comparison-container {
    width: 100%;
    overflow-x: auto; /* Allow side-swiping if many players */
    background: #000;
}

.stats-table {
    width: 100%;
    border-collapse: collapse;
    color: white;
    text-align: center;
}

/* Header Styling */
thead th {
    padding: 15px;
    background: #111;
    border-bottom: 2px solid #f8d90e;
    position: sticky;
    top: 0;
    z-index: 10;
}

.player-header {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.p-name {
    font-size: 1.2rem;
    font-weight: bold;
    white-space: nowrap;
}
.p-total {
    color: #f8d90e;
    font-family: monospace;
    font-size: 1.4rem;
}

/* Sticky Left Column for point values */
.sticky-col {
    position: sticky;
    left: 0;
    background: #1a1a1a;
    z-index: 5;
    width: 80px;
    font-weight: bold;
    border-right: 1px solid #333;
}

/* Row Styling */
.section-divider td {
    background: #222;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    padding: 8px;
    color: #888;
    text-align: left;
}

tr:nth-child(even) td {
    background: rgba(255, 255, 255, 0.02);
}

td {
    padding: 12px;
    border-bottom: 1px solid #222;
}

.value-label {
    color: #fff;
    font-size: 1.4rem;
}

/* The Data Points */
.cell-count {
    font-size: 1.4rem;
    font-weight: 800;
    color: #333; /* Dark when 0 */
}

.cell-count.active {
    color: #fff;
    text-shadow: 0 0 10px #060ce9;
}
</style>
