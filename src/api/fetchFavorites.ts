import { validateResponse } from "./validateResponse";

export function fetchFavorites(): Promise<any> {
    return fetch("https://cinemaguide.skillbox.cc/favorites", {
        method: "GET",
        credentials: "include",
        headers: {
            "accept": "application/json"
        }
    })
        .then(validateResponse)
        .then(response => response.json())
}