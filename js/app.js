let currentChannel = "";

/**
 * データ取得・画面更新
 */
async function refresh() {

    const data =
        await loadCurrent();

    if (!data) {
        return;
    }

    const startTime =
        data.startTime
            ? new Date(
                data.startTime
            )
            : null;

    const isBeforeStart =
        startTime &&
        !Number.isNaN(
            startTime.getTime()
        ) &&
        Date.now() <
        startTime.getTime();


    if (isBeforeStart) {

        showEventMessage(
            "イベント開始前です",
            data.startTime
        );

        destroyPlayer();

        currentChannel = "";

        return;

    }


    if (data.status === "ended") {

        showEventMessage(
            "イベントは終了しました\n\nTHANK YOU FOR JOINING!\n\nご参加・ご視聴\nありがとうございました！"
        );

        destroyPlayer();

        currentChannel = "";

        return;

    }


    showLiveScreen();

    updateUI(data);


    const runners =
        Array.isArray(
            data.runners
        )
            ? data.runners
            : [];

    const currentRunner =
        runners[
            data.currentRunner
        ] || null;

    const channel =
        currentRunner?.channel ||
        "";


    if (
        currentChannel !==
        channel
    ) {

        console.log(
            `チャンネル変更：${currentChannel} → ${channel}`
        );

        currentChannel =
            channel;

        createPlayer(
            currentChannel
        );

    }

}


// 初回実行
refresh();


// 5秒ごとに更新
setInterval(
    refresh,
    5000
);
