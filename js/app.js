async function startApp(){

    const data = await loadCurrent();

    updateUI(data);

    createPlayer(data.channel);

}

startApp();
