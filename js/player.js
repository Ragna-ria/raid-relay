function createPlayer(channel){

    document.getElementById("playerArea").innerHTML =

    `<div style="
        display:flex;
        justify-content:center;
        align-items:center;
        width:100%;
        height:100%;
        font-size:28px;
    ">
        Twitch Player<br>${channel}
    </div>`;

}
