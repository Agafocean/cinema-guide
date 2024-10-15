import { BASE_URL } from "../App";
import { validateResponse } from "./validateResponse";

export function addFavorite(id: string): Promise<{result: boolean}> {
    return fetch(`${BASE_URL}/favorites`, {
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