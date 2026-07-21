let player = null;

function createPlayer(channel) {

    // チャンネル名が空なら終了
    if (!channel) {
        console.error("チャンネル名が指定されていません。");
        return;
    }

    // プレイヤーエリア
    const playerArea = document.getElementById("playerArea");

    // 前回のプレイヤーを削除
    playerArea.innerHTML = "";

    // 新しいプレイヤー用DIV
    const playerDiv = document.createElement("div");
    playerDiv.id = "twitch-player";

    playerArea.appendChild(playerDiv);

    // Twitch Player生成
    player = new Twitch.Player("twitch-player", {

        channel: channel,

        width: "100%",

        height: "100%",

        parent: [
            "ragna-ria.github.io"
        ]

    });

    // 音声ON
    player.setMuted(false);

    console.log(`プレイヤー更新 : ${channel}`);

}
