import * as models from "./models.js"

// AURORA API CALLS

export async function fetch_auroras() {
    let response = await fetch("https://aurora.hendrikpeter.net/api/aurora_data.json")
    let data = await response.json()
    let locationsObj = data.locations;
    let locationsArray = Object.values(locationsObj);

    return locationsArray
}
