let player = null;

function createPlayer(channel) {

    if (player) {
        player.setChannel(channel);
        return;
    }

    player = new Twitch.Player("playerArea", {
        width: "100%",
        height: 420,
        channel: channel,
        parent: [
            "ragna-ria.github.io"
        ]
    });

}
