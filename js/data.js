async function loadCurrent() {

    const response = await fetch(
        `data/current.json?t=${Date.now()}`,
        {
            cache: "no-store"
        }
    );

    return await response.json();

}
