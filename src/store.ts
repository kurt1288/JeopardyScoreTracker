import { reactive, computed, watch } from 'vue';

const STORAGE_KEY = 'jeopardy_game_state';

export type ValidPointValue =
    | 200
    | 400
    | 600
    | 800
    | 1000
    | 1200
    | 1600
    | 2000
    | 5000;

interface ScoreEntry {
    value: ValidPointValue;
    round: 0 | 1 | 2 | 3;
    isCorrect: boolean;
}

interface Player {
    id: number;
    name: string;
    totalScore: number;
    history: ScoreEntry[];
}

interface GameState {
    players: Player[];
    currentRound: 0 | 1 | 2 | 3; // round 0 corresponds to new game view
    pendingPoints: ValidPointValue | null;
    isStatsOpen: boolean;
}

const savedState = localStorage.getItem(STORAGE_KEY);

// Initial state, reloads from localStorage if it exists
const initialState = savedState
    ? JSON.parse(savedState)
    : {
          players: [],
          currentRound: 0,
          pendingPoints: null,
          isStatsOpen: false,
      };

const state = reactive<GameState>(initialState);

watch(
    state,
    (newState) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    },
    { deep: true },
);

export const gameStore = {
    state,

    playerStats: computed(() => {
        return state.players.map((player) => {
            const getCount = (round: number, value: number) => {
                // Only count the net positive answers
                return player.history.filter(
                    (h) =>
                        h.round === round && h.value === value && h.isCorrect,
                ).length;
            };

            return {
                id: player.id,
                name: player.name,
                totalScore: player.totalScore,
                round1: [200, 400, 600, 800, 1000].map((v) => ({
                    v,
                    count: getCount(1, v),
                })),
                round2: [400, 800, 1200, 1600, 2000].map((v) => ({
                    v,
                    count: getCount(2, v),
                })),
                finalRound: { v: 5000, count: getCount(3, 5000) },
            };
        });
    }),

    toggleStats() {
        state.isStatsOpen = !state.isStatsOpen;
    },

    selectPoints(points: ValidPointValue) {
        state.pendingPoints = points;
    },

    closeModal() {
        state.pendingPoints = null;
    },

    addPlayer(name: string) {
        state.players.push({
            id: Date.now(),
            name,
            totalScore: 0,
            history: [],
        });
    },

    awardPoints(playerIndex: number, isCorrect: boolean) {
        if (state.pendingPoints === null) return;

        const player = state.players[playerIndex];
        const points = state.pendingPoints;
        const currentRound = state.currentRound;

        if (!player) return;

        if (isCorrect) {
            player.totalScore += points;
            player.history.push({
                value: points,
                round: currentRound,
                isCorrect: true,
            });
        } else {
            player.totalScore -= points;

            const index = player.history.findIndex(
                (h) =>
                    h.value === points &&
                    h.round === currentRound &&
                    h.isCorrect,
            );

            if (index !== -1) {
                // Remove the previous "correct" entry so the count goes down
                player.history.splice(index, 1);
            } else {
                // If they didn't have a correct one yet, we just record the negative
                // but the 'count' won't increase because isCorrect is false
                player.history.push({
                    value: points,
                    round: currentRound,
                    isCorrect: false,
                });
            }
        }

        this.closeModal();
    },

    nextRound() {
        if (state.currentRound < 3) state.currentRound++;
    },

    previousRound() {
        if (state.currentRound > 1) state.currentRound--;
    },

    resetGame() {
        if (confirm('Start a new game?')) {
            localStorage.removeItem(STORAGE_KEY);
            location.reload();
        }
    },
};
