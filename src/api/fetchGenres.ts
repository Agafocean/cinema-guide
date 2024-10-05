import { validateResponse } from "./validateResponse";

export function fetchGenres(): Promise<any> {
    return fetch("https://cinemaguide.skillbox.cc/movie/genres")
        .then(validateResponse)
        .then(response => response.json())     
}