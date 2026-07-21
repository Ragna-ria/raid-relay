let player = null;

function createPlayer(channel) {

    // channel が空なら何もしない
    if (!channel) {
        console.error("チャンネル名が指定されていません。");
        return;
    }

    // プレイヤーエリア取得
    const playerArea = document.getElementById("playerArea");

    // プレイヤーを作り直す
    playerArea.innerHTML = '<div id="twitch-player"></div>';

    // 新しいプレイヤー生成
    player = new Twitch.Player("twitch-player", {

        width: "100%",
        height: 450,

        channel: channel,

        parent: [
            "ragna-ria.github.io"
        ]

    });

    console.log(`プレイヤー作成：${channel}`);

}
