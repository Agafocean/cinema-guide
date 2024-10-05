import { validateResponse } from "./validateResponse";

export function fetchTop10(): Promise<any> {
    return fetch("https://cinemaguide.skillbox.cc/movie/top10")
        .then(validateResponse)
        .then(response => response.json())     
}