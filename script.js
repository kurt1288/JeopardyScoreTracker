window.onbeforeunload = () => {
    return "Are you sure you wish to leave?";
}

class Player {
    name;
    points;
    score;

    constructor(name) {
        this.name = name;
        this.points = {
            round1: {
                200: 0,
                400: 0,
                600: 0,
                800: 0,
                1000: 0
            },
            round2: {
                400: 0,
                800: 0,
                1200: 0,
                1600: 0,
                2000: 0
            },
            round3: {
                5000: 0
            }
        };
        this.score = 0
    }

    GivePoints(points, round) {
        this.points[`round${round}`][points]++;
        this.score += points;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const app = new Vue({
        el: "#container",
        data: {
            players: [],
            round: 0,
            newPlayerName: null,
            round1Points: [ 200, 400, 600, 800, 1000 ],
            round2Points: [ 400, 800, 1200, 1600, 2000 ],
            potentialPoints: 0,
        },
        methods: {
            addPlayer() {
                let player = new Player(this.newPlayerName);
                this.players.push(player);
                this.newPlayerName = null;
            },
            startGame() {
                this.round++;
            },
            givePlayerPoints(name) {
                this.players.find(x => x.name === name).GivePoints(this.potentialPoints, this.round);
                this.potentialPoints = 0;
            }
        }
    });
});