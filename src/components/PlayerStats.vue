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
                            <span class="p-total">{{ player.totalScore }}</span>
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
                        Final Jeopardy!
                    </td>
                    <td
                        v-for="player in gameStore.playerStats.value"
                        :key="player.id"
                    >
                        <div
                            class="cell-count"
                            :class="{ active: player.finalRound.hasAnswered }"
                        >
                            {{
                                player.finalRound.hasAnswered
                                    ? player.finalRound.isCorrect
                                        ? '✓'
                                        : '✕'
                                    : '—'
                            }}
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="audit-log">
        <p class="audit-header">AUDIT LOG</p>
        <div class="audit-list">
            <div
                v-for="item in gameStore.auditLog.value"
                :key="item.timestamp"
                class="audit-row"
            >
                <div>
                    <span
                        class="audit-sign"
                        :class="
                            item.isCorrect !== item.isReversal
                                ? 'plus'
                                : 'minus'
                        "
                    >
                        {{ item.isReversal ? '↩' : item.isCorrect ? '●' : '○' }}
                    </span>
                    <span class="audit-name"
                        >{{ item.playerName
                        }}<small v-if="item.isReversal"
                            >(Correction)</small
                        ></span
                    >
                </div>
                <span
                    class="audit-value"
                    :class="
                        item.isCorrect !== item.isReversal
                            ? 'text-plus'
                            : 'text-minus'
                    "
                >
                    {{ item.isCorrect !== item.isReversal ? '+' : '-'
                    }}{{ item.value === 5000 ? 'Final' : item.value }}
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.comparison-container {
    width: 100%;
    background: #000;
}

.stats-table {
    width: 100%;
    border-collapse: collapse;
    color: white;
    text-align: center;
}

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
    text-transform: uppercase;
}
.p-total {
    color: #f8d90e;
    font-family: monospace;
    font-size: 2rem;
}

.sticky-col {
    position: sticky;
    left: 0;
    background: #1a1a1a;
    z-index: 5;
    width: 80px;
    font-weight: bold;
    border-right: 1px solid #333;
}

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

.cell-count {
    font-size: 1.4rem;
    font-weight: 800;
    color: #333;
}

.cell-count.active {
    color: #fff;
    text-shadow: 0 0 10px #060ce9;
}

.audit-log {
    padding: 2rem 1.5rem;
    background: black;
    border-top: 1px solid #1a1a1a;
}

.audit-header {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
    color: #555;
    letter-spacing: 3px;
    font-weight: 900;
    text-align: center;
}

.audit-list {
    display: flex;
    flex-direction: column;
}

.audit-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.8rem 0;
    border-bottom: 1px solid #111;
}

.audit-row div {
    display: flex;
    align-items: center;
}

.audit-sign {
    margin-right: 12px;
    font-size: 1rem;
}

.audit-sign.plus {
    color: #00a651;
}

.audit-sign.minus {
    color: #d32f2f;
}

.audit-name {
    font-size: 1.4rem;
    font-weight: 500;
    text-transform: uppercase;
    color: #999;
    letter-spacing: 1px;
}

.audit-name small {
    margin-left: 0.5rem;
}

.audit-value {
    font-family: 'Saira Extra Condensed', sans-serif;
    font-size: 1.8rem;
    font-weight: 900;
    min-width: 60px;
    text-align: right;
}

.text-plus {
    color: #00a651;
}

.text-minus {
    color: #d32f2f;
}
</style>
