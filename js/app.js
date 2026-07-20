let currentChannel = "";

async function refresh() {

    try {

        const data = await loadCurrent();

        console.log("取得データ:", data);

        updateUI(data);

        if (currentChannel !== data.channel) {

            console.log(`チャンネル変更: ${currentChannel} → ${data.channel}`);

            currentChannel = data.channel;

            createPlayer(currentChannel);

        }

    } catch (error) {

        console.error(error);

    }

}

refresh();

setInterval(refresh, 5000);
