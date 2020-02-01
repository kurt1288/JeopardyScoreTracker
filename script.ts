window.onbeforeunload = () => {
    return "Are you sure you wish to leave?";
}

document.addEventListener("DOMContentLoaded", () => {
    const game = new Game();
    document.getElementById("addPlayer").addEventListener("click", () => {
        let value = (document.getElementById("newPlayerName") as HTMLInputElement).value;
        let player = new Player(value);
        game.AddNewPlayer(player);
        let newNode = document.createElement("p");
        newNode.innerText = player.name;
        document.getElementById("playerList").appendChild(newNode);
        (document.getElementById("newPlayerName") as HTMLInputElement).value = "";
    });

    document.getElementById("startGame").addEventListener("click", () => {
        document.getElementById("nextRound").classList.add("visible");
        game.CreatePlayerCards();
        game.InitializeScoreboard();
        game.NextRound();
    });

    document.querySelectorAll(".scoreButton").forEach((item) => {
        item.addEventListener("click", () => {
            game.points = Number((item as HTMLButtonElement).value);
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
    players: Array<Player>;
    round: number;
    points: number;

    constructor() {
        this.players = new Array<Player>();
        this.round = 0;
        (document.getElementById(`round${this.round}`) as HTMLDivElement).classList.add("visible");
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

    AddNewPlayer(player: Player) {
        this.players.push(player);
    }

    CreatePlayerCards() {
        for (let player of this.players) {
            let template = document.querySelector("#playerCard") as HTMLTemplateElement;
            let clone = template.content.cloneNode(true) as HTMLButtonElement;
            clone.querySelector("button").innerText = player.name;
            clone.querySelector<HTMLInputElement>("button").dataset.name = player.name;
            clone.querySelector("button").addEventListener("click", (event) => {
                this.players.find(x => x.name === (event.target as HTMLButtonElement).innerText).GivePoints(this.points);
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
        (document.getElementById(`round${this.round}`) as HTMLDivElement).classList.remove("visible");
        this.round++;
        (document.getElementById(`round${this.round}`) as HTMLDivElement).classList.add("visible");
    }
}

class Player {
    name: string;
    private points: number;

    constructor(name: string) {
        this.name = name;
        this.points = 0;
    }

    GivePoints(point:number) {
        this.points += point;
    }

    Points() {
        return this.points;
    }
}