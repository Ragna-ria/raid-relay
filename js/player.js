let player = null;

function createPlayer(channel) {

    const playerArea = document.getElementById("playerArea");

    playerArea.innerHTML = "";

    player = new Twitch.Player("playerArea", {
        width: "100%",
        height: 420,
        channel: channel,
        parent: [
            "ragna-ria.github.io"
        ]
    });

}
