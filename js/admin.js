/*
========================================
Raid Relay Admin
Version 0.1.0
========================================
*/

const API =
    "https://raid-relay-worker.riasachi-r.workers.dev";

const ADMIN_TOKEN_KEY =
    "raidRelayAdminToken";

let currentEvent = null;


/* ========================================
   初期処理
======================================== */

window.addEventListener(
    "DOMContentLoaded",
    initialize
);


async function initialize() {

    document
        .getElementById("eventSelect")
        .addEventListener(
            "change",
            handleEventChange
        );

    document
        .getElementById("addRunnerButton")
        .addEventListener(
            "click",
            addRunner
        );

    document
        .getElementById("saveButton")
        .addEventListener(
            "click",
            saveEvent
        );

    document
    .getElementById("previousButton")
    .addEventListener(
        "click",
        previousRunner
    );

    document
    .getElementById("advanceButton")
    .addEventListener(
        "click",
        advanceRunner
    );

    try {

        await loadEvents();

    } catch (error) {

        showError(error);

    }

}


/* ========================================
   イベント一覧取得
======================================== */

async function loadEvents() {

    const response = await fetch(
        `${API}/events?t=${Date.now()}`,
        {
            cache: "no-store"
        }
    );

    const events = await readApiResponse(response);

    if (!Array.isArray(events)) {

        throw new Error(
            "イベント一覧の形式が正しくありません。"
        );

    }

    const select =
        document.getElementById("eventSelect");

    select.innerHTML = "";

    events.forEach(event => {

        const option =
            document.createElement("option");

        option.value = event.eventId;
        option.textContent = event.title;

        select.appendChild(option);

    });

    if (events.length === 0) {

        document.getElementById(
            "eventTitle"
        ).textContent = "イベントがありません";

        renderRunnerList();
        updateCurrentDisplay();

        return;

    }

    await loadEvent(events[0].eventId);

}


/* ========================================
   イベント選択
======================================== */

async function handleEventChange(event) {

    try {

        await loadEvent(event.target.value);

    } catch (error) {

        showError(error);

    }

}


/* ========================================
   イベント詳細取得
======================================== */

async function loadEvent(eventId) {

    const response = await fetch(
        `${API}/event?id=${encodeURIComponent(eventId)}&t=${Date.now()}`,
        {
            cache: "no-store"
        }
    );

    const eventData =
        await readApiResponse(response);

    currentEvent = normalizeEvent(eventData);

    document.getElementById(
        "eventTitle"
    ).textContent = currentEvent.title;

    renderRunnerList();
    updateCurrentDisplay();

}


/* ========================================
   走者一覧表示
======================================== */

function renderRunnerList() {

    const runnerList =
        document.getElementById("runnerList");

    runnerList.innerHTML = "";

    if (
        !currentEvent ||
        currentEvent.runners.length === 0
    ) {

        const emptyMessage =
            document.createElement("p");

        emptyMessage.textContent =
            "走者が登録されていません。";

        runnerList.appendChild(emptyMessage);

        return;

    }

    currentEvent.runners.forEach(
        (runner, index) => {

            const row =
                document.createElement("div");

            row.className = "runnerRow";

            const radio =
                document.createElement("input");

            radio.type = "radio";
            radio.name = "currentRunner";
            radio.value = String(index);
            radio.checked =
                currentEvent.currentRunner === index;

            radio.addEventListener(
                "change",
                () => {

                    currentEvent.currentRunner =
                        index;

                    updateCurrentDisplay();

                }
            );

            const nameInput =
                document.createElement("input");

            nameInput.type = "text";
            nameInput.className = "runnerName";
            nameInput.placeholder = "表示名";
            nameInput.value = runner.name;

            nameInput.addEventListener(
                "input",
                event => {

                    runner.name =
                        event.target.value;

                    updateCurrentDisplay();

                }
            );

            const channelInput =
                document.createElement("input");

            channelInput.type = "text";
            channelInput.className =
                "runnerChannel";

            channelInput.placeholder =
                "Twitchチャンネル名";

            channelInput.value = runner.channel;

            channelInput.addEventListener(
                "input",
                event => {

                    runner.channel =
                        event.target.value;

                }
            );

            const deleteButton =
                document.createElement("button");

            deleteButton.type = "button";
            deleteButton.className =
                "deleteRunnerButton";

            deleteButton.textContent = "削除";

            deleteButton.addEventListener(
                "click",
                () => removeRunner(index)
            );

            row.appendChild(radio);
            row.appendChild(nameInput);
            row.appendChild(channelInput);
            row.appendChild(deleteButton);

            runnerList.appendChild(row);

        }
    );

}


