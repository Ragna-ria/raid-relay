let currentChannel = "";

async function refresh() {

    try {

        const data = await loadCurrent();

        updateUI(data);

        if (currentChannel !== data.channel) {

            currentChannel = data.channel;

            createPlayer(currentChannel);

            console.log("チャンネル変更:", currentChannel);

        }

    } catch (error) {

        console.error(error);

    }

}

refresh();

setInterval(refresh, 5000);
