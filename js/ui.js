function updateUI(data) {

    // 現在の走者
    document.getElementById("currentName").textContent =
        data.currentName || "未定";

    // 次の走者
    document.getElementById("nextName").textContent =
        data.nextName || "未定";

    // 進行状況
    document.getElementById("progressText").textContent =
        `${data.number} / ${data.total}`;

}
