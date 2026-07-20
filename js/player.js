let player = null;

function createPlayer(channel) {

    const playerArea = document.getElementById("playerArea");

    // プレイヤーを一旦削除
    playerArea.innerHTML = '<div id="twitch-player"></div>';

    // 新しく生成
    player = new Twitch.Player("twitch-player", {
        width: "100%",
        height: 420,
        channel: channel,
        parent: [
            "ragna-ria.github.io"
        ]
    });

}
