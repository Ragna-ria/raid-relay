let player = null;

async function loadData() {

    const response = await fetch("data/current.json");

    const data = await response.json();

    document.getElementById("currentName").textContent = data.currentName;

    document.getElementById("nextName").textContent =
        data.nextName || "未定";

    document.getElementById("progress").textContent =
        data.number + " / " + data.total;

    createPlayer(data.channel);

}

function createPlayer(channel) {

    if(player){

        player.setChannel(channel);
        return;

    }

    player = new Twitch.Player("playerArea",{

        width:"100%",

        height:500,

        channel:channel,

        parent:["ragna-ria.github.io"]

    });

}

loadData();
