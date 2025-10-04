import * as models from "./models.js"

// AURORA API CALLS

export async function fetch_auroras() {
    let response = await fetch("https://aurora.hendrikpeter.net/api/aurora_data.json")
    let data = await response.json()
    let locationsObj = data.locations;
    let locationsArray = Object.values(locationsObj);

    return locationsArray
}

export async function fetch_iss() {
    try {
        const res = await fetch('http://api.open-notify.org/iss-now.json')
        const data = await res.json()
        let position = data.iss_position
        return position
    } catch (err) {
        console.error(err)
        return null
    }
}