/* ========================================
   走者追加
======================================== */

function addRunner() {

    if (!currentEvent) {
        return;
    }

    currentEvent.runners.push({
        id: currentEvent.runners.length + 1,
        name: "",
        channel: ""
    });

    if (currentEvent.runners.length === 1) {

        currentEvent.currentRunner = 0;

    }

    renderRunnerList();
    updateCurrentDisplay();

}


/* ========================================
   走者削除
======================================== */

function removeRunner(index) {

    if (!currentEvent) {
        return;
    }

    const runner =
        currentEvent.runners[index];

    const runnerName =
        runner.name || `${index + 1}番目の走者`;

    const confirmed = window.confirm(
        `${runnerName}を削除しますか？`
    );

    if (!confirmed) {
        return;
    }

    currentEvent.runners.splice(index, 1);

    currentEvent.runners.forEach(
        (item, itemIndex) => {

            item.id = itemIndex + 1;

        }
    );

    if (currentEvent.runners.length === 0) {

        currentEvent.currentRunner = 0;

    } else if (
        currentEvent.currentRunner > index
    ) {

        currentEvent.currentRunner -= 1;

    } else if (
        currentEvent.currentRunner >=
        currentEvent.runners.length
    ) {

        currentEvent.currentRunner =
            currentEvent.runners.length - 1;

    }

    renderRunnerList();
    updateCurrentDisplay();

}


/* ========================================
   現在・次の走者表示
======================================== */

function updateCurrentDisplay() {

    const currentName =
        document.getElementById(
            "currentRunnerName"
        );

    const nextName =
        document.getElementById(
            "nextRunnerName"
        );

    if (
        !currentEvent ||
        currentEvent.runners.length === 0
    ) {

        currentName.textContent = "-";
        nextName.textContent = "-";

        return;

    }

    const currentRunner =
        currentEvent.runners[
            currentEvent.currentRunner
        ];

    const nextRunner =
        currentEvent.runners[
            currentEvent.currentRunner + 1
        ];

    currentName.textContent =
        currentRunner?.name.trim() ||
        "未入力";

    nextName.textContent =
        nextRunner?.name.trim() ||
        "最後の走者";

}


/* ========================================
   保存
======================================== */

async function saveEvent() {

    if (!currentEvent) {

        showError(
            new Error(
                "保存するイベントがありません。"
            )
        );

        return;

    }

    try {

        const eventData =
            collectAndValidateEvent();

        const token =
            getAdminToken();

        if (!token) {
            return;
        }

        setSavingState(true);

        const response = await fetch(
            `${API}/event`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",

                    "X-Admin-Token":
                        token
                },

                body: JSON.stringify(eventData)
            }
        );

        const result =
            await readApiResponse(response);

        currentEvent =
            normalizeEvent(result.event);

        renderRunnerList();
        updateCurrentDisplay();

        showMessage(
            result.message ||
            "イベントを保存しました。"
        );

    } catch (error) {

        if (error.status === 401) {

            sessionStorage.removeItem(
                ADMIN_TOKEN_KEY
            );

        }

        showError(error);

    } finally {

        setSavingState(false);

    }

}


/* ========================================
   入力内容取得・検証
======================================== */

