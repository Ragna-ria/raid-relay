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

    const playerArea =
        document.getElementById(
            "playerArea"
        );

    const liveLabel =
        document.querySelector(
            ".live"
        );

    const currentArea =
        document.querySelector(
            ".current"
        );

    const nextArea =
        document.querySelector(
            ".next"
        );

    const progressArea =
        document.querySelector(
            ".progress"
        );


    let formattedTime = "";

    if (startTime) {

        const date =
            new Date(startTime);

        formattedTime =
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

    }


    playerArea.innerHTML = "";


    const messageArea =
        document.createElement(
            "div"
        );

    messageArea.className =
        "player-message";


    if (startTime) {

        messageArea.innerHTML = `
            <div class="player-message-main">
                ${message}
            </div>

            <div class="player-message-label">
                START
            </div>

            <div class="player-message-time">
                ${formattedTime}
            </div>
        `;

    } else {

        messageArea.innerHTML = `
            <div class="player-message-main">
                イベントは終了しました
            </div>

            <div class="player-message-label">
                THANK YOU FOR JOINING!
            </div>

            <div class="player-message-sub">
                ご参加・ご視聴<br>
                ありがとうございました！
            </div>
        `;

    }


    playerArea.appendChild(
        messageArea
    );


    liveLabel.hidden = true;
    currentArea.hidden = true;
    nextArea.hidden = true;
    progressArea.hidden = true;

}


function showLiveScreen() {

    const liveLabel =
        document.querySelector(
            ".live"
        );

    const currentArea =
        document.querySelector(
            ".current"
        );

    const nextArea =
        document.querySelector(
            ".next"
        );

    const progressArea =
        document.querySelector(
            ".progress"
        );


    liveLabel.hidden = false;
    currentArea.hidden = false;
    nextArea.hidden = false;
    progressArea.hidden = false;

}
