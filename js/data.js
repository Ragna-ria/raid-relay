async function loadCurrent(){

    const response = await fetch("data/current.json");

    return await response.json();

}