function collectAndValidateEvent() {

    const runners =
        currentEvent.runners.map(
            (runner, index) => {

                const name =
                    runner.name.trim();

                const channel =
                    runner.channel
                        .trim()
                        .toLowerCase();

                if (!name) {

                    throw new Error(
                        `${index + 1}番目の走者名を入力してください。`
                    );

                }

                if (
                    !/^[a-z0-9_]{1,25}$/i
                        .test(channel)
                ) {

                    throw new Error(
                        `${index + 1}番目のTwitchチャンネル名を確認してください。`
                    );

                }

                return {
                    id: index + 1,
                    name,
                    channel
                };

            }
        );

    if (runners.length === 0) {

        throw new Error(
            "走者を1人以上登録してください。"
        );

    }

    if (
        currentEvent.currentRunner < 0 ||
        currentEvent.currentRunner >=
            runners.length
    ) {

        throw new Error(
            "現在の走者を選択してください。"
        );

    }

    return {
        eventId: currentEvent.eventId,
        title: currentEvent.title,
        description:
            currentEvent.description || "",
        startTime:
            currentEvent.startTime || "",
        currentRunner:
            currentEvent.currentRunner,
        runners
    };

}


/* ========================================
   管理トークン
======================================== */

function getAdminToken() {

    const savedToken =
        sessionStorage.getItem(
            ADMIN_TOKEN_KEY
        );

    if (savedToken) {
        return savedToken;
    }

    const token = window.prompt(
        "管理用トークンを入力してください。"
    );

    if (!token) {
        return null;
    }

    const normalizedToken =
        token.trim();

    if (!normalizedToken) {
        return null;
    }

    sessionStorage.setItem(
        ADMIN_TOKEN_KEY,
        normalizedToken
    );

    return normalizedToken;

}


/* ========================================
   APIレスポンス処理
======================================== */

async function readApiResponse(response) {

    let data;

    try {

        data = await response.json();

    } catch {

        throw new Error(
            `APIの応答を読み取れませんでした。HTTP ${response.status}`
        );

    }

    if (!response.ok) {

        const error = new Error(
            data.message ||
            `APIエラーが発生しました。HTTP ${response.status}`
        );

        error.status = response.status;

        throw error;

    }

    return data;

}


/* ========================================
   データ整形
======================================== */

function normalizeEvent(value) {

    return {
        eventId: value.eventId,
        title: value.title,
        description:
            value.description || "",
        startTime:
            value.startTime || "",
        currentRunner:
            Number.isInteger(
                value.currentRunner
            )
                ? value.currentRunner
                : 0,

        runners: Array.isArray(value.runners)
            ? value.runners.map(
                (runner, index) => ({
                    id: index + 1,
                    name: runner.name || "",
                    channel:
                        runner.channel || ""
                })
            )
            : []
    };

}


/* ========================================
   画面通知
======================================== */

function setSavingState(isSaving) {

    const button =
        document.getElementById(
            "saveButton"
        );

    button.disabled = isSaving;

    button.textContent = isSaving
        ? "保存中..."
        : "💾 保存";

}


function showMessage(message) {

    window.alert(message);

}


function showError(error) {

    console.error(error);

    window.alert(
        error.message ||
        "エラーが発生しました。"
    );

}

function showError(error) {

    console.error(error);

    window.alert(
        error.message ||
        "エラーが発生しました。"
    );

}

// ←ここから追加

/* ========================================
   次へ
======================================== */

async function advanceRunner() {
    await moveRunner("advance");
}


/* ========================================
   前へ
======================================== */

async function previousRunner() {
    await moveRunner("previous");
}


/* ========================================
   進行操作
======================================== */

async function moveRunner(action) {

    if (!currentEvent) {
        return;
    }

    try {

        const token = getAdminToken();

        if (!token) {
            return;
        }

        const response = await fetch(
            `${API}/${action}`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "X-Admin-Token": token
                },

                body: JSON.stringify({
                    eventId: currentEvent.eventId
                })
            }
        );

        const result =
            await readApiResponse(response);

        currentEvent =
            normalizeEvent(result.event);

        renderRunnerList();
        updateCurrentDisplay();

        showMessage(
            result.message || "更新しました。"
        );

    } catch (error) {

        if (error.status === 401) {
            sessionStorage.removeItem(
                ADMIN_TOKEN_KEY
            );
        }

        showError(error);

    }

}
