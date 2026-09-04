let player = null;
let currentPlayerChannel = null;


/* ========================================
   Twitch Player 作成
======================================== */

function createPlayer(channel) {

    const normalizedChannel =
        typeof channel === "string"
            ? channel.trim()
            : "";


    /* チャンネル名が空の場合 */

    if (!normalizedChannel) {

        console.error(
            "チャンネル名が指定されていません。"
        );

        const playerArea =
            document.getElementById(
                "playerArea"
            );

        if (playerArea) {

            playerArea.innerHTML =
                "";

        }

        currentPlayerChannel =
            null;

        return;

    }


    /* 同じチャンネルなら作り直さない */

    if (
        player &&
        currentPlayerChannel ===
            normalizedChannel
    ) {

        return;

    }


    const playerArea =
        document.getElementById(
            "playerArea"
        );

    if (!playerArea) {

        console.error(
            "playerArea が見つかりません。"
        );

        return;

    }


    /* 以前のプレイヤーを削除 */

    playerArea.innerHTML =
        "";

    player =
        null;

    currentPlayerChannel =
        normalizedChannel;


    /* 新しいプレイヤー用DIV */

    const playerDiv =
        document.createElement(
            "div"
        );

    playerDiv.id =
        "twitch-player";

    playerArea.appendChild(
        playerDiv
    );


    /* Twitch Player生成 */

    player =
        new Twitch.Player(
            "twitch-player",
            {
                channel:
                    normalizedChannel,

                width:
                    "100%",

                height:
                    "100%",

                parent: [
                    "ragna-ria.github.io",
                    "www.gstatic.com",
                    "sites.google.com"
                ],

                muted:
                    true
            }
        );


    /* ========================================
       プレイヤー準備完了
    ======================================== */

    player.addEventListener(
        Twitch.Player.READY,
        function () {

            console.log(
                `プレイヤー更新: ${normalizedChannel}`
            );


            /* ミュートを明示 */

            try {

                player.setMuted(
                    true
                );

            } catch (error) {

                console.warn(
                    "ミュート設定に失敗しました。",
                    error
                );

            }


            /* ミュート状態で再生開始 */

            try {

                player.play();

                console.log(
                    "ミュート状態で再生を開始します。"
                );

            } catch (error) {

                console.warn(
                    "自動再生に失敗しました。",
                    error
                );

            }

        }
    );

}


/* ========================================
   Twitch Player 削除
======================================== */

function destroyPlayer() {

    const playerArea =
        document.getElementById(
            "playerArea"
        );


    if (player) {

        try {

            player.pause();

        } catch (error) {

            console.warn(
                "プレイヤー停止に失敗しました。",
                error
            );

        }

    }


    if (playerArea) {

        playerArea.innerHTML =
            "";

    }


    player =
        null;

    currentPlayerChannel =
        null;

}
