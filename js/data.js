async function loadCurrent() {

    try {

        const response = await fetch(
            `data/current.json?t=${Date.now()}`,
            {
                cache: "no-store"
            }
        );

        if (!response.ok) {
            throw new Error(`JSONの取得に失敗しました (${response.status})`);
        }

        return await response.json();

    } catch (error) {

        console.error("current.json の読み込みエラー", error);

        return null;

    }

}
