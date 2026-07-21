function updateUI(data) {

    // データ取得失敗時
    if (!data) {

        document.getElementById("currentName").textContent = "取得失敗";

        document.getElementById("nextName").textContent = "-";

        document.getElementById("progressText").textContent = "-";

        return;

    }

    // 現在の走者
    document.getElementById("currentName").textContent =
        data.currentName;

    // 次の走者
    document.getElementById("nextName").textContent =
        data.nextName;

    // 進行状況
    document.getElementById("progressText").textContent =
        `${data.number} / ${data.total}`;

}
