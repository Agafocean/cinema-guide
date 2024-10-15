import { BASE_URL } from "../App";
import { IMovie } from "../pages/Movie/iMovie";
import { validateResponse } from "./validateResponse";

export function fetchFavorites(): Promise<IMovie[]> {
    return fetch(`${BASE_URL}/favorites`, {
        method: "GET",
        credentials: "include",
        headers: {
            "accept": "application/json"
        }
    })
        .then(validateResponse)
        .then(response => response.json())
}