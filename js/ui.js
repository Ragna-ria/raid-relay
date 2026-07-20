function updateUI(data){

    document.getElementById("currentName").textContent =
        data.currentName;

    document.getElementById("nextName").textContent =
        data.nextName || "未定";

    document.getElementById("progress").textContent =
        `${data.number} / ${data.total}`;

}
