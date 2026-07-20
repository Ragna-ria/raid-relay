async function startApp() {

    console.log("アプリ起動");

    try {

        const data = await loadCurrent();

        console.log(data);

        updateUI(data);

        createPlayer(data.channel);

    } catch(error) {

        console.error(error);

    }

}

startApp();
