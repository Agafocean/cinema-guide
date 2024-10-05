import { validateResponse } from "./validateResponse";

export function fetchRandom(): Promise<any> {
    return fetch("https://cinemaguide.skillbox.cc/movie/random")
        .then(validateResponse)
        .then(response => response.json())
}