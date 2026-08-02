function updateUI(data) {

    const runners =
        Array.isArray(data.runners)
            ? data.runners
            : [];

    const currentIndex =
        Number.isInteger(data.currentRunner)
            ? data.currentRunner
            : 0;

    const currentRunner =
        runners[currentIndex] || null;

    const nextRunner =
        runners[currentIndex + 1] || null;


    document
        .getElementById("currentName")
        .textContent =
            currentRunner?.name || "未定";


    document
        .getElementById("nextName")
        .textContent =
            nextRunner?.name || "未定";


    const total =
        runners.length;

    const currentNumber =
        total > 0
            ? Math.min(
                currentIndex + 1,
                total
            )
            : 0;

    document
        .getElementById("progressText")
        .textContent =
            `${currentNumber} / ${total}`;

}


function showEventMessage(
    message,
    startTime = null
) {

    const eventMessage =
        document.getElementById(
            "eventMessage"
        );

    const liveContent =
        document.getElementById(
            "liveContent"
        );

    let text =
        message;

    if (startTime) {

        const date =
            new Date(startTime);

        const formatted =
            new Intl.DateTimeFormat(
                "ja-JP",
                {
                    timeZone:
                        "Asia/Tokyo",

                    year:
                        "numeric",

                    month:
                        "2-digit",

                    day:
                        "2-digit",

                    hour:
                        "2-digit",

                    minute:
                        "2-digit",

                    hour12:
                        false
                }
            ).format(date);

        text +=
            `\n\nSTART\n${formatted}`;

    }

    eventMessage.textContent =
        text;

    eventMessage.hidden =
        false;

    liveContent.hidden =
        true;

}


function showLiveScreen() {

    const eventMessage =
        document.getElementById(
            "eventMessage"
        );

    const liveContent =
        document.getElementById(
            "liveContent"
        );

    eventMessage.hidden =
        true;

    liveContent.hidden =
        false;

}
