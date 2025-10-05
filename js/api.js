// AURORA API CALLS
export async function fetch_auroras() {
    let response = await fetch("resources/data/aurora_data.json")
    let data = await response.json()
    let locationsObj = data.locations;
    let locationsArray = Object.values(locationsObj);

    return locationsArray
}

export async function fetch_iss() {
    try {
        const res = await fetch('https://api.wheretheiss.at/v1/satellites/25544')
        const data = await res.json()
        let position = {
            latitude: data.latitude,
            longitude: data.longitude
        }
        return position
    } catch (err) {
        console.error(err)
        return null
    }
}