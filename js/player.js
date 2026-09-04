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


    /* ========================================
       Twitch parent 設定
    ======================================== */

    const twitchParents = [];


    /* 現在のページのドメイン */

    if (
        window.location.hostname
    ) {

        twitchParents.push(
            window.location.hostname
        );

    }


    /* iframe内の場合、親ページのドメインも取得 */

    if (
        window.top !== window.self
    ) {

        try {

            const referrer =
                document.referrer;

            if (referrer) {

                const referrerHost =
                    new URL(
                        referrer
                    ).hostname;

                if (
                    referrerHost &&
                    !twitchParents.includes(
                        referrerHost
                    )
                ) {

                    twitchParents.push(
                        referrerHost
                    );

                }

            }

        } catch (error) {

            console.warn(
                "親ドメインの取得に失敗しました。",
                error
            );

        }

    }


    console.log(
        "Twitch parent:",
        twitchParents
    );


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

                parent:
                    twitchParents,

                muted:
                    true
            }
        );


    player.addEventListener(
        Twitch.Player.READY,
        function () {

            console.log(
                `プレイヤー更新: ${normalizedChannel}`
            );

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
