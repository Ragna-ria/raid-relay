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
