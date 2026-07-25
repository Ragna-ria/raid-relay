const API =
    "https://raid-relay-worker.riasachi-r.workers.dev";

const EVENT_ID =
    "2026_raid_relay";

async function loadCurrent() {

    try {

        const response = await fetch(
            `${API}/event?id=${EVENT_ID}&t=${Date.now()}`,
            {
                cache: "no-store"
            }
        );

        if (!response.ok) {
            throw new Error(
                `APIの取得に失敗しました (${response.status})`
            );
        }

        return await response.json();

    } catch (error) {

        console.error("イベント取得エラー", error);

        return null;

    }

}
