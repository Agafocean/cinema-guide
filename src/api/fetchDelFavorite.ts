import { validateResponse } from "./validateResponse";

export function delFavorite(id: string): Promise<{result: boolean}> {
    return fetch(`https://cinemaguide.skillbox.cc/favorites/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            "accept": "application/json"            
        },
    })
        .then(validateResponse)
        .then(response => response.json())
}