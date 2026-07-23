const API = "https://raid-relay-worker.riasachi-r.workers.dev";

alert("admin.js 読み込み成功");

window.addEventListener("DOMContentLoaded", () => {

    document.getElementById("saveButton").onclick = save;

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

async function save() {

    const data = {

        channel: document.getElementById("currentChannel").value,
        currentName: document.getElementById("currentName").value,

        nextChannel: document.getElementById("nextChannel").value,
        nextName: document.getElementById("nextName").value,

        number: Number(document.getElementById("number").value),
        total: Number(document.getElementById("total").value)

    };

    const response = await fetch(API + "/save", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(data)

    });

    const result = await response.json();

    alert(result.status);

}
