async function readDB(URL) {
    const data = await fetch(URL);
    return data;
}

export {
    readDB
}