function updateUI(data) {

    const runners = Array.isArray(data.runners)
        ? data.runners
        : [];

    const currentIndex = Number.isInteger(data.currentRunner)
        ? data.currentRunner
        : 0;

    const currentRunner =
        runners[currentIndex] || null;

    const nextRunner =
        runners[currentIndex + 1] || null;


    // 現在の走者
    document.getElementById("currentName").textContent =
        currentRunner?.name || "未定";


    // 次の走者
    document.getElementById("nextName").textContent =
        nextRunner?.name || "未定";


    // 進行状況
    const total = runners.length;

    const currentNumber =
        total > 0
            ? Math.min(currentIndex + 1, total)
            : 0;

    document.getElementById("progressText").textContent =
        `${currentNumber} / ${total}`;

}
