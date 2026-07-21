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

    // チャンネルが変わったらプレイヤー更新
    if (currentChannel !== data.channel) {

        console.log(
            `チャンネル変更：${currentChannel} → ${data.channel}`
        );

        currentChannel = data.channel;

        createPlayer(currentChannel);

    }

}

// 初回実行
refresh();

// 5秒ごとに更新
setInterval(refresh, 5000);
