window.onbeforeunload = () => {
    return "Are you sure you wish to leave?";
};
document.addEventListener("DOMContentLoaded", () => {
    const game = new Game();
    document.getElementById("addPlayer").addEventListener("click", () => {
        let value = document.getElementById("newPlayerName").value;
        let player = new Player(value);
        game.AddNewPlayer(player);
        let newNode = document.createElement("p");
        newNode.innerText = player.name;
        document.getElementById("playerList").appendChild(newNode);
        document.getElementById("newPlayerName").value = "";
    });
    document.getElementById("startGame").addEventListener("click", () => {
        document.getElementById("nextRound").classList.add("visible");
        game.CreatePlayerCards();
        game.InitializeScoreboard();
        game.NextRound();
    });
    document.querySelectorAll(".scoreButton").forEach((item) => {
        item.addEventListener("click", () => {
            game.points = Number(item.value);
            document.getElementById(`round${game.round}`).classList.remove("visible");
            document.getElementById("playerCards").classList.add("visible");
        });
    });
    document.getElementById("goBack").addEventListener("click", () => {
        document.getElementById("playerCards").classList.remove("visible");
        document.getElementById(`round${game.round}`).classList.add("visible");
        game.points = 0;
    });
    document.getElementById("nextRound").addEventListener("click", () => {
        game.NextRound();
    });
});
class Game {
    constructor() {
        this.players = new Array();
        this.round = 0;
        document.getElementById(`round${this.round}`).classList.add("visible");
    }
    InitializeScoreboard() {
        for (let player of this.players) {
            let node = document.createElement("div");
            node.classList.add("scoreBoardItem");
            node.innerText = `${player.name}: ${player.Points()}`;
            document.getElementById("scoreBoard").appendChild(node);
        }
    }
    UpdateScoreBoard() {
        document.getElementById("scoreBoard").innerHTML = "";
        for (let player of this.players) {
            let node = document.createElement("div");
            node.classList.add("scoreBoardItem");
            node.innerText = `${player.name}: ${player.Points()}`;
            document.getElementById("scoreBoard").appendChild(node);
        }
    }
    AddNewPlayer(player) {
        this.players.push(player);
    }
    CreatePlayerCards() {
        for (let player of this.players) {
            let template = document.querySelector("#playerCard");
            let clone = template.content.cloneNode(true);
            clone.querySelector("button").innerText = player.name;
            clone.querySelector("button").dataset.name = player.name;
            clone.querySelector("button").addEventListener("click", (event) => {
                this.players.find(x => x.name === event.target.innerText).GivePoints(this.points);
                document.getElementById("playerCards").classList.remove("visible");
                document.getElementById(`round${this.round}`).classList.add("visible");
                for (let player of this.players) {
                    let node = document.createElement("div");
                    node.classList.add("scoreBoardItem");
                    node.innerText = `${player.name}: ${player.Points()}`;
                    document.getElementById("scoreBoard").appendChild(node);
                }
                this.UpdateScoreBoard();
            });
            document.getElementById("playerCards").appendChild(clone);
        }
    }
    NextRound() {
        document.getElementById(`round${this.round}`).classList.remove("visible");
        this.round++;
        document.getElementById(`round${this.round}`).classList.add("visible");
    }
}
class Player {
    constructor(name) {
        this.name = name;
        this.points = 0;
    }
    GivePoints(point) {
        this.points += point;
    }
    Points() {
        return this.points;
    }
}
//# sourceMappingURL=script.js.map