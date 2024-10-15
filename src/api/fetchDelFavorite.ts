import { BASE_URL } from "../App";
import { validateResponse } from "./validateResponse";

export function delFavorite(id: string): Promise<{result: boolean}> {
    return fetch(`${BASE_URL}/favorites/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            "accept": "application/json"            
        },
    })
        .then(validateResponse)
        .then(response => response.json())
}