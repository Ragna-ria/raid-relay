let currentChannel = "";

/**
 * データ取得・画面更新
 */
async function refresh() {

    const data = await loadCurrent();

    // 読み込み失敗
    if (!data) {
        return;
    }

    // UI更新
    updateUI(data);

    // 現在の走者を取得
    const runners = Array.isArray(data.runners)
        ? data.runners
        : [];

    const currentRunner =
        runners[data.currentRunner] || null;

    const channel =
        currentRunner?.channel || "";

    // チャンネルが変わったらプレイヤー更新
    if (currentChannel !== channel) {

        console.log(
            `チャンネル変更：${currentChannel} → ${channel}`
        );

        currentChannel = channel;

        createPlayer(currentChannel);

    }

}

// 初回実行
refresh();

// 5秒ごとに更新
setInterval(refresh, 5000);
