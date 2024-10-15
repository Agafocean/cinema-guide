import { BASE_URL } from "../App";
import { validateResponse } from "./validateResponse";

export function fetchGenres(): Promise<string[]> {
    return fetch(`${BASE_URL}/movie/genres`)
        .then(validateResponse)
        .then(response => response.json())     
}