const API = "https://raid-relay-worker.riasachi-r.workers.dev";

alert("admin.js 読み込み成功");

window.addEventListener("DOMContentLoaded", () => {

    document.getElementById("saveButton").onclick = function () {
        alert("クリックされました");
    };

    load();

});

async function load() {

    const events = await fetch(API + "/events");
    const eventList = await events.json();

    const select = document.getElementById("eventSelect");
    select.innerHTML = "";

    eventList.forEach(event => {

        const option = document.createElement("option");
        option.value = event.id;
        option.textContent = event.title;
        select.appendChild(option);

    });

    const current = await fetch(API + "/current");
    const data = await current.json();

    document.getElementById("currentName").value = data.currentName;
    document.getElementById("currentChannel").value = data.channel;
    document.getElementById("nextName").value = data.nextName;
    document.getElementById("nextChannel").value = data.nextChannel;
    document.getElementById("number").value = data.number;
    document.getElementById("total").value = data.total;

}
