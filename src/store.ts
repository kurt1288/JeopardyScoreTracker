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
    timestamp: number;
    value: ValidPointValue;
    round: 0 | 1 | 2 | 3;
    isCorrect: boolean;
    isReversal?: boolean; // for corrections. indicates the entry "cancels" a previous one
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

    auditLog: computed(() => {
        return state.players
            .flatMap((player) =>
                player.history.map((entry) => ({
                    ...entry,
                    playerName: player.name,
                    playerId: player.id,
                })),
            )
            .sort((a, b) => b.timestamp - a.timestamp); // Newest first
    }),

    playerStats: computed(() => {
        return state.players.map((player) => {
            const getCount = (round: number, value: number) => {
                return player.history
                    .filter((h) => h.round === round && h.value === value)
                    .reduce((acc, h) => acc + (h.isCorrect ? 1 : -1), 0); // sum the occurrences: +1 for correct, -1 for incorrect
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

    addPlayer(name: string) {
        state.players.push({
            id: Date.now(),
            name,
            totalScore: 0,
            history: [],
        });
    },

    awardPoints(
        playerIndex: number,
        isAdding: boolean,
        isCorrection: boolean = false,
    ) {
        if (state.pendingPoints === null) return;

        const player = state.players[playerIndex];
        const points = state.pendingPoints;

        if (!player) return;

        player.totalScore += isAdding ? points : -points;

        player.history.push({
            timestamp: Date.now(),
            value: points,
            round: state.currentRound,
            isCorrect: isAdding,
            isReversal: isCorrection,
        });

        this.closeModal();
    },

    closeModal() {
        state.pendingPoints = null;
    },

    toggleStats() {
        state.isStatsOpen = !state.isStatsOpen;
    },

    selectPoints(points: ValidPointValue) {
        state.pendingPoints = points;
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
