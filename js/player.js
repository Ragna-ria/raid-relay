let player = null;

function createPlayer(channel) {

    const playerArea = document.getElementById("playerArea");

    // 前のプレイヤーを削除
    playerArea.innerHTML = "";

    // 新しいプレイヤーを作成
    player = new Twitch.Player("playerArea", {
        width: "100%",
        height: 420,
        channel: channel,
        parent: [
            "ragna-ria.github.io"
        ]
    });

}
