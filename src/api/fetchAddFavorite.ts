import { validateResponse } from "./validateResponse";

export function addFavorite(id: string): Promise<{result: boolean}> {
    return fetch("https://cinemaguide.skillbox.cc/favorites", {
        method: "POST",
        credentials: "include",
        headers: {
            "accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `id=${id}`
    })
        .then(validateResponse)
        .then(response => response.json())   
}